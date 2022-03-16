import {
  Table,
  Form,
  Button,
  Container,
  Modal,
  DropdownButton,
  Dropdown,
  ListGroup,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Select from "react-select";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useSelector } from "../../store/reducer";
import ItemImage from "../../assets/images/item.png";
import FunctionalTable from "../../components/table/FunctionalTable";
import { TiSpanner, TiDelete } from "react-icons/ti";
import {
  MainCategorySelector,
  CategoryMainRowWrapper,
} from "../../stlye/globalStyles";
import PageTitle from "../../components/PageTitle";
import I_dnPolygon from "../../assets/images/I_dnPolygon.svg";
import axios from "axios";
import { API } from "../../utils/api";

const stateOption = [
  { value: 0, label: "숨김" },
  { value: 1, label: "공개" },
];
const typeOption = [
  { value: 0, label: "큰 아이템 목록" },
  { value: 1, label: "작은 아이템 목록" },
  { value: 2, label: "유저 목록" },
  { value: 3, label: "링크 목록" },
];

const MAX_ROW_LENGTH = 8;

const Curation = () => {
  const dispatch = useDispatch();
  const itemKey = [
    { title: "아이템 no." },
    { title: "아이템", isImage: true },
    { title: "아이템 명" },
    { title: "상태", convertInt: ["숨김", "공개"] },
    { title: "수정", hasCallback: true },
    { title: "카테고리" },
    { title: "아이템 토큰" },
    { title: "아이템 가격" },
  ];
  const userKey = [
    { title: "유저 no." },
    { title: "이미지", isImage: true },
    { title: "닉네임" },
    { title: "지갑주소" },
    { title: "수정", hasCallback: true },
    { title: "소장 아이템 수" },
  ];
  const linkKey = [
    { title: "링크 no." },
    { title: "등록 일" },
    { title: "이미지", isImage: true },
    { title: "상태", convertInt: ["숨김", "공개"] },
    { title: "수정", hasCallback: true },
    { title: "제목" },
    { title: "설명" },
    { title: "URL" },
  ];
  const TYPESTR = {
    0: "item",
    1: "item",
    2: "user",
    3: "link",
  };

  const { curationArr, curationItems } = useSelector((state) => state.item);
  const [curCategory, setCurCategory] = useState(0);
  const [curItem, setCurItem] = useState(0);
  const [openState, setOpenState] = useState(curationArr[0].state);
  const [curationTitle, setCurationTitle] = useState(curationArr[0].title);
  const [toggleRegister, setToggleRegister] = useState(false);
  const [toggleSettings, setToggleSettings] = useState(false);
  const [dataIndex, setDataIndex] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [selectedCat, setSelectedCat] = useState(0);
  const [selectedCode, setSelectedCode] = useState(0);
  const [itemKeyList, setItemKeyList] = useState(itemKey);

  const [itemsData, setItemsData] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [curState, setCurState] = useState(0);
  const [typeState, setTypeState] = useState(0);

  const keyList = [
    { title: "큐레이션 no." },
    { title: "수정", hasCallback: true },
    { title: "상태", convertInt: ["숨김", "공개"] },
    { title: "큐레이션 명" },
    { title: "카테고리 코드" },
    { title: "카테고리 타입" },
  ];

  useEffect(() => {
    setItemsData([]);
    //selectedCat[0] - CODE
    //selectedCat[1] - TYPE
    if (selectedCat[1] == 0) {
      setItemKeyList(itemKey);
    }
    if (selectedCat[1] == 1) {
      setItemKeyList(itemKey);
    }
    if (selectedCat[1] == 2) {
      setItemKeyList(userKey);
    }
    if (selectedCat[1] == 3) {
      setItemKeyList(linkKey);
    }
    axios
      .get(
        `${API.GET_FEATURED}${TYPESTR[selectedCat[1]]}/code/${selectedCat[0]}`
      )
      .then((resp) => {
        console.log(resp.data.list);
        const itemList = resp.data.list;
        if (selectedCat[1] == 0 || selectedCat[1] == 1) {
          itemList.map((v, i) => {
            console.log(v);
            const setting = {
              icon: <TiSpanner />,
              callback: (i) => {
                setToggleSettings(true);
              },
            };
            const item = {
              no: v.displayorder,
              url: v.item.url,
              name: v.item.titlename,
              status: v.active,
              edit: setting,
              cat: selectedCat[0],
              token: "KLAY",
              price: "10.0000",
            };
            setItemsData((pre) => [...pre, item]);
          });
        } else if (selectedCat[1] == 2) {
          itemList.map((v, i) => {
            console.log(v);
            const setting = {
              icon: <TiSpanner />,
              callback: (i) => {
                setToggleSettings(true);
              },
            };
            const item = {
              no: v.displayorder,
              url: v.user.profileimageurl,
              name: v.user.nickname,
              username: v.username,
              edit: setting,
              price: "10.0000",
            };
            setItemsData((pre) => [...pre, item]);
          });
        } else if (selectedCat[1] == 3) {
          itemList.map((v, i) => {
            console.log(v);
            const setting = {
              icon: <TiSpanner />,
              callback: (i) => {
                setToggleSettings(true);
              },
            };
            const item = {
              no: v.displayorder,
              createdat: v.createdat,
              name: v.url,
              status: v.active,
              edit: setting,
              title: v.title,
              desc: v.description,
              url: v.url
            };
            setItemsData((pre) => [...pre, item]);
          });
        }
        else{
          return;
        }
      });
  }, [selectedCat]);

  useEffect(() => {
    setTableData([]);
    axios.get(API.GET_FEATURED).then((resp) => {
      const MainCategory = resp.data.list;
      //setTableData(MainCategory)
      MainCategory.map((v, i) => {
        console.log(v);
        const setting = {
          icon: <TiSpanner />,
          callback: (i) => {
            setToggleSettings(true);
          },
        };
        const information = {
          no: v.displayorder,
          edit: setting,
          visible: v.visible,
          name: v.name,
          code: v.code,
          type: v.type,
        };
        setTableData((pre) => [...pre, information]);
      });
    });
  }, []);

  const submitRegister = () => {
    //curState      => visible
    //categoryName] => categoryName
    //typeState     => TYPE

    alert(categoryName + " :::::::: " + curState);

    setCategoryName("");
    setToggleRegister(false);
  };

  // const curationTable = () => {
  //   const table = [];
  //   for (var i = 0; i < MAX_ROW_LENGTH; i++) {
  //     table.push(
  //       <tr key={i}>
  //         <td>{i + 1}</td>
  //         <td>
  //           <AiOutlinePlusSquare style={{ fontSize: "32px" }} />
  //         </td>
  //         <td
  //           onClick={() => {}}
  //           className={curItem === i ? "selected-item" : "default-item"}
  //         >
  //           <div
  //             style={{
  //               display: "flex",
  //               justifyContent: "space-between",
  //               alignItems: "center",
  //               height: "52px",
  //             }}
  //           >
  //             <img
  //               style={{ width: "48px", height: "48px" }}
  //               src={ItemImage}
  //               alt="item"
  //             />
  //             <span>item name</span>
  //           </div>
  //         </td>
  //       </tr>
  //     );
  //   }
  //   return table;
  // };

  return (
    <CurationBox>
      <Container fluid>
        <Row>
          <Col>
            <PageTitle title={"큐레이션"} margin={5} />
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
              onSelect={(e) => {
                setSelectedCat(e);
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col style={{ paddingBottom: "30px" }}>
            <Button variant="secondary" onClick={() => setToggleRegister(true)}>
              신규 등록
            </Button>
            <Button
              variant="secondary"
              onClick={() => setToggleRegister(true)}
              style={{ marginLeft: "15px" }}
            >
              위치 변경
            </Button>
            <Button
              variant="secondary"
              onClick={() => setToggleRegister(true)}
              style={{ marginLeft: "15px" }}
            >
              삭제
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <FunctionalTable
              wrapName="tableHasNo"
              keyList={itemKeyList}
              tableData={itemsData}
              clean
              onSelect={(e) => {
                setSelectedCat(e);
              }}
            />
          </Col>
        </Row>

        {/* ---------- ADD Curation Tab MODAL START---------- */}
        <Modal className="inpuListPopup" show={toggleRegister} centered>
          <Modal.Header>카테고리 등록</Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="inputBox">
                <Col>
                  <ul className="inputList">
                    {/* ---------- CATEGORY NAME ---------- */}
                    <li>
                      <div className="key">카테고리 이름 :</div>

                      <div className="value">
                        <Form.Control
                          onChange={(e) => setCategoryName(e.target.value)}
                          value={categoryName}
                        ></Form.Control>
                      </div>
                    </li>
                    {/* ---------- CATEGORY NAME ---------- */}

                    {/* ---------- VISIBLE STATUS ---------- */}
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
                    {/* ---------- VISIBLE STATUS ---------- */}

                    {/* ---------- TYPE STATUS ---------- */}
                    <li>
                      <div className="key">형식 :</div>

                      <div className="value">
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          defaultValue={typeOption[0]}
                          name="color"
                          options={typeOption}
                          onChange={(e) => setTypeState(e.value)}
                        />
                      </div>
                    </li>
                    {/* ---------- TYPE STATUS ---------- */}
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

        {/* ---------- ADD Curation Tab MODAL END ---------- */}

        {/* <Card className="notShadow">
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
            <Container className="contBox" style={{}}>
              <Card>
                <Card.Body>
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
                          <SelectWrapper
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

                  <Row className="listBox">
                    <Col className="listTitleBox">
                      <p className="listTitle">큐레이션</p>

                      <div className="curationWrapper">
                        <Table className="curationTable" bordered>
                          {curationTable()}
                        </Table>
                        <ButtonWrapper
                          variant="secondary"
                          onClick={() => {
                            setCurItem(curItem - 1);
                          }}
                        >
                          <img
                            src={I_dnPolygon}
                            alt=""
                            style={{
                              width: "24px",
                              transform: "rotate(180deg)",
                            }}
                          />
                        </ButtonWrapper>
                        <ButtonWrapper
                          variant="secondary"
                          onClick={() => {
                            setCurItem(curItem + 1);
                          }}
                        >
                          <img
                            src={I_dnPolygon}
                            alt=""
                            style={{ width: "24px" }}
                          />
                        </ButtonWrapper>
                        <ButtonWrapper variant="secondary">확인</ButtonWrapper>
                        <ButtonWrapper variant="secondary">삭제</ButtonWrapper>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Container>

            <Row className="actionBtnBox">
              <button className="whiteBtn" onClick={() => {}}>
                취소
              </button>
              <button className="grayBtn" onClick={() => {}}>
                저장
              </button>
            </Row>
          </Card.Body>
        </Card> */}
      </Container>
    </CurationBox>
  );
};

export default Curation;

const CurationBox = styled.section`
  .notShadow {
    box-shadow: none;

    .contBox {
      text-align: center;

      .listBox {
        width: 500px;
        padding: 0 0 50px;
        margin: 0 auto;
        .listTitleBox {
          padding: 0;

          .listTitle {
            font-size: 14px;
            font-weight: 600;
            text-align: start;
            color: grey;
          }
        }

        .curationWrapper {
          display: inline-block;
          width: 500px;

          .curationTable {
            margin: 0;

            tr {
              td {
                line-height: 53px;
              }

              td:nth-of-type(1) {
                width: 53px;
              }

              td:nth-of-type(2) {
                width: 45.42px;
              }
            }
          }

          .selected-item {
            background-color: lightgrey;
          }
        }
      }
    }
  }
`;

const RowWrapper = styled(Row)`
  margin-bottom: 50px;
`;
const ButtonWrapper = styled(Button)`
  width: 125px;
  cursor: pointer;
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
