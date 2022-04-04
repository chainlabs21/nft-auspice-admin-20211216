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
import { API } from "../../utils/api";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
const kindOption = [
  { value: 0, label: "일반 공지" },
  { value: 1, label: "팝업 공지" },
];
const openOption = [
  { value: 0, label: "숨김" },
  { value: 1, label: "노출" },
];
const lockedOption = [
  { value: 0, label: "비고정" },
  { value: 1, label: "고정" },
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
  const [open, setOpen] = useState(1);
  const [locked, setLocked] = useState(0);
  const [language, setLanguage] = useState(0);
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!postId){return;}
    else{
      setEdit(true);
      axios.get(`${process.env.REACT_APP_API_SERVER}/support/notice/${postId}`).then((resp)=>{
        console.log(resp);

        setKind(resp.data.list.isPopup);
        setOpen(resp.data.list.active);
        setLocked(resp.data.list.locked);
        setLanguage(resp.data.list.lang);
        setTitle(resp.data.list.title);
        setHtml(resp.data.list.contentbody);
      })
    }
  },[postId])

  function uploadAdapter(loader){
    return{
      upload: ()=>{
        return new Promise((resolve, reject)=>{
          const body = new FormData();
          loader.file.then((file)=>{
            body.append("file", file);
            axios.post(`${process.env.REACT_APP_API_SERVER}/curation/upload/file/notice`, body)
            .then((resp)=>{
              resolve({
                default: resp.data.payload.url
              })
            })
          })
        })
      }
    }
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  const custom_config = {
    extraPlugins: [ uploadPlugin ],
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'blockQuote',
        'insertTable',
        '|',
        'imageUpload',
        'undo',
        'redo'
      ]
    },
    table: {
      contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
    }
  }

  const handleDelete = () => {
    //dispatch
    if (postId !== "new") {
      axios.delete(`${process.env.REACT_APP_API_SERVER}/support/notice/${postId}`).then((resp)=>{
        history.push("/support/notice/");
      })
      dispatch({ type: DELETE_NOTICE, payload: { id: postId } });
      
    } else {
      alert("새로운 공지는 삭제 할 수 없습니다.");
    }
  };
  const handleClose = () => {
    history.push("/support/notice/");
  };
  const handleSubmit = () => {
if(edit){
  axios.put(`${process.env.REACT_APP_API_SERVER}/support/notice/${postId}`, {
    isPopup: kind,
    active: open,
    lang: language,
    title: title,
    contentbody: html,
    locked: locked,
  }).then((resp)=>{
    console.log(resp)
    history.push("/support/notice/");
  })
}else{
    axios.put(`${process.env.REACT_APP_API_SERVER}/support/notice`, {
      isPopup: kind,
      active: open,
      lang: language,
      title: title,
      contentbody: html,
      locked: locked,
    }).then((resp)=>{
      console.log(resp)
      history.push("/support/notice/");
    })
  }
    //dispatch
    //create
    // const now = moment();
    // if (postId === "new") {
    //   dispatch({
    //     type: CREATE_NOTICE,
    //     payload: {
    //       updatedAt: now.format("2012-01-03 11:52:31"),
    //       kind: kind,
    //       open: open,
    //       popupOpen: popupOpen,
    //       language: language,
    //       title: title,
    //       html: html,
    //     },
    //   });
    // }
    // dispatch({
    //   type: CHANGE_NOTICE_DATA,
    //   payload: {
    //     updatedAt: now.format("2012-01-03 11:52:31"),
    //     kind: kind,
    //     open: open,
    //     popupOpen: popupOpen,
    //     language: language,
    //     title: title,
    //     html: html,
    //     id: postId,
    //   },
    // });
    // history.push("/support/notice/");
  };

  useEffect(() => {
    if (noticeList && postId !== "new") {

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
                  <p>공개여부 </p>
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
                  <p>고정 공지 여부 </p>
                  <p>:</p>
                </div>

                <div className="value">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={lockedOption[locked]}
                    name="color"
                    options={lockedOption}
                    onChange={(e) => {
                      setLocked(e.value);
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
              config={custom_config}
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
