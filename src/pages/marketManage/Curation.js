import {
  Table,
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Select from "react-select";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useSelector } from "../../store/reducer";
import ItemImage from "../../assets/images/item.png";
import {
  MainCategorySelector,
  CategoryMainRowWrapper,
} from "../../stlye/globalStyles";
import PageTitle from "../../components/PageTitle";

const stateOption = [
  { value: 0, label: "숨김" },
  { value: 1, label: "공개" },
];

const MAX_ROW_LENGTH = 8;

const Curation = () => {
  const { curationArr, curationItems } = useSelector((state) => state.item);
  const [curCategory, setCurCategory] = useState(0);
  const [curItem, setCurItem] = useState(0);
  const [openState, setOpenState] = useState(curationArr[0].state);
  const [curationTitle, setCurationTitle] = useState(curationArr[0].title);

  useEffect(() => {}, []);
  const curationTable = () => {
    const table = [];
    for (var i = 0; i < MAX_ROW_LENGTH; i++) {
      table.push(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>
            <AiOutlinePlusSquare style={{ fontSize: "32px" }} />
          </td>
          <td
            onClick={() => {}}
            className={curItem === i ? "selected-item" : "default-item"}
          >
            <div>
              <img
                style={{ float: "left", width: "48px", height: "48px" }}
                src={ItemImage}
                alt="item"
              />
              <span style={{ float: "right" }}>item name</span>
            </div>
          </td>
        </tr>
      );
    }
    return table;
  };

  return (
    <Container fluid>
      <Col>
        <Row>
          <PageTitle title={"큐레이션 "} />
        </Row>
      </Col>
      <Card>
        <Card.Body>
          <Container style={{ marginTop: "2rem" }}>
            <CategoryMainRowWrapper>
              {curationArr.map((cate, i) => (
                <Col>
                  <MainCategorySelector
                    className={
                      curCategory === i
                        ? "selected-category"
                        : "default-category"
                    }
                    key={i}
                    onClick={() => {
                      setCurCategory(i);
                      setCurationTitle(curationArr[i].title);
                      setOpenState(curationArr[i].state);
                    }}
                  >
                    <div>#{i + 1}</div>

                    <div>{cate.title}</div>
                  </MainCategorySelector>
                </Col>
              ))}
            </CategoryMainRowWrapper>
          </Container>
          <Container
            style={{
              textAlign: "center",
              border: "1px solid lightgrey",
              padding: "50px",
            }}
          >
            <RowWrapper>
              <Col lg={6} style={{ textAlign: "start" }}>
                <div
                  style={{
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                  }}
                >
                  #{curCategory + 1} 큐레이션 설정
                </div>
                <div>
                  <TitleWrapper>공개 여부 :</TitleWrapper>
                  <SelectWrapper>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={stateOption[openState]}
                      name="color"
                      options={stateOption}
                      onChange={(e) => {
                        setOpenState(e.value);
                      }}
                    />
                  </SelectWrapper>
                </div>
                <div>
                  <TitleWrapper>제목 :</TitleWrapper>
                  <SelectWrapper>
                    <Form.Control
                      onChange={(e) => {
                        setCurationTitle(e.target.value);
                      }}
                      value={curationTitle}
                    ></Form.Control>
                  </SelectWrapper>
                </div>
              </Col>
            </RowWrapper>
            <RowWrapper>
              <Col>
                <div style={{ fontSize: "2rem", marginBottom: "2rem" }}>
                  큐레이션
                </div>
                <CurationWrapper
                  style={{ textAlign: "center", display: "inline-block" }}
                >
                  <Table
                    bordered
                    style={{
                      width: "500px",
                    }}
                  >
                    {curationTable()}
                  </Table>
                  <ButtonWrapper
                    variant="secondary"
                    onClick={() => {
                      setCurItem(curItem - 1);
                    }}
                  >
                    Up
                  </ButtonWrapper>
                  <ButtonWrapper
                    variant="secondary"
                    onClick={() => {
                      setCurItem(curItem + 1);
                    }}
                  >
                    Down
                  </ButtonWrapper>
                  <ButtonWrapper variant="secondary">확인</ButtonWrapper>
                  <ButtonWrapper variant="secondary">삭제</ButtonWrapper>
                </CurationWrapper>
              </Col>
            </RowWrapper>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default Curation;
const CurationWrapper = styled.div`
  width: 500px;
  .selected-item {
    background-color: lightgrey;
  }
`;

const RowWrapper = styled(Row)`
  margin-bottom: 50px;
`;
const ButtonWrapper = styled(Button)`
  width: 125px;
`;
const TitleWrapper = styled.div`
  display: inline-block;
  width: 100px;
  text-align: right;
  margin-right: 10px;
  margin-top: 10px;
`;
const SelectWrapper = styled.div`
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
  width: 400px;
`;
