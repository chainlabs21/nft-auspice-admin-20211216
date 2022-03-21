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
import axios from 'axios';
import { API } from "../../utils/api";
import moment from 'moment';

const keyList = [
  { title: "No" },
  { title: "Item", Videoable:true, },
  {title: 'Item name'},
  {
    title: "상태",
    filter: true,
    convertInt: ["정상", "검수중", "정책 위반"],
  },
  { title: "검수", hasCallback: true },
  { title: "신고자", hasChildren: true, numChildren: 2 },
  {
    title: "닉네임",
    isChildren: true,
    search: true,
  },
  { title: "지갑 주소", isChildren: true },
  { title: "아이템 토큰" },
  { title: "아이템 가격" },
  { title: "신고 카테고리" },
  { title: "내용" },
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

const CategoryKeyList=[
  { title: "No" },
  { title: "등록일", isDate: true  },
  { title: "상태", convertInt: ['숨김', '공개']},
  { title: "수정", hasCallback: true },
  { title: "신고 카테고리 명" },
]

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
  const [categoryData, setCategoryData] = useState([]);
  const [toggleRegister, setToggleRegister] = useState(false)
  const [reportData, setReportData] = useState([])
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

  useEffect(()=>{
    setCategoryData([])
    setReportData([])
    axios.get(`${process.env.REACT_APP_API_SERVER}/queries/reportcategory`)
    .then((resp)=>{
      let {data} = resp;
      if(data){
        let {list} = data;

        list.map((v, i)=>{
          if(i==0){return}
          const callbackData = {
            icon: <TiSpanner style={{ fontSize: "24px" }} />,
            callback: (index) => {
              setItemToggle(true);
              setDataIndex(i);
            },
          }
          const item={
            id: v.id-1,
            createdat: moment(v.createdat).format("YYYY-MM-DD"),
            visible: v.visible,
            setting: callbackData,
            name: v.name,
            code: v.code
          }
          setCategoryData(pre=>[...pre, item])
        })
      }
    })

    axios.get(`${process.env.REACT_APP_API_SERVER}/report/rows`)
    .then((resp)=>{
      let {data} = resp;
      if(data){
        let {list} = data;
        console.log(list)

        list.map((v, i)=>{
          const callbackData = {
            icon: <TiSpanner style={{ fontSize: "24px" }} />,
            callback: (index) => {
              setItemToggle(true);
              setDataIndex(i);
            },
          }
          const item={
            id: v.id,                                               //0
            //createdat: moment(v.createdat).format("YYYY-MM-DD"),
            image: v.item_info.url,                                 //1
            itemtitle: v.item_info.titlename,                       //2
            status: v.status,                                       //3
            setting: callbackData,                                  //4
            reportername: v.reporter_info.nickname,                 //5
            reporteraddr: v.reporter_info.username,                 //6
            creator: v.item_info.priceunit,                         //7
            price: v.item_info.pricemax,                            //8
            category: '카테고리',                                     //9
            description: v.description,                             //10
            itemtype: v.item_info.typestr                           //11
          }
          setReportData(pre=>[...pre, item])
        })
      }
    })
  },[])

  return (
    <Container fluid>
      <Row>
        <Col>
          <PageTitle title={"신고 카테고리"} margin={5} />
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
              keyList={CategoryKeyList}
              tableData={categoryData}
              clean
              onSelect={(e) => {
                //setSelectedCat(e);
              }}
            />
          </Col>
        </Row>
      <Row>
        <Col>
          <FunctionalTable
            wrapName="mintingInspectionList tableHasNo"
            keyList={keyList}
            tableData={reportData}//tableData}
            search
            refresh
            datePicker
            excel
          />
        </Col>
      </Row>
      <Modal className="itemPopup" show={itemToggle} centered>
        <Modal.Header style={{ justifyContent: "center" }}>
          <Modal.Title>{itemList[dataIndex].name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="imgContainer">
              <Col style={{ textAlign: "center" }}>
                <span className="imgBox">
                  <img src={ItemImage} alt="gameItem" />
                </span>
              </Col>
            </Row>
            <Row className="selectBox">
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
            <Row className="btnBox">
              <Col className="actionBtnBox">
                <Button
                  className="grayBtn"
                  variant="secondary"
                  onClick={handleSubmit}
                >
                  확인
                </Button>
                <Button
                  className="whiteBtn"
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
