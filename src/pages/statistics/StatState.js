import { Col, Row, Container } from "react-bootstrap";
import FunctionalTable from "../../components/table/FunctionalTable";
import { useSelector } from "../../store/reducer";
import { useState, useEffect } from "react";
import { JsonToTableData } from "../../utils/tableUtils";
import { STATISTICS_DETAIL_URL } from "../../config/urlDefine";
import PageTitle from "../../components/PageTitle";
import { SubTitleWrapper } from "../../stlye/globalStyles";
import axios from "axios";
import {API} from "../../utils/api"
import { useDispatch } from "react-redux";
import { SET_TODAY_STAT, SET_ALL_STAT } from "../../store/statisticsReducer";
import moment from "moment";

const overAllKeyList = [
  { title: "분류" },
  { title: "회원" },
  { title: "거래", hasChildren: true, numChildren: 2 },
  { title: "건수", isChildren: true },
  { title: "금액 (USD)", isChildren: true },
  { title: "수수료", hasChildren: true, numChildren: 2 },
  { title: "건수", isChildren: true },
  { title: "금액 (USD)", isChildren: true },
  { title: "로얄티", hasChildren: true, numChildren: 2 },
  { title: "건수", isChildren: true },
  { title: "금액 (USD)", isChildren: true },
  // { title: "레퍼럴", hasChildren: true, numChildren: 2 },
  // { title: "건수", isChildren: true },
  // { title: "금액 (USD)", isChildren: true },
];

const monthKeyList = [
  {
    title: "Date",
    isDate: true,
    href: STATISTICS_DETAIL_URL + `?month=`,
  },
  { title: "신규 회원" },
  { title: "거래", hasChildren: true, numChildren: 2 },
  { title: "건수", isChildren: true },
  { title: "금액(USD)", isChildren: true },
  { title: "수수료", hasChildren: true, numChildren: 2 },
  { title: "건수", isChildren: true },
  { title: "금액(USD)", isChildren: true },
  { title: "로얄티", hasChildren: true, numChildren: 2 },
  { title: "건수", isChildren: true },
  { title: "금액(USD)", isChildren: true },
  // { title: "레퍼럴", hasChildren: true, numChildren: 2 },
  // { title: "건수", isChildren: true },
  // { title: "금액(USD)", isChildren: true },
];

//배열 일시는 자식 키는 넣지않아도된다.
// 후에 수정예정
const monthKeyToValue = ["date", "newMember", "trade", "fee", "royal", "ref"];

const keyToValue = [
  "member",
  "trade",
  "count",
  "value",
  "fee",
  "count",
  "value",
  "royal",
  "count",
  "value",
  // "ref",
  // "count",
  // "value",
];

const StatState = () => {
  const dispatch =useDispatch();
  const { overallData, monthData } = useSelector((state) => state.stat);
  const [totalTableData, setTotalTableData] = useState([]);
  const [monthTableData, setMonthTableData] = useState([]);
  const [todayStat, setTodayStat] = useState([]);
  const [monthTable, setMonthTable] = useState([]);
  const [monthFee, setMonthFee] = useState([]);
  const [monthRoyal, setMonthRoyal] = useState([]);
  const [monthPop, setMonthPop] = useState([]);
  const [monthPrice, setMonthPrice] = useState([]);
  const [klayprice, setKlayprice] = useState();
  useEffect(() => {
    const todayData = JsonToTableData(overallData.today, keyToValue);
    const allData = JsonToTableData(overallData.all, keyToValue);
    todayData[0].unshift("금일");
    allData[0].unshift("누적");

    setTotalTableData(todayData.concat(allData));

    const monthJsonData = JsonToTableData(monthData, monthKeyToValue);
   // setMonthTableData(monthJsonData);
  }, [overallData, monthData]);

  useEffect(()=>{
    axios.get(`${API.GET_KLAY}`).then((r)=>{
      setKlayprice(r.data.list.KLAY)
    })
    get_monthTable('2021-12-01', moment())
  },[])

  function get_monthTable(from, to){
    axios.get(API.STATISTICS('month',moment(from).startOf('month').format('YYYY-MM-DD'), moment(to).endOf('month').format('YYYY-MM-DD'))).then((res)=>{
      let {wholedata} = res.data;
      setMonthTable([])
      wholedata.forEach((v)=>{
        console.log(v)
        Object.keys(v).forEach((val)=>{
          //console.log(v[val])
          const map={
            date: val,
            pop: v[val][2][0].usercount,
            pricecount: v[val][3][0].pricecount,
            pricesum: v[val][3][0].pricesum || 0,
            feecount: v[val][0][0].feecount,
            feesum: v[val][0][0].feesum || 0,
            royalcount: v[val][1][0].royalcount,
            royalsum: v[val][1][0].royalsum || 0,
          }
          setMonthTable(pre=>[...pre, map])
        })
      })
    })
  }
 
  useEffect(()=>{
    console.log(monthTable)
  },[monthTable])

  useEffect(()=>{
    axios.get(API.STATISTICS('day', '1')).then((resp)=>{
      console.log(resp)
      dispatch({
        type: SET_TODAY_STAT,
        payload:{value:{
          member: resp.data.resp[2]?.count,
          trade:{
            count: resp.data.resp[3]?.count,
            value: resp.data.resp[3]?.rows[0]?.pricesum || 0

          },
          fee:{
            count: resp.data.resp[0]?.count,
            value: resp.data.resp[0]?.rows[0]?.feesum || 0,
          },
          royal:{
            count: resp.data.resp[1]?.count,
            value: resp.data.resp[1]?.rows[0]?.royaltysum || 0,
          }
        }}
      })
    })
    axios.get(API.STATISTICS('total', '1')).then((resp)=>{
      console.log(resp)
      dispatch({
        type: SET_ALL_STAT,
        payload:{value:{
          member: resp.data.resp[2]?.count,
          trade:{
            count: resp.data.resp[3]?.count,
            value: resp.data.resp[3]?.rows[0]?.pricesum || 0

          },
          fee:{
            count: resp.data.resp[0]?.count,
            value: resp.data.resp[0]?.rows[0]?.feesum || 0,
          },
          royal:{
            count: resp.data.resp[1]?.count,
            value: resp.data.resp[1]?.rows[0]?.royaltysum || 0,
          }
        }}
      })
    })
  },[])
  return (
    <Container fluid>
      <Row>
        <Col>
          <PageTitle title={"통계 현황"} margin={5} />
        </Col>
      </Row>
      <Row>
        <Col style={{ marginBottom: "2rem" }}>
          <SubTitleWrapper>전체 통계 써머리</SubTitleWrapper>
          <FunctionalTable
            clean
            tableData={totalTableData}
            keyList={overAllKeyList}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <SubTitleWrapper>월별 통계</SubTitleWrapper>
          <FunctionalTable
            datePicker
            external
            onDate={(e)=>get_monthTable(e[0], e[1])}
            tableData={monthTable}
            keyList={monthKeyList}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default StatState;
