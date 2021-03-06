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

const SettingModal = ({
  onCancel,
  onSubmit,
  show,
  defaultValue,
  unit,
  title,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [toggle, setToggle] = useState(show);

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
              <InputGroup>
                <FormControl
                  aria-describedby="basic-addon1"
                  placeholder={defaultValue}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
                <InputGroup.Append>
                  <Button variant="secondary">{unit}</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row className="actionBtnBox">
            <button className="whiteBtn" variant="secondary" onClick={onCancel}>
              취소
            </button>
            <button
              className="grayBtn"
              variant="secondary"
              onClick={() => onSubmit(value)}
            >
              확인
            </button>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};
export default SettingModal;

const ButtonWrapper = styled(Button)`
  margin-top: 30px;
  margin-left: 15px;
  margin-right: 15px;
`;
