import moment from "moment";
import FunctionalTable from "../../components/table/FunctionalTable";
import { USER_DETAIL_URL, WALLET_QUERY_URL } from "../../config/urlDefine";
import { useSelector } from "../../store/reducer";
import { JsonToTableData } from "../../utils/tableUtils";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import styled from "styled-components";

const keyList = [
  {
    title: "회원No",
  },
  { title: "가입일", isDate: true },
  { title: "지갑주소", href: WALLET_QUERY_URL, search: true },
  {
    title: "닉네임",
    href: USER_DETAIL_URL + "?userId=",
    search: true,
  },
  { title: "Email", search: true },
  { title: "회원상태" },
  {
    title: "Collection 수",
  },
  { title: "Item 수" },
];
const keyToValue = [
  "no",
  "registerDate",
  "walletAddress",
  "nickName",
  "email",
  "state",
  "collectionCount",
  "itemCount",
];
const MemberState = () => {
  const { memberList } = useSelector((state) => state.member);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const temp = JsonToTableData(memberList, keyToValue);
    setTableData(temp);
  }, [memberList]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <PageTitle title={"회원 현황"} margin={5} />
          </Col>
        </Row>
        <Row>
          <Col>
            <FunctionalTable
              tableData={tableData}
              keyList={keyList}
              search
              datePicker
              excel
              refresh
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MemberState;