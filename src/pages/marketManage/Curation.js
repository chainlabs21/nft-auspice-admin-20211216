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
  const [selectedCode, setSelectedCode] = useState(0);
  const [itemKeyList, setItemKeyList] = useState(itemKey);
  const [searchItemKeyList, setSearchItemKeyList] = useState(selectItemsList);

  const [itemsList, setItemsList] = useState({});

  const [itemMutable, setItemMutable] = useState(false);
  const [mitems, setMitems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [itemsData, setItemsData] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [curState, setCurState] = useState(1);
  const [typeState, setTypeState] = useState(0);

  const [toggleItemRegister, setToggleItemRegister] = useState(false);
  const [toggleAddLink, setToggleAddLink] = useState(false);

  //------------------------------------------
  const [linktitle, setLinktitle] = useState("");
  const [linkurl, setLinkurl] = useState("http://");
  const [linkdesc, setLinkdesc] = useState("");
  const [linkimgurl, setLinkimgurl] = useState();
  ///////////////////////

  //////FILE
  const [fileData, setFileData] =useState();
  const[photo, setPhoto] = useState()
  const [toggleEditCategory, setToggleEditCategory] = useState(false);


  ////////
  const [editLink, setEditLink] = useState(false)

  //-----ITEM CHANGE--------
  const [toggleItemChange, setToggleItemChange] = useState(false);
  const [toggleUserChange, setToggleUserChange] = useState(false)

  const [toggleSearchItem, setToggleSearchItem] = useState(false);

  useEffect(()=>{
    if(toggleItemChange){

    }
  },[toggleItemChange])






  //File Upload

  function onchangePhoto(file) {
    if (!file) return;
    const fileLength = file.length;
    const fileDot = file.name.lastIndexOf(".");
    const fileType = file.name.substring(fileDot + 1, fileLength).toLowerCase();
    if(MAP_fileextension_contentype[fileType]=='image'){
    //setPhoto(file.name);
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      setPhoto(reader.result);
    };
  }
  }

  const fileUpload = async (file) => {
    if (!file) {
      submitLinkitem()
      return;
    }
    
    const fileLength = file.length;
    const fileDot = file.name.lastIndexOf(".");
    const fileType = file.name.substring(fileDot + 1, fileLength).toLowerCase();

    if(MAP_fileextension_contentype[fileType]!='image'){  console.log('이미지 파일이 아닙니다.');return;}
    let filesize = file.size;
    if (file && filesize > 0) {
      try {
        if (filesize <= 40 * megaBytes) {
          let formData = new FormData();
          formData.append("file", file);
          formData.append("filename", file.name);
          const resp = await axios.post(`http://itemverse1.net:32287/curation/upload/file/curation`, formData);
          let { status, payload, respdata } = resp.data;
          if (status == "OK") {
            console.log(resp.data)
            submitLinkitem(resp.data.payload.url)
          }
        } else {
          console.log('파일 사이즈가 큽니다.')
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };









  //On Item Selection
  async function onShowSelectItems() {
    if (selectedCat[1] == 0 || selectedCat[1] == 1) {
      const { data } = await axios.get(
        "http://itemverse1.net:32287/admin/search/items"
      );
      if (data) {
        setShowSelectItems([]);
        const { list } = data;
        //console.log(list)
        list.map((item, index) => {
          const fields = {
            itemid: item.itemid,
            regDate: moment(item.createdat).format("YYYY-MM-DD"),
            image: item.url,
            name: item.titlename,
            owner: item.author_info?.nickname,
            token: item.priceunit,
            price: "10",
            button: item.itemid,
            id: item.itemid,
            ownerAddress: item.author_info?.username,
          };
          setShowSelectItems((prevState) => [...prevState, fields]);
        });
      }
    } else if (selectedCat[1] == 2) {
      //console.log("HELLLO")
      const { data } = await axios.get(
        "http://itemverse1.net:32287/admin/search/users"
      );
      //console.log(data)
      if (data) {
        setShowSelectItems([]);
        const { list } = data;
        console.log(list);
        list.map((item, index) => {
          const fields = {
            regDate: moment(item.createdat).format("YYYY-MM-DD"),
            image: item.profileimageurl,
            name: item.nickname,
            username: item.username,
            button: item.username,
            ownerAddress: item.author_info?.username,
          };
          setShowSelectItems((prevState) => [...prevState, fields]);
        });
      }
    }
  }

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
        getCategory();
      });
  }

  const submitRegister = async () => {
    //curState      => visible
    //categoryName] => categoryName
    //typeState     => TYPE
    await axios.post(`${API.SET_ITEM}/category`, null, {
      params: {
        visible: curState,
        name: categoryName,
        type: typeState,
      },
    }).then((resp)=>{
      console.log(resp);
      getCategory()
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
    getCategory();
    })
    
    
  }

  function onInsertToCategory(e) {
    console.log(`${API.SET_ITEM}/${selectedCat[1]}/${selectedCat[0]}/${e}`);//${API.SET_ITEM}
    axios
      .post(`${API.SET_ITEM}/${selectedCat[1]}/${selectedCat[0]}/${e}`)
      .then((resp) => {
        getItemsList();
        console.log(resp);
        if (resp.data.status == "ERR") {
          alert("이미 등록된 아이템 입니다.");
        }
      });
  }

  async function submitLinkitem(imgurl) {
    let params={}
    if (editLink){
      params={title: linktitle, url: linkurl, description: linkdesc, imgurl:imgurl, id: dataIndex}
    }else{
      params={title: linktitle, url: linkurl, description: linkdesc, imgurl:imgurl}
    }
    axios
      .post(`${API.SET_ITEM}/${selectedCat[1]}/${selectedCat[0]}/link`, null, {
        params: params,
      })
      .then((resp) => {
        console.log(resp);
        setEditLink(false)
        setDataIndex(0)
        setFileData()
        setToggleAddLink(false)
        if (resp.data.status == "ERR") {
          alert("뭐가 안되긴 했음");
        }
      });
  }

  function onItemOrderSwap(base, target) {
    console.log(`${API.SWAP_ITEMS}/${selectedCat[0]}/${base}/${target}`);
    axios
      .post(`${API.SWAP_ITEMS}/${selectedCat[0]}/${base}/${target}`)
      .then(async (resp) => {
        console.log(resp);
        console.log("변경완료");

        await getItemsList();
      });
  }

  function onItemDelete() {
    console.log(`${API.DELETE_ITEMS}/${selectedCat[0]}/`);
    console.log(selectedItems);
    axios
      .post(`${API.DELETE_ITEMS}/${selectedCat[0]}`, null, {
        params: {
          selectedItems,
        },
      }).then((resp)=>{
        console.log(resp)
        getItemsList();
      })
      
  }

  //GET SELECTED ITEMS
  useEffect(() => {
    let SelectedLength = Object.keys(itemsList).filter(
      (v, i) => itemsList[v] == true
    ).length;
    console.log(itemsList);
    setSelectedItems(
      Object.keys(itemsList).filter((v, i) => itemsList[v] == true)
    );
    if (SelectedLength == 2) {
      setMitems(Object.keys(itemsList).filter((v, i) => itemsList[v] == true));
      setItemMutable(true);
    } else {
      setItemMutable(false);
      setMitems([]);
    }
  }, [itemsList]);

  useEffect(() => {
    setItemsList({});
    setShowSelectItems([]);
    setToggleSearchItem(false);
    
  }, [selectedCat]);

  function getItemsList() {
    setItemsData([]);
    axios
      .get(
        `${API.GET_FEATURED}${TYPESTR[selectedCat[1]]}/code/${selectedCat[0]}`
      )
      .then((resp) => {
        console.log(resp.data.list);
        const itemList = resp.data.list;
        console.log(selectedCat);
        if (selectedCat[1] == 0) {
          itemList.map((v, i) => {
            console.log(v);
            const setting = {
              icon: <TiSpanner />,
              callback: (i) => {
                setToggleItemChange(!toggleItemChange)
              },
            };
            const item = {
              sel: v.id,
              no: v.displayorder,
              url: v.item.url,
              name: v.item.titlename,
              status: v.active,
              edit: setting,
              cat: v.item.categorystr,
              token: "KLAY",
              price: "10.0000",
            };
            console.log(item);
            setItemsData((pre) => [...pre, item]);
          });
        }
        if (selectedCat[1] == 1) {
          itemList.map((v, i) => {
            console.log(v);
            const setting = {
              icon: <TiSpanner />,
              callback: (i) => {
                setToggleItemChange(!toggleItemChange)
              },
            };
            const item = {
              sel: v.id,
              no: v.displayorder,
              url: v.item.url,
              name: v.item.titlename,
              status: v.active,
              edit: setting,
              cat: v.item.categorystr,
              token: "KLAY",
              price: "10.0000",
            };
            console.log(item);
            setItemsData((pre) => [...pre, item]);
          });
        } else if (selectedCat[1] == 2) {
          itemList.map((v, i) => {
            console.log(v);
            const setting = {
              icon: <TiSpanner />,
              callback: (i) => {
                setToggleUserChange(!toggleUserChange);
              },
            };
            const item = {
              sel: v.id,
              no: v.displayorder,
              url: v.user?.profileimageurl,
              name: v.user?.nickname,
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
                //LINK EDIT
                setToggleSettings(true);
                setDataIndex(v.id);
                setLinktitle(v.title)
                setLinkurl(v.url)
                setLinkdesc(v.description)
                setCurState(v.active)
                setEditLink(true)
                setToggleAddLink(true)
                console.log(v.id);
              },
            };
            const item = {
              sel: v.id,
              no: v.displayorder,
              createdat: v.createdat,
              name: v.imgurl,
              status: v.active,
              edit: setting,
              title: v.title,
              desc: v.description,
              url: v.url,
            };
            setItemsData((pre) => [...pre, item]);
          });
        } else {
          return;
        }
      });
  }

  useEffect(() => {
    //selectedCat[0] - CODE
    //selectedCat[1] - TYPE
    if (!selectedCat) {
      return;
    }
    setItemsData([]);
    if (selectedCat[1] == 0) {
      setItemKeyList(itemKey);
      setSearchItemKeyList(selectItemsList);
    }
    if (selectedCat[1] == 1) {
      setItemKeyList(itemKey);
      setSearchItemKeyList(selectItemsList);
    }
    if (selectedCat[1] == 2) {
      setItemKeyList(userKey);
      setSearchItemKeyList(selectUsersList);
    }
    if (selectedCat[1] == 3) {
      setItemKeyList(linkKey);
    }
    getItemsList();
  }, [selectedCat]);

  useEffect(()=>{

    console.log(toggleEditCategory)

  },[toggleEditCategory])
  //카테고리 목록

  function getCategory(){
    setTableData([]);
    axios.get(`http://itemverse1.net:32287/admin/search/maincategory`).then((resp) => {
      const MainCategory = resp.data.list;
      //setTableData(MainCategory)
      MainCategory.map((v, i) => {
        console.log(v)
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
          edit: setting,
          visible: v.visible,
          name: v.name,
          code: v["itemsss"].length,
          type: v.type?v.type:0,
          size: v.code,
        };
        setTableData((pre) => [...pre, information]);
      });
    });
  }
  useEffect(() => {
    getCategory();
  }, []);



  const submitItemRegister = () => {
    setToggleItemRegister(false);
  };

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
          <PageTitle
            title={selectedCat ? selectedCat[2] : "선택된 항목 없음"}
          />
        </Row>

        <Row>
          <Col style={{ paddingBottom: "30px" }}>
            <Button
              variant="secondary"
              onClick={async () => {
                if (selectedCat) {
                  if (selectedCat[1] == 3) {
                    setToggleAddLink(true);
                    return;
                  }
                  await setToggleSearchItem(!toggleSearchItem);
                  await onShowSelectItems();
                  myRef.current.scrollIntoView();
                }
              }}
            >
              신규 등록
            </Button>
            <Button
              variant="secondary"
              onClick={() => onItemOrderSwap(mitems[0], mitems[1])}
              style={{ marginLeft: "15px" }}
              disabled={!itemMutable}
            >
              위치 변경
            </Button>
            <Button
              variant="secondary"
              onClick={() => onItemDelete()}
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
              selectItem={(e) => {
                setItemsList({ ...itemsList, ...e });
                // setSelectedCat(e);
              }}
              onSelect={(e) => {}}
            />
          </Col>
        </Row>

        {/* SELECT ITEM PAGE */}
        {/* SELECT ITEM PAGE */}
        {/* SELECT ITEM PAGE */}
        <Row className={toggleSearchItem ? "" : "d-none"} ref={myRef}>
          <PageTitle title={"아이템 선택"} />
          <Col>
            <FunctionalTable
              wrapName="tableHasNo"
              keyList={searchItemKeyList}
              tableData={showSelectItems}
              search
              selectItem={(e) => {
                setItemsList({ ...itemsList, ...e });
                // setSelectedCat(e);
              }}
              selectCreateItem={(e) => {
                onInsertToCategory(e);
              }} //onAddToCategory
              onSelect={(e) => {}}
            />
          </Col>
        </Row>
        {/* SELECT ITEM PAGE */}
        {/* SELECT ITEM PAGE */}
        {/* SELECT ITEM PAGE */}

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

        {/* ---------- ADD ITEM Register Tab MODAL START---------- */}
        <Modal className="inpuListPopup" show={toggleItemRegister} centered>
          <Modal.Header>아이템 등록</Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="inputBox">
                <Col>
                  <ul className="inputList">
                    {/* ---------- CATEGORY NAME ---------- */}
                    <li>
                      <div className="key">카테고리 코드 :</div>

                      <div className="value">
                        {selectedCat ? selectedCat[0] : "선택된 카테고리 없음"}
                        {/* <Form.Control
                          onChange={(e) => setCategoryName(e.target.value)}
                          value={categoryName}
                        ></Form.Control> */}
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
                    setToggleItemRegister(false);
                  }}
                  variant="outline-secondary"
                >
                  취소
                </button>
                <button
                  className="grayBtn"
                  onClick={submitItemRegister}
                  variant="secondary"
                >
                  확인
                </button>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>

        {/* ---------- ADD ITEM Register Tab MODAL END ---------- */}

        {/* ---------- ADD/EDIT LINK Tab MODAL START---------- */}
        <Modal className="inpuListPopup" show={toggleAddLink} centered>
          <Modal.Header>{editLink?"링크 수정":"링크 등록"}</Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="inputBox">
                <Col>
                  <ul className="inputList">
                  {photo? (<><img src={photo} /></>):<></>}
                  <div className="value"  style={{margin:'auto'}}>
                        <Form.Control
                          type="file"
                    accept="image/*"
                    //ref={photoRef}
                    onChange={(e) => {setFileData(e.target.files[0])//fileUpload();
                      onchangePhoto(e.target.files[0])}}
                        ></Form.Control>
                      </div>

                    {/* ---------- LINK TITLE ---------- */}
                    <li>
                      <div className="key">{dataIndex}링크 이름 :</div>

                      <div className="value">
                        <Form.Control
                          onChange={(e) => setLinktitle(e.target.value)}
                          value={linktitle}
                        ></Form.Control>
                      </div>
                    </li>
                    {/* ---------- LINK TITLE ---------- */}
                    {/* ---------- LINK URL ---------- */}
                    <li>
                      <div className="key">링크 URL :</div>

                      <div className="value">
                        <Form.Control
                          onChange={(e) => setLinkurl(e.target.value)}
                          value={linkurl}
                        ></Form.Control>
                      </div>
                    </li>
                    {/* ---------- LINK URL ---------- */}

                    {/* ---------- LINK DESC ---------- */}
                    <li>
                      <div className="key">링크 설명 :</div>

                      <div className="value">
                        <Form.Control
                          as="textarea"
                          rows={2}
                          onChange={(e) => setLinkdesc(e.target.value)}
                          value={linkdesc}
                        ></Form.Control>
                      </div>
                    </li>
                    {/* ---------- LINK DESC ---------- */}

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
                  </ul>
                </Col>
              </Row>
              <Row className="actionBtnBox">
                <button
                  className="whiteBtn"
                  onClick={() => {
                    setTypeState(0);
                    setLinktitle("");
                    setLinkurl("http://");
                    setToggleAddLink(false);
                    setEditLink(false)

                  }}
                  variant="outline-secondary"
                >
                  취소
                </button>
                <button
                  className="grayBtn"
                  onClick={() => {
                    fileUpload(fileData)
                    //submitLinkitem();
                  }}
                  variant="secondary"
                >
                  확인
                </button>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>

        {/* ---------- ADD LINK Tab MODAL END ---------- */}

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
