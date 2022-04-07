import FunctionalTable from "../../components/table/FunctionalTable";
import { USER_DETAIL_URL, WALLET_QUERY_URL } from "../../config/urlDefine";
import { useSelector } from "../../store/reducer";
import { JsonToTableData } from "../../utils/tableUtils";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import GeneralPagination from '../../utils/Pagination'
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { API } from "../../utils/api";
import moment from 'moment'
import { mockComponent } from "react-dom/test-utils";


const keyList = [
  {
    title: "no",
  },
  { title: "가입일", isDate: true },
  { title: "지갑주소", href: WALLET_QUERY_URL, search: true },
  {
    title: "닉네임",
    diffhref: USER_DETAIL_URL + "?userId=",
    search: true,
  },
  { title: "Email", search: true },
  { title: "회원상태" },
  { title: "Item 수" },
];
// const keyToValue = [
//   "no",
//   "registerDate",
//   "walletAddress",
//   "nickName",
//   "email",
//   "state",
//   "collectionCount",
//   "itemCount",
// ];


let PAGE_NUMBER = 0

const MemberState = () => {
  // const { memberList } = useSelector((state) => state.member);
  const [DEFAULT_SIZE, setDEFAULT_SIZE] = useState(20)
  const [tableData, setTableData] = useState([]);
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState(false);

  // useEffect(() => {
  //   //pagination starts here
  //   axios.get(API.GET_USERS(DEFAULT_SIZE, DEFAULT_SIZE*(page-1))).then((res) => {
  //     setUsers([])
  //     const getUserList = res.data.list
  //     getUserList.map((user, index) => {
  //       const information = {
  //         no: index + 1,
  //         registerDate: moment(user.maria.createdat).format('YYYY-MM-DD'),
  //         walletAddress: user.maria.username,
  //         nickname: [user.maria.nickname, user.maria.username],
  //         email: user.maria.email,
  //         state: 'Y',
  //         itemCount: 3
  //       }
  //       setUsers(prev => [...prev, information])
  //     })
  //   })
  //   axios.get(API.GET_COUNT('users')).then((res) => {
  //     setCount(parseInt(res.data.resp))
  //     console.log(count)
  //   })
  // }, [page, DEFAULT_SIZE]);

  useEffect(()=>{
    console.log(DEFAULT_SIZE)
    console.log(DEFAULT_SIZE*(page-1))
    axios.get(API.GET_USER_DETAIL("all", "all", DEFAULT_SIZE, DEFAULT_SIZE*(page-1))).then((resp)=>{
      console.log(resp)
      setUsers([])
      let {rows, count} = resp.data.resp;
      setCount(count)
      rows.map((v, i)=>{
        setUsers(pre=>[
          ...pre,
          {
            no: i+1,
            registerDate: moment(v.createdat).format('YYYY-MM-DD'),
            walletAddress: v.username,
            nickname: [v.nickname, v.username],
            email: v.email,
            state: 'Y',
            itemCount: v.owned_items?.length
          }
        ])
      })
    })
  },[page, DEFAULT_SIZE])






  const CallbackfromPagination=(e)=>{
    setPage(e)
    setSearch(false)
  }
  const CallbackfromTable=(e)=>{
    setDEFAULT_SIZE(e)
  }
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
              passtheCount={CallbackfromTable}
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
        <GeneralPagination passToParent={CallbackfromPagination} count={search? users.length : count} size={DEFAULT_SIZE}/> 
      </Container>
     
    </>
  );
};

export default MemberState;
