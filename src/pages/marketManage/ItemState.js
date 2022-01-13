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

const keyList = [
  { title: "No" },
  { title: "등록 일시", isDate: true },
  { title: "상태", convertInt: ["정상", "검수중", "정책 위반"] },
  { title: "숨김", convertInt: ["노출", "숨김"] },
  { title: "Item", hasChildren: true, numChildren: 6 },
  {
    title: "name",
    isChildren: true,
    href: ITEM_DETAIL_URL + `?itemId=`,
    search: true,
  },
  { title: "ID", isChildren: true },
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

  useEffect(() => {
    const temp = JsonToTableData(itemList, keyToValue);
    setTableData(temp);
  }, [itemList]);
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
            wrapName="itemState"
            search
            datePicker
            refresh
            excel
            keyList={keyList}
            tableData={tableData}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default ItemState;
