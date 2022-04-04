import {
  Form,
  Modal,
  Card,
  Table,
  Row,
  Col,
  Container,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import styled from "styled-components";
import { DropdownWrapper } from "../../stlye/globalStyles";
import { useSelector } from "../../store/reducer";
import FunctionalTable from "../../components/table/FunctionalTable";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
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
const statusOption =['정상', '검수중', '정책 위반']

const stateOption = [
  { value: 0, label: "정상" },
  { value: 1, label: "검수중" },
  { value: 2, label: "정책 위반" },
];




const ReportDetail = () => {
  const { itemList, todayRegister, totalRegister, mintingWait, totalMinting } =
    useSelector((state) => state.item);
    const history = useHistory();
    const { search } = useLocation();
    const { reportId } = queryString.parse(search);
    const [createdAt, setCreatedAt] =useState();
    const [reporterNickname, setReporterNickname] = useState();
    const [reporterAddress, setReporterAddress] = useState();
    const [reportCategory, setReportCategory] = useState();
    const [reportDesc, setReportDesc] = useState();
    const [reportStatus, setReportStatus] = useState();
    const [itemImage, setItemImage] = useState();
    const [itemCreatedAt, setItemCreatedAt] = useState();
    const [itemName, setItemName] = useState();
    const [itemOwner, setItemOwner] = useState();
    const [chain, setChain] = useState();
    const [price, setPrice] = useState();
    const [itemId, setItemId]= useState();

  const dispatch = useDispatch();

  useEffect(()=>{
    if(reportId)
    axios.get(`${process.env.REACT_APP_API_SERVER}/report/search/item/${reportId}`).then((resp)=>{
      console.log(resp)
      let {list} = resp.data;
      let reportdata = list[0]
      setCreatedAt(list[0].createdat)
      setReporterNickname(list[0].reporter_info.nickname)
      setReporterAddress(list[0].reporter);
      setReportCategory(list[0].category);
      setReportDesc(list[0].description)
      /////////////////////////////////////
      setReportStatus(stateOption[parseInt(list[0].status)]);
      ///////////////////////////////////////////
      setItemImage(list[0].item_info.url);
      setItemCreatedAt(list[0].item_info.createdat)
      setItemName(list[0].item_info.titlename);
      setItemOwner(list[0].item_info.author_info.nickname);
      setItemId(list[0].itemid)
      setChain(list[0].item_info.priceunit)
      setPrice(list[0].item_info.pricemax)
    })
  },[reportId])

  function handleClose(){
    history.push("/report");
  }

  function handleSubmit(){
    axios.put(`${process.env.REACT_APP_API_SERVER}/report/${reportId}`,{status: reportStatus.value, itemid: itemId}).then((resp)=>{ // report.js from serve
      console.log(resp)
      history.push("/report");
    })
  }

  useEffect(()=>{
    console.log(reportStatus);
  },[reportStatus])

  return (
    <Container fluid>
      <Row>
        <Col>
          <PageTitle title={"신고 카테고리"} margin={5} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <RowWrapper>
                <div className="key">
                  <p>신고 일자 </p>
                  <p>:</p>
                </div>

                <div className="value">
                  <Form.Control
                    readOnly
                    defaultValue={createdAt}
                  ></Form.Control>
                </div>
              </RowWrapper>
              <RowWrapper>
                <div className="key">
                  <p>신고자 닉네임</p>
                  <p>:</p>
                </div>

                <div className="value">
                  <Form.Control
                    readOnly
                    defaultValue={reporterNickname}
                  ></Form.Control>
                </div>
              </RowWrapper>
              <RowWrapper>
                <div className="key">
                  <p>신고자 Address</p>
                  <p>:</p>
                </div>

                <div className="value">
                  <Form.Control
                    readOnly
                    defaultValue={reporterAddress}
                  ></Form.Control>
                </div>
              </RowWrapper>
              <RowWrapper>
                <div className="key">
                  <p>신고 카테고리</p>
                  <p>:</p>
                </div>

                <div className="value">
                  <Form.Control
                    readOnly
                    defaultValue={reportCategory}
                  ></Form.Control>
                </div>
              </RowWrapper>
              <RowWrapper>
                <div className="key">
                  <p>신고 내용</p>
                  <p>:</p>
                </div>

                <div className="value">
                
                  <Form.Control
                    readOnly
                    defaultValue={reportDesc}
                    value={reportDesc}
                  ></Form.Control>
                </div>
              </RowWrapper>
            </Card.Header>
            <Card.Body>
            <RowWrapper>
                <div className="key">
                  <p>검수 결과 '{statusOption[reportStatus]}</p>
                  <p>:</p>
                </div>

                <div className="value">
                
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={stateOption}
                    value={reportStatus}
                    name="color"
                    options={stateOption}
                    onChange={
                      setReportStatus
                    }
                  />
                </div>
              </RowWrapper>
            </Card.Body>
            <Card.Body style={{borderTop:'solid 1px #E2E5E8'}}>
              <ItemBox>
                <div className="imagebox">
                <img className="image" src={itemImage} alt=''/>
                </div>
                <div className="descbox">
                <RowWrapper style={{marginTop:'0'}}>
                <div className="key">
                  <p>등록일</p>
                  <p>:</p>
                </div>
                <div className="value">
                  <Form.Control
                    readOnly
                    value={itemCreatedAt}
                  ></Form.Control>
                </div>
              </RowWrapper>
              <RowWrapper>
                <div className="key">
                  <p>이름</p>
                  <p>:</p>
                </div>
                <div className="value">
                  <Form.Control
                    readOnly
                    value={itemName}
                  ></Form.Control>
                </div>
              </RowWrapper>
              <RowWrapper>
                <div className="key">
                  <p>작가</p>
                  <p>:</p>
                </div>
                <div className="value">
                  <Form.Control
                    readOnly
                    value={itemOwner}
                  ></Form.Control>
                </div>
              </RowWrapper>
              <RowWrapper>
                <div className="key">
                  <p>코인</p>
                  <p>:</p>
                </div>
                <div className="value">
                  <Form.Control
                    readOnly
                    value={chain}
                  ></Form.Control>
                </div>
              </RowWrapper>
              <RowWrapper>
                <div className="key">
                  <p>가격</p>
                  <p>:</p>
                </div>
                <div className="value">
                  <Form.Control
                    readOnly
                    value={price}
                  ></Form.Control>
                </div>
              </RowWrapper>
                </div>
              </ItemBox>
            </Card.Body>

            <Card.Footer>
              <Container>
                <Row>
                  <Col style={{ textAlign: "center" }}>
                    <div>
                      <ButtonWrapper variant="danger" onClick={()=>{handleClose()}}>
                        닫기
                      </ButtonWrapper>

                      <ButtonWrapper variant="secondary" onClick={()=>{handleSubmit()}}>
                        확인
                      </ButtonWrapper>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ReportDetail;

const ButtonWrapper = styled(Button)`
  margin-right: 30px;
`;

const ItemBox = styled.div`
justify-content: center;
display: flex;
gap: 20px;
.imagebox{
height: 254px;
.image{
  height: 100%;
}
}
.descbox
flex:1;
`;

const RowWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin: 16px 0 0 0;

  .key {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 140px;
    height: 38px;

    p {
      margin: 0;
    }
  }

  .value {
    flex: 1;
    height: 38px;

    input {
      height: 100%;
    }
  }
`;