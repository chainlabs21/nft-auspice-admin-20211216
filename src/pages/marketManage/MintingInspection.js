import {
  Modal,
  Card,
  Table,
  Row,
  Col,
  Container,
  Button,
} from "react-bootstrap";
import { useSelector } from "../../store/reducer";
import FunctionalTable from "../../components/table/FunctionalTable";
import { useEffect, useState } from "react";
import { JsonToTableData } from "../../utils/tableUtils";
import { TiSpanner } from "react-icons/ti";
import ItemImage from "../../assets/images/item.png";
import Select from "react-select";
import { SET_ITEM_STATE } from "../../store/itemReducer";
import { useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import { ITEM_DETAIL_URL } from "../../config/urlDefine";

const keyList = [
  { title: "No" },
  { title: "등록 일시" },
  {
    title: "상태",
    filter: true,
    convertInt: ["정상", "검수중", "정책 위반"],
  },
  { title: "숨김", convertInt: ["노출", "숨김"] },
  { title: "검수", hasCallback: true },
  { title: "Item", hasChildren: true, numChildren: 2 },
  {
    title: "name",
    isChildren: true,
    search: true,
    href: ITEM_DETAIL_URL + "?itemId=0",
  },
  { title: "ID", isChildren: true },
  { title: "Creator" },
  { title: "Creator address", search: true },
];
const keyToValue = [
  "no",
  "regDate",
  "state",
  "hidden",
  "",
  "name",
  "id",
  "creator",
  "creatorAddress",
];
const stateOption = [
  { value: 0, label: "정상" },
  { value: 1, label: "검수중" },
  { value: 2, label: "정책 위반" },
];

const MintingInspection = () => {
  const { itemList, todayRegister, totalRegister, mintingWait, totalMinting } =
    useSelector((state) => state.item);
  const [tableData, setTableData] = useState([]);
  const [itemToggle, setItemToggle] = useState(false);
  const [dataIndex, setDataIndex] = useState(0);
  const [itemState, setItemState] = useState(0);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    //dispatch
    setItemToggle(false);
  };
  useEffect(() => {
    const temp = JsonToTableData(itemList, keyToValue);
    const callbackData = {
      icon: <TiSpanner style={{ fontSize: "24px" }} />,
      callback: (index) => {
        setItemToggle(true);
        setDataIndex(index);
      },
    };
    itemList.forEach((v, i) => {
      temp[i][4] = callbackData;
    });
    setTableData(temp);
  }, [itemList]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <PageTitle title={"Minting Inspection"} margin={5} />
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
            wrapName="mintingInspectionList"
            keyList={keyList}
            tableData={tableData}
            search
            refresh
            datePicker
            excel
          />
        </Col>
      </Row>
      <Modal show={itemToggle} centered>
        <Modal.Header style={{ textAlign: "center" }}>
          <Modal.Title>{itemList[dataIndex].name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col style={{ textAlign: "center" }}>
                <img
                  style={{ width: "400px", height: "400px" }}
                  src={ItemImage}
                  alt="gameItem"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={stateOption[itemList[dataIndex].state]}
                  name="color"
                  options={stateOption}
                  onChange={(e) => {
                    dispatch({
                      type: SET_ITEM_STATE,
                      payload: { index: dataIndex, state: e.value },
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col style={{ textAlign: "center" }}>
                <Button variant="secondary" onClick={handleSubmit}>
                  확인
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setItemToggle(false);
                  }}
                >
                  취소
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
export default MintingInspection;
