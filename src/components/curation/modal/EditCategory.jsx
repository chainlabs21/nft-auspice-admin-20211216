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

  import axios from "axios";
  import { API } from "../../../utils/api";
import { off } from "process";
  
  const stateOption = [
    { value: 0, label: "숨김" },
    { value: 1, label: "공개" },
  ];
  const stateOptionA = ['숨김', '공개'
  ];
  const typeOption = [
    { value: 0, label: "큰 아이템 목록" },
    { value: 1, label: "작은 아이템 목록" },
    { value: 2, label: "유저 목록" },
    { value: 3, label: "링크 목록" },
  ];
  
  const MAX_ROW_LENGTH = 8;
  
  const EditCategory = ({off, data}) => {
    const myRef = useRef(null);
  
  
    const [count, setCount] = useState(0);
    const [toggleRegister, setToggleRegister] = useState(false);
    const [toggleSettings, setToggleSettings] = useState(false);
    const [dataIndex, setDataIndex] = useState(0);
    const [tableData, setTableData] = useState([]);
  
    const [itemsList, setItemsList] = useState({});
  
    const [itemMutable, setItemMutable] = useState(false);
    const [mitems, setMitems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
  
    const [itemsData, setItemsData] = useState([]);
  
    const [categoryName, setCategoryName] = useState("");
    const [curState, setCurState] = useState(1);
    const [typeState, setTypeState] = useState(0);
  
  
    //------------------------------------------
    const [name, setName]= useState()
    const [visible, setVisible] = useState()
    const [type, setType] = useState()
    const [id, setId] = useState()
    const [edit, setEdit] = useState(false);
    ///////////////////////
  
    //////FILE
    const [fileData, setFileData] =useState();
    const[photo, setPhoto] = useState()
    const [toggleEditCategory, setToggleEditCategory] = useState(false);
  
    useEffect(async()=>{
      console.log(data)
      if(data){
        
         setName(data[0])
         setVisible(parseInt(data[1]))
         setType(data[2])
         setId(data[3])
         setEdit(true)
      }else{
        setEdit(false)
      }
    },[])
  
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
        });
    }
  
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
      })
      
      
    }
  
    return (
          <Modal className="inpuListPopup" show={true} centered>
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
                            onChange={(e) => setName(e.target.value)}
                            value={name}
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
                            defaultValue={stateOptionA[visible]}
                            name="color"
                            options={stateOption}
                            onChange={(e) => setVisible(e.value)}
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
                            defaultValue={typeOption[type]}
                            name="color"
                            options={typeOption}
                            onChange={(e) => setType(e.value)}
                          />
                        </div>
                      </li>
                      {/* ---------- TYPE STATUS ---------- */}
                    </ul>
                  </Col>
                </Row>
                <Row className="actionBtnBox">
                  {edit && <button
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
                  </button>}
                  <button
                    className="whiteBtn"
                    onClick={() => {
                      off()
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
    );
  };
  
  export default EditCategory;
  
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
  