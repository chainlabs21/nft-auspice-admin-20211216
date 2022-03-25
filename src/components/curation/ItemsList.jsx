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

import SearchItem from "../curation/modal/SearchItem"
import ConfirmationModal from "../modal/ConfirmationModal";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import moment from "moment";

import Select from "react-select";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useSelector } from "../../store/reducer";
import ItemImage from "../../assets/images/item.png";
import FunctionalTable from "../table/FunctionalTable";
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

export default function ItemsList({ selected, data, isLoading }) {
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

  const [code, setCode] = useState();
  const [type, setType] = useState();
  const [name, setName] = useState();
  const [fileData, setFileData] =useState();
  const[photo, setPhoto] = useState()

  const [count, setCount] = useState(0);
  const [toggleSettings, setToggleSettings] = useState(false);
  const [dataIndex, setDataIndex] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [selectedCat, setSelectedCat] = useState();
  const [mitems, setMitems] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [curState, setCurState] = useState(1);
  const [typeState, setTypeState] = useState(0);
  const [itemsData, setItemsData] = useState([]);
  const [toggleAddLink, setToggleAddLink] = useState(false);
  const [toggleSearchItem, setToggleSearchItem] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [linktitle, setLinktitle] = useState("");
  const [linkurl, setLinkurl] = useState("http://");
  const [linkdesc, setLinkdesc] = useState("");
  const [linkimgurl, setLinkimgurl] = useState();
  const [editLink, setEditLink] = useState(false);
  const [itemsList, setItemsList] = useState({});
  const [itemMutable, setItemMutable] = useState(false);
  const [itemKeyList, setItemKeyList] = useState(itemKey);
  const [searchItemKeyList, setSearchItemKeyList] = useState(selectItemsList);
  const [confirmSwap, setConfirmSwap] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  ///////////////////////
  const [toggleItemChange, setToggleItemChange] = useState(false);

  useEffect(() => {
    if (!data) {
      return;
    }
    setCode(data[0]);
    setType(data[1]);
    setName(data[2]);
  }, [data]);

  useEffect(() => {
    if (code && type && name) {
      getItemsList();
    }
  }, [code, type, name]);

  useEffect(() => {
    //selectedCat[0] - CODE
    //selectedCat[1] - TYPE

    switch (type) {
      case 2:
        setItemKeyList(userKey);
        setSearchItemKeyList(selectUsersList);
        break;
      case 3:
        setItemKeyList(linkKey);
        break;
      default:
        setItemKeyList(itemKey);
        setSearchItemKeyList(selectItemsList);
        break;
    }
    getItemsList();
  }, [type]);

  function onItemDelete() {
    console.log(`${API.DELETE_ITEMS}/${code}/`);
    console.log(selectedItems);
    axios
      .post(`${API.DELETE_ITEMS}/${code}`, null, {
        params: {
          selectedItems,
        },
      })
      .then((resp) => {
        //console.log(resp);
        setItemsData([]);
        getItemsList();
        setItemsList({});
      });
  }

  function onItemOrderSwap(base, target) {
    //console.log(`${API.SWAP_ITEMS}/${selectedCat[0]}/${base}/${target}`);
    axios
      .post(`${API.SWAP_ITEMS}/${code}/${base}/${target}`)
      .then(async (resp) => {
        setConfirmSwap(false);
        setItemsData([]);
        await getItemsList();
        setItemsList({});
      });
  }

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

  function setStateAsync() {
    return new Promise((resolve) => {
      setItemsData([]);
      //this.setState(state, resolve)
    });
}

  async function getItemsList() {
    isLoading(true);
    setItemsData([]);

    setItemsData([]);
    await axios
      .get(`${API.GET_FEATURED}${TYPESTR[type]}/code/${code}`)
      .then((resp) => {
        
        let { list } = resp.data;
        if (!list) {
          return;
        }
        const itemList = list;
        

        switch (type) {
          case 2:
            itemList.map((v, i) => {
              const item = {
                sel: v.id,
                no: v.displayorder,
                url: v.user?.profileimageurl,
                name: v.user?.nickname,
                username: v.username,
                price: "10.0000",
                //type: v.type
              };
              setItemsData((pre) => [...pre, item]);
            });
            break;
          case 3:
            itemList.map((v, i) => {
              console.log(v);
              const setting = {
                icon: <TiSpanner />,
                callback: (i) => {
                  //LINK EDIT
                  setToggleSettings(true);
                  setDataIndex(v.id);
                  setLinktitle(v.title);
                  setLinkurl(v.url);
                  setLinkdesc(v.description);
                  setCurState(v.active);
                  setEditLink(true);
                  setToggleAddLink(true);
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
            break;
          default:
            itemList.map((v, i) => {
              const item = {
                sel: v.id,
                no: v.displayorder,
                url: [v.item.typestr, v.item.url],
                name: v.item.titlename,
                status: v.active,
                cat: v.item.categorystr,
                token: "KLAY",
                price: "10.0000",
                type: v.item.typestr,
              };
              //console.log(item);
              setItemsData((pre) => [...pre, item]);
            });
            break;
        }
      });
    isLoading(false);
  }

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

  async function submitLinkitem(imgurl) {
    let params={}
    if (editLink){
      params={title: linktitle, url: linkurl, description: linkdesc, imgurl:imgurl, id: dataIndex}
    }else{
      params={title: linktitle, url: linkurl, description: linkdesc, imgurl:imgurl}
    }
    axios
      .post(`${API.SET_ITEM}/${type}/${code}/link`, null, {
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

  //카테고리 목록
  return (
    <>
    <Container>
    <Row>
            <PageTitle
              title={data?name : "선택된 항목 없음"}
            />
          </Row>
      <Row >
        <Col style={{ paddingBottom: "30px" }}>
          <Button
            variant="secondary"
            onClick={async () => {
              //console.log(data)

              if (data) {
                if (type == 3) {
                  setToggleAddLink(true);
                  return;
                }
                //console.log('hello')
                window.location.hash = `#/curation/searchitem?type=${type}&code=${code}`;
              }
            }}
          >
            신규 등록
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setConfirmSwap(true);
            }} //onItemOrderSwap(mitems[0], mitems[1])
            style={{ marginLeft: "15px" }}
            disabled={!itemMutable}
          >
            위치 변경
          </Button>
          <Button
            variant="secondary"
            onClick={() => setConfirmDelete(true)} //confirmDelete
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
      </Container>
      {/* <SearchItem type={type} code={code} show={true}/> */}
      <ConfirmationModal
        show={confirmSwap}
        onCancel={() => {
          setConfirmSwap(false);
        }}
        title="위치 변경 확인"
        description="위치를 변경하시겠습니까?"
        onSubmit={() => {
          onItemOrderSwap(mitems[0], mitems[1]);
        }}
      />
      <ConfirmationModal
        show={confirmDelete}
        onCancel={() => {
          setConfirmDelete(false);
        }}
        title="아이템 삭제 확인"
        description={"아이템들을 삭제하시겠습니까?"}
        onSubmit={() => {
          onItemDelete();
        }}
      />

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
      
    </>
  );
}

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
