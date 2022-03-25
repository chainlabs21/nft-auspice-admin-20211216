import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    InputGroup,
    FormControl,
  } from "react-bootstrap";
  import { useState, useEffect } from "react";
  import styled from "styled-components";
  
  const ConfirmationModal = ({
    onCancel,
    onSubmit,
    optional,
    show,
    description,
    title,
  }) => {
    const [toggle, setToggle] = useState(show);
    const [optionalData, setOptionalData] = useState([])

    useEffect(()=>{
      
      if(!optional){
        console.log(optional)
        setOptionalData([])}
      else{
      setOptionalData(optional)
      }
    },[optional])
  
    useEffect(() => {
      setToggle(show);
    }, [show]);
  
    return (
      <Modal className="inpuListPopup" centered show={toggle}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="inputBox">
              <Col>
              {description}
              </Col>
            </Row>
            <Row className="actionBtnBox">
              <button className="whiteBtn" variant="secondary" onClick={onCancel}>
                취소
              </button>
              <button
                className="grayBtn"
                variant="secondary"
                onClick={onSubmit}
              >
                확인
              </button>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  };
  export default ConfirmationModal;
  
  const ButtonWrapper = styled(Button)`
    margin-top: 30px;
    margin-left: 15px;
    margin-right: 15px;
  `;
  