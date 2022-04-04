import { Button, Row, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "../../store/reducer";
import FunctionalTable from "../../components/table/FunctionalTable";
import { TiSpanner } from "react-icons/ti";
import { JsonToTableData } from "../../utils/tableUtils";
import { NOTICE_DETAIL_URL } from "../../config/urlDefine";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { API } from "../../utils/api";
import moment from "moment";
import CategoryList from "../../components/curation/Category";

const keyList = [
  { title: "No." },
  
  { title: "문의일자", isDate: true },
  { title: "답변일자" },
  { title: "답변상태", filter: true, convertInt:['', '답변 대기', '답변 완료', '답변 거부']},
  { title: "답변하기", hasCallback:true },
  { title: "문의자", hasChildren: true, numChildren: 2 },
  { title: "닉네임", isChildren: true, search: true},
  { title: "address", isChildren: true, search: true},
  { title: "문의 제목"},
  { title: "문의 내용" },
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

const Support = () => {
  const history = useHistory();
  const { noticeList } = useSelector((state) => state.support);
  const [tableData, setTableData] = useState([]);

  const handleCreate = () => {
    // history.push(NOTICE_DETAIL_URL + "?postId=new");
    window.location.hash = "#/support/notice/detail?postId=new";
  };
  useEffect(() => {
    setTableData([])
    axios.get(`${API.TICKETS}`).then((resp) => {
      console.log(resp);
      let { rows } = resp.data.list;
      if (rows) {
        rows.map((v, i) => {
          const callbackData = {
            icon: <TiSpanner style={{ fontSize: "24px" }} />,
            callback: (index) => {
              //   history.push(NOTICE_DETAIL_URL + `?postId=${noticeList[index].id}`);
              window.location.hash = `#/support/ticket/reply?ticketId=${v.id}`;
            },
          };
          const mapData ={
            no            : i,
            createdat     : moment(v.createdat).format('YYYY-MM-DD HH:mm:ss'),
            updatedat     : v.updatedat?moment(v.updatedat).format('YYYY-MM-DD HH:mm:ss'):'-',
            status        : v.status,
            callback      : callbackData,
            nickname      : v.requester_info.nickname,
            address       : v.username,
            title         : v.title,
            content       : v.description
          }
          setTableData(pre=>[...pre, mapData])
        });
      }
    });
  }, []);
  return (
    <Container fluid>
      <Row>
        <Col>
          <PageTitle title="1:1 문의 처리" margin={5} />
        </Col>{" "}
      </Row>
      <Row>
        <Col>

          <FunctionalTable
            wrapName="tableHasNo"
            keyList={keyList}
            tableData={tableData}
            search
            excel
            refresh
          />
        </Col>
      </Row>
    </Container>
  );
};
export default Support;
