import { Col, Row, Container, Button, Modal, Form } from "react-bootstrap";
import crypto from "crypto";
import { JsonToTableData } from "../../utils/tableUtils";
import FunctionalTable from "../../components/table/FunctionalTable";
import { useEffect, useState } from "react";
import { useSelector } from "../../store/reducer";
import { TiSpanner } from "react-icons/ti";
import Select from "react-select";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { MODIFY_MANAGER, DELETE_MANAGER, SET_MANAGER } from "../../store/managerReducer";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { API } from "../../utils/api";
const stateOption = [
  { value: 0, label: "정지" },
  { value: 1, label: "정상" },
];

const keyList = [
  { title: "No" },
  { title: "등록일", isDate: true },
  { title: "수정일" },
  { title: "관리자 ID" },
  { title: "상태", convertInt: ["정지", "정상"] },
  { title: "관리자 PWD" },
  { title: "E-mail" },
  { title: "연락처" },
  { title: "수정", hasCallback: true },
];
const keyToValue = [
  "no",
  "createdAt",
  "updatedAt",
  "managerId",
  "state",
  "managerPwd",
  "email",
  "phone",
];

const SettingManage = () => {
  const [tableData, setTableData] = useState([]);
  const [toggleSetting, setToggleSetting] = useState(false);
  const { managerList } = useSelector((state) => state.manager);
  const [curIndex, setCurIndex] = useState(-1);
  const [openState, setOpenState] = useState(0);
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [prevId, setPrevId] = useState("");
  const [nickname, setNickname] = useState("")
  const [edit, setEdit] = useState(false)
  const [atabledata, setatabledata] = useState([])
  const dispatch = useDispatch();
  const secret ="ESREVMETI"



  function getManagerdata(){
    setatabledata([])
    axios.get(API.GET_ADMIN).then((resp)=>{
      let {list} = resp.data
      list.map((v, index)=>{
        const callbackData = {
          icon: <TiSpanner style={{ fontSize: "24px" }} />,
          callback: (index) => {
            setToggleSetting(true);
            setCurIndex(v.id);
            setOpenState(v.active);
            setNickname(v.nickname)
            setId(v.username);
            setPwd(v.pw);
            setEmail(v.email);
            setPhone(v.phone);
            setEdit(true)
            //setPrevId(managerList[index].managerId);
          },
        };
        const item = {
          no: v.id,
          createdAt: v.createdat,
          updatedAt: v.updatedat,
          managerId: v.username,
          state: v.active,
          managerPwd: v.pwhash,
          email: v.email,
          phone: v.phone,
          callback: callbackData
        }
        setatabledata(pre=>[...pre, item])
      })
    })
  }
  useEffect(()=>{
    getManagerdata()
  },[])

  const handleDelete = () => {
    //dispatch
    setEdit(false)
    //dispatch({ type: DELETE_MANAGER, payload: { managerId: id } });
    if(edit){
      axios.delete(`${API.DELETE_ADMIN}/${curIndex}`).then((res)=>{
        getManagerdata()
    })
    setToggleSetting(false);
  }else{
    setToggleSetting(false);
  }
  };
  const handleSubmit = () => {
    setEdit(false)
    //POST
    const pwhash = crypto.createHmac('sha256', secret).update(pwd).digest('hex');
    //dispatch
    if(edit){
      axios.post(API.CREATE_ADMIN, {
        id: curIndex,
        username: id,
        nickname: nickname,
        pw: pwd,
        pwhash: pwhash,
        email: email,
        phone: phone
      }).then((resp)=>{
        console.log(resp)
        getManagerdata()
      
      })
    }else{
      axios.post(API.CREATE_ADMIN, {
        username: id,
        nickname: nickname,
        pw: pwd,
        pwhash: pwhash,
        email: email,
        phone: phone
      }).then((resp)=>{
        console.log(resp)
        getManagerdata()
      })
    }

    
    
    setToggleSetting(false);
  };
  return (
    <Container fluid>
      <Row>
        <Col>
          <PageTitle title={"관리자 설정"} margin={5} />
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <Row style={{ padding: " 0 0 30px 15px" }}>
            <Button
              onClick={() => {
                setToggleSetting(true);
                setId("");
                setPwd("");
                setNickname("");
                setEmail("");
                setPhone("");
                setPrevId("");
                setOpenState(0);
              }}
              variant="secondary"
            >
              신규 등록
            </Button>
          </Row>
          <FunctionalTable
            wrapName="tableHasNo"
            keyList={keyList}
            tableData={atabledata}
            refresh
            excel
          />
        </Col>
      </Row>
      <Modal className="inpuListPopup" show={toggleSetting} centered>
        <Modal.Header>관리자 등록 / 수정</Modal.Header>
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
                        defaultValue={stateOption[openState]}
                        name="color"
                        options={stateOption}
                        onChange={(e) => setOpenState(e.value)}
                      />
                    </div>
                  </li>

                  <li>
                    <div className="key">ID :</div>
                    <div className="value">
                      <Form.Control
                        onChange={(e) => setId(e.target.value)}
                        value={id}
                      ></Form.Control>
                    </div>
                  </li>
                  <li>
                    <div className="key">닉네임 :</div>
                    <div className="value">
                      <Form.Control
                        onChange={(e) => setNickname(e.target.value)}
                        value={nickname}
                      ></Form.Control>
                    </div>
                  </li>

                  <li>
                    <div className="key">PWD :</div>
                    <div className="value">
                      <Form.Control
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                      ></Form.Control>
                    </div>
                  </li>

                  <li>
                    <div className="key">E-mail :</div>
                    <div className="value">
                      <Form.Control
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      ></Form.Control>
                    </div>
                  </li>

                  <li>
                    <div className="key">연락처 :</div>

                    <div className="value">
                      <Form.Control
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                      ></Form.Control>
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>

            <Row className="actionBtnBox">
              <button className="redBtn" variant="danger" onClick={handleDelete}>
                {edit?"삭제":"취소"}
              </button>
              <button className="grayBtn" variant="secondary" onClick={handleSubmit}>
                확인
              </button>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SettingManage;
const ButtonWrapper = styled(Button)`
  margin-top: 3rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
`;
const TitleWrapper = styled.div`
  display: inline-block;
  width: 100px;
  text-align: right;
  margin-right: 20px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
const SelectWrapper = styled.div`
  display: inline-block;
  margin-top: 1.5rem;
  width: 200px;
  height: 30px;
  box-shadow: none;
`;
