import { Col, Row, Container } from "react-bootstrap";
import FunctionalTable from "../../components/table/FunctionalTable";
import { useSelector } from "../../store/reducer";
import { useState, useEffect } from "react";
import { JsonToTableData } from "../../utils/tableUtils";
import {
  summaryKeyToValue,
  summaryKeyList,
  tradeKeyList,
  tradeKeyToValue,
  feeKeyList,
  feeKeyToValue,
  royalKeyList,
  royalKeyToValue,
} from "./StateInfoData";
import styled from "styled-components";
import {
  SubTitleWrapper,
  CategorySelector,
  CategoryRowWrapper,
} from "../../stlye/globalStyles";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { API } from "../../utils/api";
import moment from "moment";

const StatInfo = () => {
  const { monthSummary, monthDetail } = useSelector((state) => state.stat);
  const [summary, setSummary] = useState([]);
  // const [fromDate, setFromDate] =useState()
  // const [toDate, setToDate] = useState();
  const [tradeData, setTradeData] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [royalData, setRoyalData] = useState([]);
  const [refData, setRefData] = useState([]);
  const [curCategory, setCurCategory] = useState(0);
  const [curTableData, setCurTableData] = useState(tradeData);
  const [curKeyList, setCurKeyList] = useState(tradeKeyList);
  const [klayprice, setKlayprice] = useState(0)

  useEffect(()=>{
    axios.get(`${API.GET_KLAY}`).then((r)=>{
      setKlayprice(r.data.list.KLAY)
    })
    fetch_data_duration([moment('2021-02-12'), moment()])
  },[])

  useEffect(() => {
    //쿼리로 데이터 불러오기
    const summaryData = JsonToTableData(monthSummary, summaryKeyToValue);
    //setSummary(summaryData);

    const tradeTableData = JsonToTableData(
      monthDetail[0].trade,
      tradeKeyToValue
    );
    setTradeData(tradeTableData);
    const feeTableData = JsonToTableData(monthDetail[0].fee, feeKeyToValue);
    setFeeData(feeTableData);
    const royalTableData = JsonToTableData(
      monthDetail[0].royal,
      royalKeyToValue
    );
    setRoyalData(royalTableData);
    //const eableData = JsonToTableData(monthDetail[0].ref, refKeyToValue);
    //setRefData(eableData);
  }, [monthSummary, monthDetail]);
  

  useEffect(() => {
    setCurTableData([])
    switch (curCategory) {
      case 0:
        //setCurTableData(tradeData);
        setCurKeyList(tradeKeyList);
        axios.get(API.STATISTICS("target", "transactions")).then((res)=>{
          let{count, rows} = res.data;
          //console.log(rows)
          rows.map((v,i)=>{
            setCurTableData(pre=>[...pre,{
              id: i+1,
              createdat: moment(v.createdat).format('YYYY-MM-DD'),
              itemname:v.item_info?.titlename || "-", 
              itemid: v.itemid || "-",
              unit: v.item_info?.priceunit || "KLAY",
              itemprice:v.item_info?.pricemax || 0,
              token: v.id,
              method: v.type,
              status: v.txhash?"완료": "미완료",
              priceunit: v.item_info?.priceunit,
              amount: v.price || 0,
              usdamount: v.price*klayprice.toFixed(2) || 0,
              from: v.from_ || v.buyer,
              to: v.to_ || v.seller,
              tx: v.txhash

            }])
          })
        })
        break;
      case 1:
        //setCurTableData(feeData);
        setCurKeyList(feeKeyList);
        axios.get(API.STATISTICS("target", "fee")).then((res)=>{
          let{count, rows} = res.data;
          rows.map((v,i)=>{
            setCurTableData(pre=>[...pre,{
              id: i+1,
              createdat: v.createdat,
              event: v.subtypestr,
              itemname: v.fee_item_info?.titlename || "-",
              itemid: v.itemid ||"-",
              token: v.fee_item_info?.priceunit || "-",
              price: v.fee_item_info?.pricemax || 0,
              priceunit: v.fee_item_info?.priceunit || 'KLAY',
              buyprice: v.feed_order?.price,
              usdprice: v.feed_order?.price * klayprice,
              fee: v.amount,
              from: v.contract,
              to: v.receiver,
              tx: v.txhash

            }])
          })
        })
        break;
      case 2:
        //setCurTableData(royalData);
        setCurKeyList(royalKeyList);
        axios.get(API.STATISTICS("target", "royal")).then((res)=>{
          let{count, rows} = res.data;
          rows.map((v,i)=>{
            setCurTableData(pre=>[...pre,{
              id: i+1,
              createdat: v.createdat,
              updatedat: v.updatedat || v.createdat,
              event: v.subtypestr || 'SALE',
              creator: v.fee_item_info?.author_info?.nickname || "-",
              itemname: [v.fee_item_info?.titlename, v.itemid],
              token: v.fee_item_info?.priceunit || "-",
              buyprice: v.feed_order?.price,
              usdprice: v.feed_order?.price * klayprice,
              from: v.contract,
              to: v.receiver,
              royaltoken: v.fee_item_info?.priceunit || "-",
              fee: v.amount,
              feeusd: v.amount * klayprice,
              success: v.txhash?1: 0,
              tx: v.txhash

            }])
          })
        })
        break;
      case 3:
        //setCurTableData(refData);
        //setCurKeyList(refKeyList);
        break;
      default: {
        setCurTableData(tradeData);
        setCurKeyList(tradeKeyList);
      }
    }
  }, [curCategory, tradeData, feeData, royalData, refData]);

  async function fetch_data_duration(e){
    let fromDate = e[0];
    let toDate = e[1];
    console.log(new Date())
    console.log(fromDate.format('YYYY-MM-DD'))
    await axios.get(API.STATISTICS('duration',fromDate.format('YYYY-MM-DD'), toDate.format('YYYY-MM-DD'))).then((r)=>{
      let data = r.data.resp
      setSummary([{
        duration: fromDate.format('YYYY-MM-DD')+" ~ "+ toDate.format('YYYY-MM-DD'),
        members: data[2].count,
        tradecount: data[3].count,
        tradeamount: data[3].rows[0]?.pricesum*klayprice || 0,
        feecount: data[0].count,
        feeamount: data[0].rows[0]?.feesum*klayprice || 0,
        royaltycount: data[1].count,
        royaltyamount: data[1].rows[0]?.royaltysum*klayprice || 0

      }])
    })

  }
  return (
    <StatInfoBox className="statInfoBox">
      <Container fluid>
        <Row>
          <Col>
            <PageTitle title={"통계 상세"} />
          </Col>
        </Row>
        <Row>
          <Col style={{ marginBottom: "5rem" }}>
            <SubTitleWrapper>기간별 통계 요약</SubTitleWrapper>
            <FunctionalTable
              datePicker
              external
              onDate={e=>fetch_data_duration(e)}
              refresh={false}
              keyList={summaryKeyList}
              tableData={summary}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SubTitleWrapper>통계 상세 현황</SubTitleWrapper>
          </Col>
        </Row>

        <Row className="totalDetailContainer">
          <Col>
            <div className="contBox">
              <CategoryRowWrapper className="customCategoryBar ">
                <CategorySelector
                  className={
                    curCategory === 0 ? "selected-category" : "default-category"
                  }
                  onClick={() => {
                    setCurCategory(0);
                  }}
                >
                  거래
                </CategorySelector>
                <CategorySelector
                  className={
                    curCategory === 1 ? "selected-category" : "default-category"
                  }
                  onClick={() => {
                    setCurCategory(1);
                  }}
                >
                  수수료
                </CategorySelector>
                <CategorySelector
                  className={
                    curCategory === 2 ? "selected-category" : "default-category"
                  }
                  onClick={() => {
                    setCurCategory(2);
                  }}
                >
                  로얄티
                </CategorySelector>

              </CategoryRowWrapper>

              <FunctionalTable
                wrapName="info-table tableHasNo"
                datePicker
                excel
                refresh
                keyList={curKeyList}
                tableData={curTableData}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </StatInfoBox>
  );
};

const StatInfoBox = styled.section``;

export default StatInfo;
