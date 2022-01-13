import { useEffect, useState } from "react";
import {
  Form,
  Modal,
  Row,
  Col,
  Container,
  Button,
  DropdownButton,
  Dropdown,
  ListGroup,
} from "react-bootstrap";
import { useSelector } from "../../store/reducer";
import { JsonToTableData } from "../../utils/tableUtils";
import FunctionalTable from "../../components/table/FunctionalTable";
import { TiSpanner } from "react-icons/ti";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import { BsFileArrowUpFill, BsFileArrowDownFill } from "react-icons/bs";
import {
  CHANGE_DISPLAY_ORDER,
  ADD_NEW_CATEGORY,
} from "../../store/marketReducer";
import { useDispatch } from "react-redux";
import { DropdownWrapper } from "../../stlye/globalStyles";
import Select from "react-select";

const stateOption = [
  {
    value: 0,
    label: "숨김",
  },
  { value: 1, label: "공개" },
];

const keyList = [
  { title: "No" },
  { title: "Category" },
  { title: "상태", convertInt: ["숨김", "공개"] },
  { title: "Display순서" },
  { title: "Items 수" },
  { title: "수정", hasCallback: true },
];

const keyToValue = ["no", "name", "state", "displayOrder", "numItems"];
const ManageCategory = () => {
  const { categoryList } = useSelector((state) => state.market);
  const [tableData, setTableData] = useState([]);
  const [toggleRegister, setToggleRegister] = useState(false);
  const [toggleSetting, setToggleSettings] = useState(false);
  const [visible, setVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [dataIndex, setDataIndex] = useState(0);
  const [active, setActive] = useState(0);
  const [sortedCategory, setSortedCategory] = useState([]);
  const [curState, setCurState] = useState(0);
  const dispatch = useDispatch();

  const changeDisplayOrder = (index, direction) => {
    const temp = sortedCategory;
    if (direction === 0) {
      if (active < sortedCategory.length) {
        const swapTemp = temp[active + 1];
        temp[active + 1] = temp[active];
        temp[active] = swapTemp;
        setActive(active + 1);
        dispatch({
          type: CHANGE_DISPLAY_ORDER,
          payload: { index: dataIndex, value: 1 },
        });
      }
    } else {
      //up
      if (active > 0) {
        const switchTemp = temp[active - 1];
        temp[active - 1] = temp[active];
        temp[active] = switchTemp;
        setActive(active - 1);
        dispatch({
          type: CHANGE_DISPLAY_ORDER,
          payload: { index: dataIndex, value: -1 },
        });
      }
    }
    setSortedCategory(temp);
  };

  const submitRegister = () => {
    //dispatch here
    dispatch({
      type: ADD_NEW_CATEGORY,
      payload: { name: categoryName, state: curState },
    });

    setCategoryName("");
    setToggleRegister(false);
    setVisible(false);
  };

  const submitSettings = () => {
    //dispatch here
    const categoryData = {
      state: visible,
      name: categoryName,
      displayOrder: categoryList.length,
      // 변동이 있을수있으니, 검증 필요
      // 서버에 올릴때는 서버값을 사용
      numItems: categoryList[dataIndex],
      no: categoryList.length,
    };
    setCategoryName("");
    setToggleSettings(false);
    setVisible(false);
  };

  useEffect(() => {
    const sortmap = [...categoryList];
    const sortedTemp = sortmap.sort((a, b) => {
      return a.displayOrder - b.displayOrder;
    });

    setSortedCategory(sortedTemp);

    const temp = JsonToTableData(categoryList, keyToValue);

    const settingData = {
      icon: <TiSpanner style={{ fontSize: "24px" }} />,
      callback: (index) => {
        setToggleSettings(true);
        setDataIndex(index);
      },
    };

    categoryList.forEach((v, i) => {
      temp[i].push(settingData);
    });

    setTableData(temp);
  }, [categoryList]);

  useEffect(() => {
    const activeIndex = sortedCategory.findIndex((element) => {
      return element.no - 1 === dataIndex;
    });
    setActive(activeIndex);
  }, [dataIndex, sortedCategory]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <PageTitle title={"마켓 카테고리 관리"} margin={5} />
        </Col>
      </Row>
      <Row>
        <Col style={{ paddingBottom: "30px" }}>
          <Button variant="secondary" onClick={() => setToggleRegister(true)}>
            신규 등록
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <FunctionalTable keyList={keyList} tableData={tableData} clean />
        </Col>
      </Row>
      <Modal show={toggleRegister} centered>
        <Modal.Header>카테고리 등록</Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <div>
                  <TitleWrapper>상태 :</TitleWrapper>

                  <SelectWrapper>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={stateOption[0]}
                      name="color"
                      options={stateOption}
                      onChange={(e) => {
                        setCurState(e.value);
                      }}
                    />
                  </SelectWrapper>
                  <div>
                    <TitleWrapper>카테고리 이름 :</TitleWrapper>

                    <SelectWrapper>
                      <Form.Control
                        onChange={(e) => {
                          setCategoryName(e.target.value);
                        }}
                        value={categoryName}
                      ></Form.Control>
                    </SelectWrapper>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div style={{ textAlign: "center" }}>
                  <ButtonWrapper
                    onClick={() => {
                      setCategoryName("");
                      setToggleRegister(false);
                    }}
                    variant="outline-secondary"
                  >
                    취소
                  </ButtonWrapper>
                  <ButtonWrapper onClick={submitRegister} variant="secondary">
                    확인
                  </ButtonWrapper>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      <Modal centered show={toggleSetting} className="setting-modal">
        <Modal.Body>
          <Container style={{ textAlign: "center" }}>
            <Row
              style={{
                marginBottom: "2rem",
                fontSize: "1.3rem",
                fontWeight: "bold",
                color: "grey",
              }}
            >
              <Col>
                <header>카테고리 설정</header>
              </Col>
            </Row>
            <RowWrapper>
              <TitleWrapper style={{ textAlign: "right" }}>
                <Form.Label>상태 :</Form.Label>
              </TitleWrapper>
              <SelectWrapper style={{ textAlign: "left" }}>
                <DropdownWrapper>
                  <DropdownButton
                    title={
                      categoryList[dataIndex].state === 1 ? "show" : "hide"
                    }
                  >
                    <Dropdown.Item
                      onClick={() => {
                        setVisible(false);
                      }}
                    >
                      hide
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setVisible(true);
                      }}
                    >
                      show
                    </Dropdown.Item>
                  </DropdownButton>
                </DropdownWrapper>
              </SelectWrapper>
            </RowWrapper>

            <RowWrapper>
              <TitleWrapper>
                <Form.Label>카테고리명 :</Form.Label>
              </TitleWrapper>
              <SelectWrapper>
                <Form.Control
                  onChange={(e) => setCategoryName(e.target.value)}
                  value={categoryList[dataIndex].name}
                  type="text"
                />
              </SelectWrapper>
            </RowWrapper>
            <RowWrapper>
              <TitleWrapper>
                <Form.Label>카테고리 순서 :</Form.Label>
              </TitleWrapper>
              <SelectWrapper>
                <OrderWrapper>
                  <CategoryOrder>
                    <ListGroup as="ul">
                      {sortedCategory.map((v, i) => {
                        return (
                          <ListGroup.Item
                            key={i}
                            as="li"
                            active={active === i ? true : false}
                          >
                            {v.name}
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  </CategoryOrder>
                  <CategoryOrder>
                    <ArrowIconWrapper>
                      <BsFileArrowUpFill
                        onClick={() => {
                          changeDisplayOrder(dataIndex, 1);
                        }}
                      />
                    </ArrowIconWrapper>
                    <ArrowIconWrapper>
                      <BsFileArrowDownFill
                        onClick={() => {
                          changeDisplayOrder(dataIndex, 0);
                        }}
                      />
                    </ArrowIconWrapper>
                  </CategoryOrder>
                </OrderWrapper>
              </SelectWrapper>
            </RowWrapper>
            <RowWrapper>
              <ButtonWrapper
                variant="secondary"
                onClick={() => {
                  setToggleSettings(false);
                  setCategoryName("");
                  setVisible(false);
                }}
              >
                취소
              </ButtonWrapper>
              <ButtonWrapper variant="secondary" onClick={submitSettings}>
                확인
              </ButtonWrapper>
            </RowWrapper>
          </Container>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
const ArrowIconWrapper = styled.div`
  margin-left: 1rem;
  font-size: 28px;
`;
const OrderWrapper = styled.div`
  margin-top: 1rem;
  vertical-align: middle;
  display: flex;
  align-items: flex-end;
`;

const CategoryOrder = styled.div`
  display: inline-block;
`;
export default ManageCategory;
const TitleWrapper = styled.div`
  display: inline-block;
  width: 100px;
  text-align: right;
  margin-right: 20px;
`;
const SelectWrapper = styled.div`
  display: inline-block;
  width: 200px;
`;
const ButtonWrapper = styled(Button)`
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 2rem;
  margin-bottom: 15px;
`;
const RowWrapper = styled.div`
  margin-top: 1rem;
`;
