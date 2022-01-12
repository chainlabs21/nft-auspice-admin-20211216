import { Col, Row, Container } from "react-bootstrap";
import FunctionalTable from "../../components/table/FunctionalTable";
import { useSelector } from "../../store/reducer";
import { useState, useEffect } from "react";
import { JsonToTableData } from "../../utils/tableUtils";
import {
  summaryKeyToValue,
  summaryKeyList,
  refKeyList,
  refKeyToValue,
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

const StatInfo = () => {
  const { monthSummary, monthDetail } = useSelector((state) => state.stat);
  const [summary, setSummary] = useState([]);
  const [tradeData, setTradeData] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [royalData, setRoyalData] = useState([]);
  const [refData, setRefData] = useState([]);
  const [curCategory, setCurCategory] = useState(0);
  const [curTableData, setCurTableData] = useState(tradeData);
  const [curKeyList, setCurKeyList] = useState(tradeKeyList);

  useEffect(() => {
    //쿼리로 데이터 불러오기
    const summaryData = JsonToTableData(monthSummary, summaryKeyToValue);
    setSummary(summaryData);

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
    const eableData = JsonToTableData(monthDetail[0].ref, refKeyToValue);
    setRefData(eableData);
  }, [monthSummary, monthDetail]);

  useEffect(() => {
    switch (curCategory) {
      case 0:
        setCurTableData(tradeData);
        setCurKeyList(tradeKeyList);
        break;
      case 1:
        setCurTableData(feeData);
        setCurKeyList(feeKeyList);
        break;
      case 2:
        setCurTableData(royalData);
        setCurKeyList(royalKeyList);
        break;
      case 3:
        setCurTableData(refData);
        setCurKeyList(refKeyList);
        break;
      default: {
        setCurTableData(tradeData);
        setCurKeyList(tradeKeyList);
      }
    }
  }, [curCategory, tradeData, feeData, royalData, refData]);
  return (
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
      <CategoryRowWrapper>
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
        <CategorySelector
          className={
            curCategory === 3 ? "selected-category" : "default-category"
          }
          onClick={() => {
            setCurCategory(3);
          }}
        >
          레퍼럴
        </CategorySelector>
      </CategoryRowWrapper>

      <FunctionalTable
        datePicker
        excel
        refresh
        keyList={curKeyList}
        tableData={curTableData}
      />
    </Container>
  );
};
export default StatInfo;
