import { Card, Table, Container, Row, Col } from "react-bootstrap";
import FunctionalTable from "../../components/table/FunctionalTable";
import { useSelector } from "../../store/reducer";
import { useEffect, useState } from "react";
import GeneralPagination from '../../utils/Pagination'
import { JsonToTableData } from "../../utils/tableUtils";
import {
  CONTRACT_QUERY_URL,
  ITEM_DETAIL_URL,
  USER_DETAIL_URL,
  WALLET_QUERY_URL,
} from "../../config/urlDefine";
import PageTitle from "../../components/PageTitle";
import axios from 'axios'
import {API} from '../../utils/api'
import moment from 'moment'

const keyList = [
  { title: "No" },
  { title: "등록 일시", isDate: true },
  { title: "Item", hasChildren: true, numChildren: 6 },
  {
    title: "아이템 명",
    isChildren: true,
    href: ITEM_DETAIL_URL + `?itemId=`,
    search: true,
  },
  { title: "아이템 ID", isChildren: true },
  { title: "토큰", isChildren: true },
  { title: "가격", isChildren: true },
  { title: "Contract", isChildren: true, href: CONTRACT_QUERY_URL },
  { title: "카테고리", isChildren: true },
  { title: "Owner", href: USER_DETAIL_URL + "?userId=" },
  { title: "Owner address", href: WALLET_QUERY_URL, search: true },
];

const keyToValue = [
  "no",
  "regDate",
  "state",
  "hidden",
  "name",
  "id",
  "token",
  "price",
  "contract",
  "category",
  "owner",
  "ownerAddress",
];

const ItemState = () => {
  const { itemList, todayRegister, totalRegister, mintingWait, totalMinting } =
    useSelector((state) => state.item);

  const [tableData, setTableData] = useState([]);
  const [items, setItemList] = useState([])
  const [DEFAULT_SIZE, setDEFAULT_SIZE] = useState(20)
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState(false);

  const getItems = async () => {
    const {data} = await axios.get(API.GET_ITEMS(DEFAULT_SIZE, DEFAULT_SIZE*(page-1)))
    if(data) {
      setItemList([])
      const {list} = data
      //console.log(list)
      list.map((item, index) => {

        //console.log(item.author?.nickname)
        const fields = {
          no: index + 1,
          regDate: moment(item.createdat).format('YYYY-MM-DD'),
          name: item.item.titlename,
          id: item.item.itemid,
          token: item.priceunit,
          price: item.price,
          contract: item.contract,
          category: item.categorystr,
          owner: item.author?.nickname,
          ownerAddress: item.author?.username
        }
        setItemList(prevState => [...prevState, fields])
      })
    }
    axios.get(API.GET_COUNT('items')).then((res) => {
      setCount(parseInt(res.data.resp))
      console.log(count)
    })
  }

  useEffect(() => {
    getItems()

  }, [page, DEFAULT_SIZE])

  const CallbackfromPagination=(e)=>{
    setPage(e)
    setSearch(false)
    console.log(e)
  }
  const CallbackfromTable=(e)=>{
    setDEFAULT_SIZE(e)
  }

  //console.log(items)

  // useEffect(() => {
  //   const temp = JsonToTableData(itemList, keyToValue);
  //   setTableData(temp);
  // }, [itemList]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <PageTitle title={"ITEM 현황"} margin={5} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Table bordered style={{ textAlign: "center" }}>
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th colSpan={2}>ITEM</th>
                    <th colSpan={2}>Minting</th>
                  </tr>
                  <tr>
                    <th>금일 등록수</th>
                    <th>누적 등록수</th>
                    <th>대기</th>
                    <th>누적 Minting 수</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{todayRegister}</td>
                    <td>{totalRegister}</td>
                    <td>{mintingWait}</td>
                    <td>{totalMinting}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <FunctionalTable
            passtheCount={CallbackfromTable}
            wrapName="itemStateList tableHasNo"
            search
            datePicker
            refresh
            excel
            keyList={keyList}
            tableData={items}
          />
        </Col>
      </Row>
      <GeneralPagination passToParent={CallbackfromPagination} count={count} size={DEFAULT_SIZE}/>
    </Container>
  );
};
export default ItemState;
