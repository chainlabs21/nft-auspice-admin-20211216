import { Card, Table, Container, Row, Col } from "react-bootstrap";
import FunctionalTable from "../../components/table/FunctionalTable";
import { useSelector } from "../../store/reducer";
import { useEffect, useState } from "react";
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

  const getItems = async () => {
    const {data} = await axios.get(API.GET_ITEMS(20))
    if(data) {
      const {list} = data
      console.log(list)
      list.map((item, index) => {
        const fields = {
          no: index + 1,
          regDate: item.createdat,
          name: item.item.titlename,
          id: item.item.itemid,
          token: item.priceunit,
          price: item.price,
          contract: item.contract,
          category: item.categorystr,
          owner: item.author.nickname,
          ownerAddress: item.author.username
        }
        setItemList(prevState => [...prevState, fields])
      })
    }
  }

  useEffect(() => {
    getItems()
  }, [])

  console.log(items)

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
    </Container>
  );
};
export default ItemState;
