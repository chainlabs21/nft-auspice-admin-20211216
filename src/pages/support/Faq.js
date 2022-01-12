import { Form, Modal, Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "../../store/reducer";
import FunctionalTable from "../../components/table/FunctionalTable";
import { JsonToTableData } from "../../utils/tableUtils";
import { TiSpanner } from "react-icons/ti";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { NOTICE_DETAIL_URL } from "../../config/urlDefine";
import { CREATE_CATEGORY, CHANGE_CATEGORY } from "../../store/supportReducer";
import { useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";

const createStateOption = [
  { value: 0, label: "hide" },
  { value: 1, label: "show" },
];

const keyList = [
  { title: "No" },
  { title: "등록일", isDate: true },
  { title: "수정", hasCallback: true },
  { title: "카테고리", convertInt: ["로그인/계정", "이용 관련", "기타 문의"] },
  { title: "공개여부", convertInt: ["사용", "숨김"] },
  { title: "언어", convertInt: ["한국어", "영어", "중국어"] },
  { title: "클라 순서" },
  { title: "제목" },
  { title: "내용" },
];
const keyToValue = [
  "no",
  "createdAt",
  "category",
  "open",
  "language",
  "clientOrder",
  "title",
  "html",
];
const Faq = () => {
  const [toggleCreate, setToggleCreate] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);
  const [toggleFaq, setToggleFaq] = useState(false);
  const [categoryState, setCategoryState] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryKind, setCategoryKind] = useState("");
  const [faqTitle, setFaqTitle] = useState("");
  const [faqState, setFaqState] = useState(1);
  const [faqBody, setFaqBody] = useState("");
  const [settingOption, setSettingOption] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const { noticeList, categoryList } = useSelector((state) => state.support);
  const [tableData, setTableData] = useState([]);

  const callbackData = {
    icon: <TiSpanner style={{ fontSize: "24px" }} />,
    callback: (index) => {
      //      history.push(NOTICE_DETAIL_URL + `?postId=${noticeList[index].id}`);
      window.location.hash = `#/support/notice/detail?postId=${noticeList[index].id}`;
    },
  };
  const handleCreate = () => {
    //dispatch
    dispatch({
      type: CREATE_CATEGORY,
      payload: { title: categoryName, open: categoryState },
    });
    setNewCategoryName("");
    setCategoryState(0);
    setToggleCreate(false);
  };
  const handleSetting = () => {
    //dispatch
    dispatch({
      type: CHANGE_CATEGORY,
      payload: {
        title: newCategoryName,
        open: categoryState,
        index: categoryKind,
      },
    });

    setNewCategoryName("");
    setCategoryState(0);
    setCategoryKind(0);
    setToggleSetting(false);
  };
  const handleFaq = () => {
    //dispatch
    setToggleFaq(false);
    setFaqTitle("");
    setFaqBody("");
    setCategoryState(0);
    setCategoryKind(0);
  };
  useEffect(() => {
    const temp = [];
    noticeList.forEach((v, i) => {
      if (v.isFaq) {
        temp.push(v);
      }
    });
    const jsonData = JsonToTableData(temp, keyToValue);

    jsonData.forEach((v, i) => {
      v.splice(2, 0, callbackData);
    });

    setTableData(jsonData);
  }, [noticeList]);

  useEffect(() => {
    const temp = [];
    categoryList.forEach((v, i) => {
      temp.push({ value: i, label: v.title });
    });
    setSettingOption(temp);
  }, [categoryList]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <PageTitle title={"FAQ"} margin={5} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ButtonWrapper
            onClick={() => setToggleCreate(true)}
            variant="secondary"
          >
            카테고리 등록
          </ButtonWrapper>
          <ButtonWrapper
            onClick={() => {
              setToggleSetting(true);
              setCategoryState(0);
              setCategoryKind(0);
              setNewCategoryName(categoryList[0].title);
            }}
            variant="secondary"
          >
            카테고리 설정
          </ButtonWrapper>
          <ButtonWrapper
            onClick={() => {
              setToggleFaq(true);
            }}
            variant="secondary"
          >
            FAQ 신규등록
          </ButtonWrapper>
        </Col>
      </Row>
      <Row>
        <Col>
          <FunctionalTable
            keyList={keyList}
            tableData={tableData}
            datePicker
            refresh
            excel
          />
        </Col>
      </Row>
      <Modal show={toggleCreate} centered>
        <Modal.Header>카테고리 등록</Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <div>
                  <TitleWrapper>공지 유형 :</TitleWrapper>

                  <SelectWrapper>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={createStateOption[0]}
                      name="color"
                      options={createStateOption}
                      onChange={(e) => {
                        setCategoryState(e.value);
                      }}
                    />
                  </SelectWrapper>
                  <div>
                    <TitleWrapper>공지 제목 :</TitleWrapper>

                    <SelectWrapper>
                      <Form.Control
                        onChange={(e) => {
                          setNewCategoryName(e.target.value);
                        }}
                        value={newCategoryName}
                      ></Form.Control>
                    </SelectWrapper>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div style={{ textAlign: "center" }}>
                  <ButtonWrapper
                    onClick={() => setToggleCreate(false)}
                    variant="outline-secondary"
                  >
                    취소
                  </ButtonWrapper>
                  <ButtonWrapper onClick={handleCreate} variant="secondary">
                    확인
                  </ButtonWrapper>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      <Modal show={toggleSetting} centered>
        <Modal.Header>카테고리 설정</Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <RowWrapper>
                  <TitleWrapper>상태 :</TitleWrapper>

                  <SelectWrapper>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={createStateOption[0]}
                      name="color"
                      options={createStateOption}
                      onChange={(e) => {
                        setCategoryState(e.value);
                      }}
                    />
                  </SelectWrapper>
                </RowWrapper>
                <RowWrapper>
                  <TitleWrapper>카테고리 :</TitleWrapper>

                  <SelectWrapper>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={settingOption[0]}
                      name="color"
                      options={settingOption}
                      onChange={(e) => {
                        setCategoryKind(e.value);
                      }}
                    />
                  </SelectWrapper>
                </RowWrapper>
                <RowWrapper>
                  <TitleWrapper>새 카테고리명 :</TitleWrapper>

                  <SelectWrapper>
                    <Form.Control
                      onChange={(e) => {
                        setNewCategoryName(e.target.value);
                      }}
                      value={newCategoryName}
                    ></Form.Control>
                  </SelectWrapper>
                </RowWrapper>
              </Col>
            </Row>
            <Row>
              <Col>
                <div style={{ textAlign: "center" }}>
                  <ButtonWrapper
                    onClick={() => {
                      setToggleSetting(false);
                      setCategoryState(0);
                      setCategoryKind(0);
                      setNewCategoryName("");
                    }}
                    variant="outline-secondary"
                  >
                    취소
                  </ButtonWrapper>
                  <ButtonWrapper onClick={handleSetting} variant="secondary">
                    확인
                  </ButtonWrapper>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      <Modal show={toggleFaq} centered>
        <Modal.Header>FAQ 신규 등록 및 수정</Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <RowWrapper>
                  <TitleWrapper>상태 :</TitleWrapper>

                  <SelectWrapper>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={createStateOption[0]}
                      name="color"
                      options={createStateOption}
                      onChange={(e) => {
                        setCategoryState(e.value);
                      }}
                    />
                  </SelectWrapper>
                </RowWrapper>
                <RowWrapper>
                  <TitleWrapper>카테고리 :</TitleWrapper>

                  <SelectWrapper>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={settingOption[0]}
                      name="color"
                      options={settingOption}
                      onChange={(e) => {
                        setCategoryKind(e.value);
                      }}
                    />
                  </SelectWrapper>
                </RowWrapper>
                <RowWrapper>
                  <TitleWrapper>제목 :</TitleWrapper>

                  <SelectWrapper>
                    <Form.Control
                      onChange={(e) => {
                        setFaqTitle(e.target.value);
                      }}
                      value={faqTitle}
                    ></Form.Control>
                  </SelectWrapper>
                </RowWrapper>
                <RowWrapper>
                  <TitleWrapper>내용 :</TitleWrapper>

                  <SelectWrapper>
                    <Form.Control
                      onChange={(e) => {
                        setFaqBody(e.target.value);
                      }}
                      value={faqBody}
                    ></Form.Control>
                  </SelectWrapper>
                </RowWrapper>
              </Col>
            </Row>
            <Row>
              <Col>
                <div style={{ textAlign: "center" }}>
                  <ButtonWrapper
                    onClick={() => {
                      setToggleFaq(false);
                      setNewCategoryName("");
                      setCategoryState(0);
                      setFaqTitle("");
                      setFaqBody("");
                      setCategoryKind(0);
                    }}
                    variant="outline-secondary"
                  >
                    취소
                  </ButtonWrapper>
                  <ButtonWrapper onClick={handleFaq} variant="secondary">
                    확인
                  </ButtonWrapper>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
export default Faq;

const ButtonWrapper = styled(Button)`
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const TitleWrapper = styled.div`
  display: inline-block;
  width: 100px;
  text-align: right;
  margin-right: 20px;
`;
const SelectWrapper = styled.div`
  display: inline-block;
  width: 250px;
`;
const RowWrapper = styled.div`
  margin-top: 1rem;
`;
