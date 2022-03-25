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
  import {useLocation} from "react-router-dom"
  import queryString from "query-string";

  import { useDispatch } from "react-redux";
  import { useState, useEffect, useRef } from "react";
  import moment from "moment";
  
  import Select from "react-select";
  import { AiOutlinePlusSquare } from "react-icons/ai";
  import { useSelector } from "../../../store/reducer";
  import FunctionalTable from "../../../components/table/FunctionalTable";
  import { TiSpanner, TiDelete } from "react-icons/ti";
  import {
    MainCategorySelector,
    CategoryMainRowWrapper,
  } from "../../../stlye/globalStyles";
  import PageTitle from "../../../components/PageTitle";
  import axios from "axios";
  import { API } from "../../../utils/api";
  
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
  
  const SearchItem = () => {
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
      { title: "아이템", isImage: true},//Videoable: true },
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
    const {search} = useLocation();
    const { code, type } = queryString.parse(search);
  
    const [showSelectItems, setShowSelectItems] = useState([]);
    const [searchItemKeyList, setSearchItemKeyList] = useState(selectItemsList);
  
    const [itemsList, setItemsList] = useState({});
  
    
    const [toggleItemRegister, setToggleItemRegister] = useState(false);
  
    const [toggleSearchItem, setToggleSearchItem] = useState(true);
    const [toggle, setToggle] = useState(true)

    useEffect(()=>{
        if(!code && !type){return;}
        if (type==2){
          setSearchItemKeyList(selectUsersList);
        }else{
          setSearchItemKeyList(selectItemsList);
        }
        
        onShowSelectItems(code, type)
    },[code, type])

    function onInsertToCategory(e) {
      //console.log(`${API.SET_ITEM}/${type}/${code}/${e}`);//${API.SET_ITEM}
      axios
        .post(`${API.SET_ITEM}/${type}/${code}/${e}`)
        .then((resp) => {
          //getItemsList();
          console.log(resp);
          window.location.hash = `#/curation`;
          if (resp.data.status == "ERR") {
            alert("이미 등록된 아이템 입니다.");
          }
        });
    }
  
  
    //On Item Selection
    async function onShowSelectItems(code, type) {
      if (type == 0 || type == 1) {
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
              image: [item.typestr,item.url],
              name: item.titlename,
              owner: item.author_info?.nickname,
              token: item.priceunit,
              price: "10",
              button: item.itemid,
              id: item.itemid,
              ownerAddress: item.author_info?.username,
              type: item.typestr,
              
            };
            setShowSelectItems((prevState) => [...prevState, fields]);
          });
        }
      } else if (type == 2) {
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
  
    // useEffect(() => {
    //   setItemsList({});
    //   setShowSelectItems([]);
    //   setToggleSearchItem(false);
      
    // }, [selectedCat]);
  
  
  
    const submitItemRegister = () => {
      setToggleItemRegister(false);
    };
  
    return (
      <>
      <SearchBox>
      <Container fluid>
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
          </Container>
          </SearchBox>
          </>
    );
  };
  
  export default SearchItem;
  
  const SearchBox = styled.section`
  z-index: 10px;
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
  