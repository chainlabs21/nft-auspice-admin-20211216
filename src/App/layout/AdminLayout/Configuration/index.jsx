import * as React from "react";
import { useState } from "react";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import DEMO from "../../../../store/constant";
import { useSelector } from "../../../../store/reducer";
import styled from "styled-components";
import { BsFillFilePersonFill, BsPersonPlus } from "react-icons/bs";
import { IoPersonCircleSharp } from "react-icons/io5";
import gameItem from "../../../../assets/images/item.png";

const Configuration = () => {
  const { currentUser } = useSelector((state) => state.member);
  const { showMemberSlider } = useSelector((state) => state.ui);
  const [configOpen, setConfigOpen] = useState(false);
  const [imageToggle, setImageToggle] = useState(false);
  let configClass = ["menu-styler"];
  if (configOpen) {
    configClass = [...configClass, "open"];
  }
  return (
    <>
      {!showMemberSlider ? (
        <></>
      ) : (
        <>
          <div id="styleSelector" className={configClass.join(" ")}>
            <div className="style-toggler">
              <a
                href={"/#/member/info"}
                onClick={() => setConfigOpen(!configOpen)}
              >
                <BsPersonPlus size="40" />
              </a>
            </div>
            <div className="style-block">
              <Container>
                <Row className="topBar">
                  <Col>
                    <div>
                      <IoPersonCircleSharp style={{ fontSize: "48px" }} />
                      <span style={{ marginLeft: "1rem" }}>
                        {currentUser.email}
                      </span>
                    </div>

                    <button className="listBtn">Listed</button>
                  </Col>
                </Row>
                <Row className="infoListBox">
                  <ul className="infoList">
                    <li>
                      <div className="key">가입일 :</div>
                      <div className="value">{currentUser.createdAt}</div>
                    </li>
                    <li>
                      <div className="key">Address :</div>
                      <div className="value">{currentUser.address}</div>
                    </li>
                    <li>
                      <div className="key">닉네임 :</div>{" "}
                      <div className="value">{currentUser.nickname}</div>
                    </li>
                    <li>
                      <div className="key">로열티 :</div>
                      <div className="value percentBox">
                        <span className="valueNum">{currentUser.royal}</span>
                        <span className="unit">판매금액의%</span>
                      </div>
                    </li>
                    <li>
                      <div className="key">레퍼럴 :</div>
                      <div className="value percentBox">
                        <span className="valueNum">{currentUser.refer}</span>
                        <span className="unit">판매금액의%</span>
                      </div>
                    </li>
                    <li>
                      <div className="key">Collections :</div>
                      <div className="value">{currentUser.collections}</div>
                    </li>
                    <li>
                      <div className="key">Items :</div>
                      <div className="value">{currentUser.items}</div>
                    </li>
                    <li>
                      <div className="key">Rferral Link :</div>
                      <div className="value">{currentUser.referLink}</div>
                    </li>
                    <li>
                      <div className="key">배경이미지 :</div>
                      <div
                        className="value"
                        onClick={() => setImageToggle(true)}
                      >
                        background.png
                      </div>
                    </li>
                    <li>
                      <div className="key">소개 :</div>
                      <div className="value">{currentUser.introduce}</div>
                    </li>
                  </ul>
                </Row>
              </Container>
              <Modal className="imgPopup" show={imageToggle} centered>
                <Modal.Header>
                  <Modal.Title>배경이미지</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Container style={{ textAlign: "center" }}>
                    <Row>
                      <Col style={{ marginBottom: "2rem" }}>
                        <span className="imgBox">
                          <img src={gameItem} alt="background" />
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="actionBtnBox">
                          <Button
                            className="grayBtn"
                            variant="secondary"
                            onClick={() => {
                              setImageToggle(false);
                            }}
                          >
                            확인
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Configuration;
const LabelWrapper = styled.div`
  display: inline-block;
  width: 100px;
  text-align: right;
  margin-right: 1rem;
`;
const ValueWrapper = styled.div`
  display: inline-block;
  width: 250px;
  border: 1px solid black;
  padding: 5px;
  margin-left: 1rem;
`;
const ColWrapper = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RowWrapper = styled.div`
  margin-top: 1rem;
`;
