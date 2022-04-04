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
import ConfirmationModal from "../../components/modal/ConfirmationModal";
  
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
  
  
  const ReportDetail = () => {
    const history = useHistory();
      const { search } = useLocation();
      const { ticketId } = queryString.parse(search);
      const [ticket_info, setTicket_info] = useState({})
      const [toggleDelete, setToggleDelete] = useState(false);
      const [replyText, setReplyText] = useState('');
  
    const dispatch = useDispatch();
  
    useEffect(()=>{
      if(ticketId)
      axios.get(`${process.env.REACT_APP_API_SERVER}/support/ticket/${ticketId}`).then((resp)=>{
        console.log(resp)
        let {list} = resp.data;
        setTicket_info(list)
      })
    },[ticketId])

    function handleDelete(){
        axios.delete(`${process.env.REACT_APP_API_SERVER}/support/ticket/${ticketId}`).then((resp)=>{
            history.push("/support/ticket/");
        })
    }

    function handleReject(){
        axios.put(`${process.env.REACT_APP_API_SERVER}/support/ticket/${ticketId}`,{
            pic:'관리자',
            answer: '답변이 거부되었습니다.',
            status: 3
        }).then((resp)=>{
            history.push("/support/ticket/");
        })
    }

    function handleCancel(){
        history.push("/support/ticket/");
    }

    function handleSubmit(){
        axios.put(`${process.env.REACT_APP_API_SERVER}/support/ticket/${ticketId}`,{
            pic:'관리자',
            answer: replyText,
            status: 2
        }).then((resp)=>{
            history.push("/support/ticket/");
        })
    }
  
    return (
      <Container fluid>
      {toggleDelete&&<ConfirmationModal show={toggleDelete} title='경고' description='정말로 삭제하시겠습니까?' onCancel={()=>{setToggleDelete(false)}} onSubmit={()=>{handleDelete()}}/>}
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
                    <p>등록 일자 </p>
                    <p>:</p>
                  </div>
  
                  <div className="value">
                    <Form.Control
                      readOnly
                      defaultValue={moment(ticket_info?.createdat).format('YYYY-MM-DD HH:mm:ss')}
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
                      defaultValue={ticket_info?.requester_info?.nickname}
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
                      defaultValue={ticket_info?.username}
                    ></Form.Control>
                  </div>
                </RowWrapper>
                <RowWrapper>
                  <div className="key">
                    <p>문의 제목</p>
                    <p>:</p>
                  </div>
  
                  <div className="value">
                  
                    <Form.Control
                      readOnly
                      defaultValue={ticket_info?.title}
                    ></Form.Control>
                  </div>
                </RowWrapper>
                <RowWrapperTextArea>
                  <div className="key">
                    <p>문의 내용</p>
                    <p>:</p>
                  </div>
  
                  <div className="value">
                  
                    <textarea
                    className="descriptionBox"
                        
                      readOnly
                      defaultValue={ticket_info?.description+'\n\n\nasdf'}
                      rows="4"
                    ></textarea>
                  </div>
                </RowWrapperTextArea>
              </Card.Header>
              <Card.Body>
              <RowWrapperTextArea>
  
                  <div className="value">
                  
                    <textarea
                    className="descriptionBox"
                      placeholder="답변을 입력해주세요."
                      onChange={(e)=>setReplyText(e.target.value)}
                      value={replyText}
                    ></textarea>
                  </div>
                </RowWrapperTextArea>
              </Card.Body>
  
              <Card.Footer>
                <Container>
                  <Row>
                    <Col style={{ textAlign: "center" }}>
                      <div>
                        <ButtonWrapper variant="danger" onClick={()=>{setToggleDelete(true)}}>
                          삭제
                        </ButtonWrapper>
                        <ButtonWrapper variant="primary" onClick={()=>{handleReject()}}>
                          답변 거부
                        </ButtonWrapper>
                        <ButtonWrapper variant="secondary" onClick={()=>{handleCancel()}}>
                          취소
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
  width: 100px;
    margin-right: 30px;
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
    .descriptionBox{
        width: 100%; 
        padding: 10px;
        height:144px;
        resize: none;
        overflowY:scroll;
        background-color: #E9ECEF;
        border-color: #CFD4DA;
    }
  `;
  
  const RowWrapperTextArea = styled.div`
    display: flex;
    gap: 30px;
    margin: 16px 0 0 0;
    height: 100%;
  
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
      height: 100%;
  
      input {
        height: 100%;
      }
    }
    .descriptionBox{
        width: 100%; 
        padding: 10px;
        height:144px;
        resize: none;
        overflowY:scroll;
        background-color: #E9ECEF;
        border-color: #CFD4DA;
    }
  `;