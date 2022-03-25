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
  import { useState, useEffect, useRef } from "react";
  import moment from "moment";
  
  import Select from "react-select";
  import { AiOutlinePlusSquare } from "react-icons/ai";
  import { useSelector } from "../../store/reducer";
  import ItemImage from "../../assets/images/item.png";
  import FunctionalTable from "../table/FunctionalTable";
  import EditCategory from "./modal/EditCategory"
  import { TiSpanner, TiDelete } from "react-icons/ti";
  import {
    MainCategorySelector,
    CategoryMainRowWrapper,
  } from "../../stlye/globalStyles";
  import PageTitle from "../PageTitle";
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
  
  export default function CategoryList({selected, data, show}){
    const myRef = useRef(null);
  
    const kiloBytes = 1024;
  const megaBytes = 1024 * kiloBytes;
  const MAP_fileextension_contentype = {
    jpg: "image",
    jpeg: "image",
    png: "image",
    gif: "image",
    svg: "image",
    mp4: "video",
    webm: "video",
    mp3: "audio",
    wav: "audio",
    ogg: "audio",
  };
  
    const keyList = [
      { title: "큐레이션 no." },
      { title: "수정", hasCallback: true },
      { title: "상태", convertInt: ["숨김", "공개"] },
      { title: "큐레이션 명" },
      { title: "아이템 수" },
      { title: "카테고리 타입", isCategoryType: true },
    ];
  
    const itemKey = [
      { title: "-", isSelect: true },
      { title: "아이템 no." },
      { title: "아이템", Videoable: true },
      { title: "아이템 명" },
      { title: "상태", convertInt: ["숨김", "공개"] },
      { title: "수정", hasCallback: true },
      { title: "카테고리" },
      { title: "아이템 토큰" },
      { title: "아이템 가격" },
    ];
    const userKey = [
      { title: "-", isSelect: true },
      { title: "유저 no." },
      { title: "이미지", isImage: true },
      { title: "닉네임" },
      { title: "지갑주소" },
      { title: "수정", hasCallback: true },
      { title: "소장 아이템 수" },
    ];
    const linkKey = [
      { title: "-", isSelect: true },
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
  
    const selectItemsList = [
      { title: "itemID", search: true },
      { title: "등록 일시", isDate: true },
      { title: "아이템", Videoable: true },
      { title: "아이템 명", search: true },
      { title: "소유자", search: true },
      { title: "토큰" },
      { title: "가격" },
      { title: "선택", isButton: true },
    ];
    const selectUsersList = [
      { title: "등록 일시", isDate: true },
      { title: "프로필 이미지", isImage: true },
      { title: "닉네임", search: true },
      { title: "지갑 주소" },
      { title: "선택", isButton: true },
    ];
    const [toggle, setToggle] = useState(show);
  
    const [showSelectItems, setShowSelectItems] = useState([]);
    const [DEFAULT_SIZE, setDEFAULT_SIZE] = useState(20);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [orderKey, setOrderKey] = useState("id");
    const [orderVal, setOrderVal] = useState("DESC");
    const [search, setSearch] = useState("");
    const [filterVal, setFilterVal] = useState();
  
    const [count, setCount] = useState(0);
    const [toggleRegister, setToggleRegister] = useState(false);
    const [toggleSettings, setToggleSettings] = useState(false);
    const [dataIndex, setDataIndex] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [selectedCat, setSelectedCat] = useState();
    const [mitems, setMitems] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [curState, setCurState] = useState(1);
    const [typeState, setTypeState] = useState(0);
    ///////////////////////
    const [toggleEditCategory, setToggleEditCategory] = useState(false);
    const [toggleCreateCategory, setToggleCreateCategory] = useState(false);
  

    //카테고리 목록

    async function onDeleteCategory(){
      await axios
        .post(`${API.DELETE_ITEMS}/category`, null, {
          params: {
            id:dataIndex,
          },
        })
        .then((resp) => {
          console.log(resp);
          console.log("변경완료");
          setCategoryName("");
          setTypeState(0)
          setCurState(1)
          setToggleEditCategory(false);
        });
    }
  
    const submitRegister = async () => {
      //curState      => visible
      //categoryName] => categoryName
      //typeState     => TYPE
      await axios.post(`${API.SET_ITEM}/category`, null, {
        params: {
          visible : curState,
          name    : categoryName,
          type    : typeState,
        },
      }).then((resp)=>{
        console.log(resp);
      });
      setCategoryName("");
      setToggleRegister(false);
    };
  
    async function onEditCategory(){
      await axios.post(`${API.SET_ITEM}/category`, null, {
        params: {
          id      : dataIndex,
          visible : curState,
          name    : categoryName,
          type    : typeState,
        },
      }).then((resp)=>{
        console.log(resp)
        setCategoryName("");
      setTypeState(0)
      setToggleEditCategory(false);
      })
      
      
    }

    function onSelected(e){
        selected(e)
    }
  
    function getCategory(){
      setTableData([]);
      axios.get(`http://itemverse1.net:32287/admin/search/maincategory`).then((resp) => {
        const MainCategory = resp.data.list;
        //setTableData(MainCategory)
        MainCategory.map((v, i) => {
          //console.log(v)
          //console.log(v);
          const setting = {
            icon: <TiSpanner />,
            callback: (i) => {
              setCategoryName(v.name);
              setCurState(v.visible);
              setTypeState(v.type);
              setDataIndex(v.id);
              setToggleEditCategory(true);
            },
          };
          const information = {
            no      : v.displayorder,
            edit    : setting,
            visible : v.visible,
            name    : v.name,
            code    : v["itemsss"].length,
            type    : v.type?v.type:0,
            size    : v.code,
          };
          setTableData((pre) => [...pre, information]);
        });
      });
    }
    useEffect(() => {
      getCategory();
    }, []);
  
    return (
        <>
          <Row>
            <Col style={{ paddingBottom: "30px" }}>
              <Button variant="secondary" onClick={() => {console.log(toggleRegister); setToggleRegister(true)}}>
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
                  onSelected(e)
                }}
              />
            </Col>
          </Row>
          {/* ---------- ADD CATEGORY MODAL START---------- */}
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
                          defaultValue={stateOption[curState]}
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
                          defaultValue={typeOption[typeState]}
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
                    setTypeState(0);
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

        {/* ---------- ADD CATEGORY MODAL END ---------- */}

        {/* ---------- EDIT CATEGORY MODAL START---------- */}
        <Modal className="inpuListPopup" show={toggleEditCategory} centered>
          <Modal.Header>카테고리 수정</Modal.Header>
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
                          defaultValue={stateOption[curState]}
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
                          defaultValue={typeOption[typeState]}
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
                  variant="danger"
                  className="btn-danger"
                  onClick={() => {
                    // setCategoryName("");
                    // setTypeState(0);
                    // setToggleEditCategory(false);
                    onDeleteCategory();
                  }}
                >
                  삭제
                </button>
                <button
                  className="whiteBtn"
                  onClick={() => {
                    setCategoryName("");
                    setTypeState(0);
                    setToggleEditCategory(false);
                  }}
                  variant="outline-secondary"
                >
                  취소
                </button>
                <button
                  className="grayBtn"
                  onClick={() => {
                    onEditCategory();
                  }}
                  variant="secondary"
                >
                  확인
                </button>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>

        {/* ---------- EDIT CATEGORY Tab MODAL END ---------- */}
          {/* {toggleEditCategory && <EditCategory data={[categoryName, curState, typeState, dataIndex]} off={setToggleEditCategory}/>} */}
          </>
    );
  };
  

  
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
  