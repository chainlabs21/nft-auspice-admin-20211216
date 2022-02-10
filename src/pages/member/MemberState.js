import FunctionalTable from "../../components/table/FunctionalTable";
import { USER_DETAIL_URL, WALLET_QUERY_URL } from "../../config/urlDefine";
import { useSelector } from "../../store/reducer";
import { JsonToTableData } from "../../utils/tableUtils";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { API } from "../../utils/api";
import moment from 'moment'


const keyList = [
  {
    title: "no",
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
  // const { memberList } = useSelector((state) => state.member);
  const [tableData, setTableData] = useState([]);
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(API.API_GET_USERS(20)).then((res) => {
      const getUserList = res.data.list
      getUserList.map((user, index) => {
        const information = {
          no: index,
          registerDate: user.maria.createdat,
          walletAddress: user.maria.username,
          nickname: user.maria.nickname,
          email: user.maria.email,
          state: 'Y',
          collectionCount: 3,
          itemCount: 3
        }
        setUsers(prev => [...prev, information])
      })
    })
  }, []);

  // useEffect(() => {
  //   const temp = JsonToTableData(users, keyToValue);
  //   setTableData(temp);
  // }, [users]);

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
              wrapName="tableHasNo"
              tableData={users}
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
