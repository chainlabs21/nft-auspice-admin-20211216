import { Form, Card, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "../../store/reducer";
import { JsonToTableData } from "../../utils/tableUtils";
import FunctionalTable from "../../components/table/FunctionalTable";
import { useDispatch } from "react-redux";
import {
  SET_ITEM_DETAIL_HIDE,
  SET_ITEM_DETAIL_STATE,
} from "../../store/itemReducer";
import Select from "react-select";
import PageTitle from "../../components/PageTitle";

const keyList = [
  { title: "No" },
  { title: "date", isDate: true },
  { title: "Event" },
  { title: "코인" },
  { title: "Price" },
  { title: "From" },
  { title: "To" },
  { title: "Transaction" },
];

const stateOption = [
  { value: 0, label: "정상" },
  { value: 1, label: "검수 중" },
  { value: 2, label: "정책 위반" },
  { value: 3, label: "Burn" },
];
const keyToValue = [
  "no",
  "date",
  "event",
  "coin",
  "price",
  "from",
  "to",
  "transaction",
];

const hideOption = ["공개", "숨김"];

const ItemDetail = () => {
  const dispatch = useDispatch();
  const { itemDetail } = useSelector((state) => state.item);
  const [tableData, setTableData] = useState("");
  const [checked, setChecked] = useState(itemDetail.hide);

  useEffect(() => {
    const temp = JsonToTableData(itemDetail.activityList, keyToValue);
    setTableData(temp);
  }, [itemDetail]);
  return (
    <Container fluid>
      <Row style={{ marginTop: "6rem" }}>
        <Col>
          <PageTitle title="아이템 상세" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Container>
                <Row
                  style={{
                    marginBottom: "2rem",
                  }}
                >
                  <Col>
                    <h3>Item 정보</h3>
                  </Col>
                </Row>
                <Row
                  style={{
                    paddingRight: "5rem",
                    paddingLeft: "5rem",
                  }}
                >
                  <Col>
                    <div>
                      <TitleWrapper>등록일 :</TitleWrapper>
                      <SelectWrapper>{itemDetail.createdAt}</SelectWrapper>
                    </div>
                    <div>
                      <TitleWrapper>Item name :</TitleWrapper>
                      <SelectWrapper>{itemDetail.itemName}</SelectWrapper>
                    </div>
                    <div>
                      <TitleWrapper>Item Id :</TitleWrapper>
                      <SelectWrapper>{itemDetail.itemId}</SelectWrapper>
                    </div>
                    <div>
                      <TitleWrapper>Owner :</TitleWrapper>
                      <SelectWrapper>{itemDetail.owner}</SelectWrapper>
                    </div>
                    <div>
                      <TitleWrapper>로얄티 설정 :</TitleWrapper>
                      <UnitValueWrapper>{itemDetail.royal}</UnitValueWrapper>
                      <UnitWrapper>%</UnitWrapper>
                    </div>
                    <div>
                      <TitleWrapper>아이템 토큰 :</TitleWrapper>
                      <SelectWrapper>{itemDetail.itemToken}</SelectWrapper>
                    </div>
                    <div>
                      <TitleWrapper>카테고리 :</TitleWrapper>
                      <SelectWrapper>{itemDetail.category}</SelectWrapper>
                    </div>
                    <div>
                      <TitleWrapper>Item 사본 수 :</TitleWrapper>
                      <SelectWrapper>{itemDetail.itemCopy}</SelectWrapper>
                    </div>
                    <div>
                      <TitleWrapper>Contract :</TitleWrapper>
                      <SelectWrapper>{itemDetail.contract}</SelectWrapper>
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <TitleWrapper>상태 :</TitleWrapper>
                      <SWrapper>
                        <Select
                          defaultValue={stateOption[itemDetail.state]}
                          options={stateOption}
                          onChange={(e) => {
                            dispatch({
                              type: SET_ITEM_DETAIL_STATE,
                              payload: e.value,
                            });
                          }}
                        />
                      </SWrapper>
                    </div>
                    <div>
                      <TitleWrapper>숨김 :</TitleWrapper>
                      <SelectWrapper>
                        {hideOption[itemDetail.hide]}
                        <Form.Check
                          checked={checked}
                          onChange={(e) => {
                            dispatch({
                              type: SET_ITEM_DETAIL_HIDE,
                              payload: e.target.checked ? 1 : 0,
                            });
                            setChecked(!checked);
                          }}
                          value={itemDetail.hide}
                          type="switch"
                          id="custom-switch"
                          style={{ display: "inline-block", float: "right" }}
                        />
                      </SelectWrapper>
                    </div>
                    <div>
                      <TitleWrapper>Chain :</TitleWrapper>
                      <SelectWrapper>{itemDetail.chain}</SelectWrapper>
                    </div>
                    <div>
                      <TitleWrapper>Creator :</TitleWrapper>
                      <SelectWrapper>{itemDetail.creator}</SelectWrapper>
                    </div>
                    <div>
                      <TitleWrapper>레퍼럴 설정 :</TitleWrapper>
                      <UnitValueWrapper>{itemDetail.refer}</UnitValueWrapper>
                      <UnitWrapper>%</UnitWrapper>
                    </div>
                    <div>
                      <TitleWrapper>좋아요 :</TitleWrapper>
                      <SelectWrapper>{itemDetail.like}</SelectWrapper>
                    </div>
                    <div>
                      <TitleWrapper>View :</TitleWrapper>
                      <SelectWrapper>{itemDetail.view}</SelectWrapper>
                    </div>
                    <div>
                      <TitleWrapper>Item 확인 :</TitleWrapper>
                      <SelectWrapper>{itemDetail.check.filename}</SelectWrapper>
                    </div>
                    <div>
                      <TitleWrapper>Item 설명 :</TitleWrapper>
                      <SelectWrapper>{itemDetail.itemBody}</SelectWrapper>
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: "2rem" }}>
                  <Col>
                    <h3 style={{ marginBottom: "2rem" }}>Item Activity</h3>
                    <FunctionalTable
                      tableData={tableData}
                      keyList={keyList}
                      excel
                      refresh
                    />
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ItemDetail;
const UnitValueWrapper = styled.div`
  display: inline-block;
  width: 250px;
  border: 1px solid lightgrey;
  padding: 10px;
  margin-bottom: 1rem;
`;
const UnitWrapper = styled.div`
  display: inline-block;
  width: 50px;
  padding: 10px;
  text-align: center;
  background-color: lightgrey;
  border: 1px solid lightgrey;
  margin-bottom: 1rem;
`;
const SWrapper = styled.div`
  display: inline-block;
  width: 300px;
  margin-bottom: 1rem;
`;

const SelectWrapper = styled.div`
  display: inline-block;
  width: 300px;
  border: 1px solid lightgrey;
  padding: 10px;
  margin-bottom: 1rem;
`;
const TitleWrapper = styled.div`
  display: inline-block;
  width: 100px;
  text-align: right;
  margin-right: 20px;
`;
