import { Button, Row, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "../../store/reducer";
import FunctionalTable from "../../components/table/FunctionalTable";
import { TiSpanner } from "react-icons/ti";
import { JsonToTableData } from "../../utils/tableUtils";
import { NOTICE_DETAIL_URL } from "../../config/urlDefine";
import PageTitle from "../../components/PageTitle";

const keyList = [
  { title: "NO" },
  { title: "등록일", isDate: true },
  { title: "수정일" },
  { title: "수정", hasCallback: true },
  { title: "공지 유형", convertInt: ["일반 공지", "팝업 공지"] },
  { title: "일반공지 공개여부", convertInt: ["사용", "숨김"] },
  { title: "팝업공지 공개여부", convertInt: ["사용", "숨김"] },
  { title: "언어", convertInt: ["한국어", "영어", "중국어"] },
  { title: "제목" },
  { title: "내용" },
];
const keyToValue = [
  "no",
  "createdAt",
  "updatedAt",
  "kind",
  "open",
  "popupOpen",
  "language",
  "title",
  "html",
];

const Notice = () => {
  const history = useHistory();
  const { noticeList } = useSelector((state) => state.support);
  const [tableData, setTableData] = useState([]);

  const handleCreate = () => {
    // history.push(NOTICE_DETAIL_URL + "?postId=new");
    window.location.hash = "#/support/notice/detail?postId=new";
  };
  useEffect(() => {
    //dispatch here
    const tableDataJson = JsonToTableData(noticeList, keyToValue);
    const callbackData = {
      icon: <TiSpanner style={{ fontSize: "24px" }} />,
      callback: (index) => {
        //   history.push(NOTICE_DETAIL_URL + `?postId=${noticeList[index].id}`);
        window.location.hash = `#/support/notice/detail?postId=${noticeList[index].id}`;
      },
    };
    tableDataJson.forEach((v, i) => {
      v.splice(3, 0, callbackData);
    });

    setTableData(tableDataJson);
  }, [noticeList, history]);
  return (
    <Container fluid>
      <Row>
        <Col>
          <PageTitle title="공지 사항" margin={5} />
        </Col>{" "}
      </Row>
      <Row>
        <Col>
          <Row style={{ padding: " 0 0 30px 15px" }}>
            <Button variant="secondary" onClick={handleCreate}>
              신규 등록
            </Button>
          </Row>
          <FunctionalTable
            wrapName="tableHasNo"
            keyList={keyList}
            tableData={tableData}
            datePicker
            excel
            refresh
          />
        </Col>
      </Row>
    </Container>
  );
};
export default Notice;
