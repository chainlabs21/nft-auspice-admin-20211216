import { useState, useEffect } from "react";
import { Form, Button, Card, Col, Row, Container } from "react-bootstrap";
import { useSelector } from "../../store/reducer";
import styled from "styled-components";
import Select from "react-select";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import moment from "moment";
import AllCkEditor from "../../App/components/CkEditor/AllCkEditor";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  CHANGE_NOTICE_DATA,
  CREATE_NOTICE,
  DELETE_NOTICE,
} from "../../store/supportReducer";
import PageTitle from "../../components/PageTitle";
const kindOption = [
  { value: 0, label: "일반 공지" },
  { value: 1, label: "팝업 공지" },
];
const openOption = [
  { value: 0, label: "사용" },
  { value: 1, label: "숨김" },
];
const popupOpenOption = [
  { value: 0, label: "사용" },
  { value: 1, label: "숨김" },
];
const languageOption = [
  { value: 0, label: "한국어" },
  { value: 1, label: "영어" },
  { value: 2, label: "중국어" },
];

const NoticeDetail = () => {
  const { noticeList } = useSelector((state) => state.support);
  const { search } = useLocation();
  const { postId } = queryString.parse(search);
  const [kind, setKind] = useState(0);
  const [open, setOpen] = useState(0);
  const [popupOpen, setPopupOpen] = useState(0);
  const [language, setLanguage] = useState(0);
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = () => {
    //dispatch
    if (postId !== "new") {
      dispatch({ type: DELETE_NOTICE, payload: { id: postId } });
      history.push("/support/notice/");
    } else {
      alert("새로운 공지는 삭제 할 수 없습니다.");
    }
  };
  const handleClose = () => {
    history.push("/support/notice/");
  };
  const handleSubmit = () => {
    //dispatch
    //create
    const now = moment();
    if (postId === "new") {
      dispatch({
        type: CREATE_NOTICE,
        payload: {
          updatedAt: now.format("2012-01-03 11:52:31"),
          kind: kind,
          open: open,
          popupOpen: popupOpen,
          language: language,
          title: title,
          html: html,
        },
      });
    }
    dispatch({
      type: CHANGE_NOTICE_DATA,
      payload: {
        updatedAt: now.format("2012-01-03 11:52:31"),
        kind: kind,
        open: open,
        popupOpen: popupOpen,
        language: language,
        title: title,
        html: html,
        id: postId,
      },
    });
    history.push("/support/notice/");
  };

  useEffect(() => {
    if (noticeList && postId !== "new") {
      setKind(noticeList[postId].kind);
      setOpen(noticeList[postId].open);
      setPopupOpen(noticeList[postId].popupOpen);
      setLanguage(noticeList[postId].language);
      setTitle(noticeList[postId].title);
      setHtml(noticeList[postId].html);
    }
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [noticeList, postId]);

  if (loading) {
    return (
      <>
        <div>불러오는중...</div>
      </>
    );
  }
  return (
    <Container fluid>
      <Row style={{ marginTop: "6rem" }}>
        <Col>
          <PageTitle title={"공지 작성 및 수정"} margin={5} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <RowWrapper>
                <div className="key">
                  <p>공지 유형 </p>
                  <p>:</p>
                </div>

                <div className="value">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={kindOption[kind]}
                    name="color"
                    options={kindOption}
                    onChange={(e) => {
                      setKind(e.value);
                    }}
                  />
                </div>
              </RowWrapper>
              <RowWrapper>
                <div className="key">
                  <p>일반공지 공개여부 </p>
                  <p>:</p>
                </div>

                <div className="value">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={openOption[open]}
                    name="color"
                    options={openOption}
                    onChange={(e) => {
                      setOpen(e.value);
                    }}
                  />
                </div>
              </RowWrapper>
              <RowWrapper>
                <div className="key">
                  <p>팝업공지 공개여부 </p>
                  <p>:</p>
                </div>

                <div className="value">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={popupOpenOption[popupOpen]}
                    name="color"
                    options={popupOpenOption}
                    onChange={(e) => {
                      setPopupOpen(e.value);
                    }}
                  />
                </div>
              </RowWrapper>
              <RowWrapper>
                <div className="key">
                  <p>언어 </p>
                  <p>:</p>
                </div>

                <div className="value">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={languageOption[language]}
                    name="color"
                    options={languageOption}
                    onChange={(e) => {
                      setLanguage(e.value);
                    }}
                  />
                </div>
              </RowWrapper>
              <RowWrapper>
                <div className="key">
                  <p>공지 제목 </p>
                  <p>:</p>
                </div>

                <div className="value">
                  <Form.Control
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    value={title}
                    placeholder={title}
                  ></Form.Control>
                </div>
              </RowWrapper>
            </Card.Header>
            <Card.Body>
              <AllCkEditor
                editor={ClassicEditor}
                data={html}
                onChange={(event, editor) => {
                  setHtml(editor.getData());
                }}
              />
            </Card.Body>
            <Card.Footer>
              <Container>
                <Row>
                  <Col style={{ textAlign: "center" }}>
                    <div>
                      <ButtonWrapper variant="danger" onClick={handleDelete}>
                        삭제
                      </ButtonWrapper>

                      <ButtonWrapper variant="secondary" onClick={handleSubmit}>
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
export default NoticeDetail;

const ButtonWrapper = styled(Button)`
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
`;
