import { Col, Row, Container } from "react-bootstrap";
import FunctionalTable from "../../components/table/FunctionalTable";
import { useSelector } from "../../store/reducer";
import { useState, useEffect } from "react";
import { JsonToTableData } from "../../utils/tableUtils";
import { STATISTICS_DETAIL_URL } from "../../config/urlDefine";
import PageTitle from "../../components/PageTitle";
import { SubTitleWrapper } from "../../stlye/globalStyles";

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
  { title: "레퍼럴", hasChildren: true, numChildren: 2 },
  { title: "건수", isChildren: true },
  { title: "금액 (USD)", isChildren: true },
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
  { title: "레퍼럴", hasChildren: true, numChildren: 2 },
  { title: "건수", isChildren: true },
  { title: "금액(USD)", isChildren: true },
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
  "ref",
  "count",
  "value",
];

const StatState = () => {
  const { overallData, monthData } = useSelector((state) => state.stat);
  const [totalTableData, setTotalTableData] = useState([]);
  const [monthTableData, setMonthTableData] = useState([]);
  useEffect(() => {
    const todayData = JsonToTableData(overallData.today, keyToValue);
    const allData = JsonToTableData(overallData.all, keyToValue);
    todayData[0].unshift("금일");
    allData[0].unshift("누적");

    setTotalTableData(todayData.concat(allData));

    const monthJsonData = JsonToTableData(monthData, monthKeyToValue);
    setMonthTableData(monthJsonData);
  }, [overallData, monthData]);
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
            tableData={monthTableData}
            keyList={monthKeyList}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default StatState;
