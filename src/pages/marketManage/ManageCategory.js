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
import I_dnPolygonGray from "../../assets/images/I_dnPolygonGray.svg";
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
          <FunctionalTable
            wrapName="tableHasNo"
            keyList={keyList}
            tableData={tableData}
            clean
          />
        </Col>
      </Row>
      <Modal className="inpuListPopup" show={toggleRegister} centered>
        <Modal.Header>카테고리 등록</Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="inputBox">
              <Col>
                <ul className="inputList">
                  <li>
                    <div className="key">상태 :</div>

                    <div className="value">
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={stateOption[0]}
                        name="color"
                        options={stateOption}
                        onChange={(e) => setCurState(e.value)}
                      />
                    </div>
                  </li>

                  <li>
                    <div className="key">카테고리 이름 :</div>

                    <div className="value">
                      <Form.Control
                        onChange={(e) => setCategoryName(e.target.value)}
                        value={categoryName}
                      ></Form.Control>
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row className="actionBtnBox">
              <button
                className="whiteBtn"
                onClick={() => {
                  setCategoryName("");
                  setToggleRegister(false);
                }}
                variant="outline-secondary"
              >
                취소
              </button>
              <button
                className="grayBtn"
                onClick={submitRegister}
                variant="secondary"
              >
                확인
              </button>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      <Modal
        centered
        show={toggleSetting}
        className="categoryPopup setting-modal"
      >
        <Modal.Body>
          <Container>
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

            <ul className="settingList">
              <li>
                <div className="key">
                  <Form.Label>상태 :</Form.Label>
                </div>
                <div className="value">
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
                </div>
              </li>

              <li>
                <div className="key">
                  <Form.Label>카테고리명 :</Form.Label>
                </div>
                <div className="value">
                  <Form.Control
                    onChange={(e) => setCategoryName(e.target.value)}
                    value={categoryList[dataIndex].name}
                    type="text"
                  />
                </div>
              </li>
              <li>
                <div className="key">
                  <Form.Label>카테고리 순서 :</Form.Label>
                </div>
                <div className="value orderValue">
                  <ListGroup className="categoryList" as="ul">
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
                  <div className="orderBtnBox">
                    <button
                      className="upBtn"
                      onClick={() => changeDisplayOrder(dataIndex, 1)}
                    >
                      <img src={I_dnPolygonGray} alt="" />
                    </button>
                    <button
                      className="dnBtn"
                      onClick={() => changeDisplayOrder(dataIndex, 0)}
                    >
                      <img src={I_dnPolygonGray} alt="" />
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            <div className="actionBtnBox">
              <button
                className="whiteBtn"
                variant="secondary"
                onClick={() => {
                  setToggleSettings(false);
                  setCategoryName("");
                  setVisible(false);
                }}
              >
                취소
              </button>
              <button
                className="grayBtn"
                variant="secondary"
                onClick={submitSettings}
              >
                확인
              </button>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManageCategory;
const TitleWrapper = styled.div``;
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
