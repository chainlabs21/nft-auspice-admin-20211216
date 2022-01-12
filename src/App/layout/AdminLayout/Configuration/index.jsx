import * as React from "react";
import { useState } from "react";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import DEMO from "../../../../store/constant";
import { useSelector } from "../../../../store/reducer";
import styled from "styled-components";
import { BsFillFilePersonFill } from "react-icons/bs";
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
                *
              </a>
            </div>
            <div className="style-block">
              <Container>
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "20px",
                  }}
                >
                  <Button style={{ height: "40px" }}>Listed</Button>
                </div>
                <Row>
                  <Col
                    style={{
                      borderBottom: "1px solid green",
                      marginBottom: "1rem",
                      padding: "1rem",
                      textAlign: "center",
                    }}
                  >
                    <div>
                      <BsFillFilePersonFill style={{ fontSize: "48px" }} />
                      <span style={{ marginLeft: "1rem" }}>
                        {currentUser.email}
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "2rem" }}>
                  <Col>
                    <RowWrapper>
                      <ColWrapper>
                        <LabelWrapper>가입일 :</LabelWrapper>
                        <ValueWrapper>{currentUser.createdAt}</ValueWrapper>
                      </ColWrapper>
                    </RowWrapper>
                    <RowWrapper>
                      <ColWrapper>
                        <LabelWrapper>Address :</LabelWrapper>
                        <ValueWrapper>{currentUser.address}</ValueWrapper>
                      </ColWrapper>
                    </RowWrapper>
                    <RowWrapper>
                      <ColWrapper>
                        <LabelWrapper>닉네임 :</LabelWrapper>{" "}
                        <ValueWrapper>{currentUser.nickname}</ValueWrapper>
                      </ColWrapper>
                    </RowWrapper>
                    <RowWrapper>
                      <ColWrapper>
                        <LabelWrapper>로열티 :</LabelWrapper>
                        <ValueWrapper>{currentUser.royal}</ValueWrapper>
                      </ColWrapper>
                    </RowWrapper>
                    <RowWrapper>
                      <ColWrapper>
                        <LabelWrapper>레퍼럴 :</LabelWrapper>
                        <ValueWrapper>{currentUser.refer}</ValueWrapper>
                      </ColWrapper>
                    </RowWrapper>
                    <RowWrapper>
                      <ColWrapper>
                        <LabelWrapper>Collections :</LabelWrapper>
                        <ValueWrapper>{currentUser.collections}</ValueWrapper>
                      </ColWrapper>
                    </RowWrapper>
                    <RowWrapper>
                      <ColWrapper>
                        <LabelWrapper>Items :</LabelWrapper>
                        <ValueWrapper>{currentUser.items}</ValueWrapper>
                      </ColWrapper>
                    </RowWrapper>
                    <RowWrapper>
                      <ColWrapper>
                        <LabelWrapper>Rferral Link :</LabelWrapper>
                        <ValueWrapper>{currentUser.referLink}</ValueWrapper>
                      </ColWrapper>
                    </RowWrapper>
                    <RowWrapper>
                      <ColWrapper>
                        <LabelWrapper>배경이미지 :</LabelWrapper>
                        <ValueWrapper
                          onClick={() => {
                            setImageToggle(true);
                          }}
                        >
                          background.png
                        </ValueWrapper>
                      </ColWrapper>
                    </RowWrapper>
                    <RowWrapper>
                      <ColWrapper>
                        <LabelWrapper>소개 :</LabelWrapper>
                        <ValueWrapper>{currentUser.introduce}</ValueWrapper>
                      </ColWrapper>
                    </RowWrapper>
                  </Col>
                </Row>
              </Container>
              <Modal show={imageToggle} centered>
                <Modal.Header>
                  <Modal.Title>배경이미지</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Container style={{ textAlign: "center" }}>
                    <Row>
                      <Col style={{ marginBottom: "2rem" }}>
                        <img
                          style={{ width: "300px", height: "300px" }}
                          src={gameItem}
                          alt="background"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setImageToggle(false);
                          }}
                        >
                          확인
                        </Button>
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
