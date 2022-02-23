import FunctionalTable from "../../components/table/FunctionalTable";
import { USER_DETAIL_URL, WALLET_QUERY_URL } from "../../config/urlDefine";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { API } from "../../utils/api";
import moment from 'moment'
import GeneralPagination from '../../utils/Pagination'
import {
  Form,
  Modal,
  Row,
  Col,
  Container,
  Button,
  DropdownButton,
  Dropdown,
  ListGroup,
} from "react-bootstrap";
import { useSelector } from "../../store/reducer";
import { JsonToTableData } from "../../utils/tableUtils";
import { TiSpanner, TiDelete } from "react-icons/ti";
import styled from "styled-components";
import { BsFileArrowUpFill, BsFileArrowDownFill } from "react-icons/bs";
import {
  CHANGE_DISPLAY_ORDER,
  ADD_NEW_CATEGORY,
} from "../../store/marketReducer";
import { useDispatch } from "react-redux";
import { DropdownWrapper } from "../../stlye/globalStyles";
import I_dnPolygonGray from "../../assets/images/I_dnPolygonGray.svg";
import Select from "react-select";


const keyList = [
    { title: "no" },
    { title: "등록일", isDate: true },
    { title: "마감일", isDate: true },
    { title: "아이템 명", href: WALLET_QUERY_URL, search: true },
    {
        title: "등록자",
        href: USER_DETAIL_URL + "?userId=",
        search: true,
    },
    { title: "토큰" },
    { title: "최고가" },
    { title: "최저가" },
    {title: "경매 종료", hasCallback: true }
];

const DEFAULT_SIZE = 20

const AuctionSettlement = () => {
    const [orders, setOrders] = useState([])
    const [DEFAULT_SIZE, setDEFAULT_SIZE] = useState(20)
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState(false);
    const [toggleSettleAuction, setToggleSettleAuction] = useState(false);
    const [dataIndex, setDataIndex] = useState(0);

    useEffect(() => {
        axios.get(API.GET_ORDERS(DEFAULT_SIZE, DEFAULT_SIZE*(page-1), 'typestr', 'AUCTION_ENGLISH')).then((res) => {
            setOrders([])
            const getData = res.data.list
            
            getData.map((order, index) => {
                const settingData = {
                    icon: <TiDelete style={{ fontSize: "24px" }} />,
                    callback: () => {
                      setToggleSettleAuction(true);
                      //setDataIndex(index);
                    },
                  };
                const information = {
                    no: index + 1
                    , registerDate: moment(order.createdat).format('YYYY-MM-DD')
                    , updateDate: moment(order.item.updatedat).format('YYYY-MM-DD')
                    , title: order.item?.titlename
                    , owner: order.author?.nickname
                    , token: order.item?.priceunit
                    , maxPrice: order.item?.pricemax
                    , minPrice: order.item?.pricemin
                    , closepopup: settingData
                      //setDataIndex(index);
                    
                }
                setOrders(prev => [...prev, information])
            })
        })
        axios.get(API.GET_COUNT_OPTION('orders', 'typestr', 'AUCTION_ENGLISH')).then((res) => {
            setCount(parseInt(res.data.resp))
            console.log(count)
          })
    }, [page, DEFAULT_SIZE]);
    const CallbackfromPagination=(e)=>{
        setPage(e)
        setSearch(false)
      }
      const CallbackfromTable=(e)=>{
        setDEFAULT_SIZE(e)
    }
      const submitRegister=()=>{
          //ON DELETION
          alert('컨트랙트 함수 호출')
          console.log('ghcnf')
      }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <PageTitle title={"경매 정산"} margin={5} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FunctionalTable
                        passtheCount={CallbackfromTable}
                            wrapName="tableHasNo"
                            tableData={orders}
                            keyList={keyList}
                            search
                            datePicker
                            excel
                            refresh
                        />
                    </Col>
                </Row>
                <GeneralPagination passToParent={CallbackfromPagination} count={search? orders.length : count} size={DEFAULT_SIZE}/> 
                <Modal className="inpuListPopup" show={toggleSettleAuction} centered>
                    <Modal.Header>경매 정산</Modal.Header>
                    <Modal.Body>
                    <Container>
                        <Row className="inputBox">
                        <Col>
                            <ul className="inputList">
                            <li>
                                <div className="key">상태 :</div>

                                <div className="value">
                                </div>
                            </li>

                            <li>
                                <div className="key">카테고리 이름 :</div>

                                <div className="value">
                                </div>
                            </li>
                            </ul>
                        </Col>
                        </Row>
                        <Row className="actionBtnBox">
                        <button
                            className="whiteBtn"
                            onClick={() => {
                                setToggleSettleAuction(false)
                            }}
                            variant="outline-secondary"
                        >
                            취소
                        </button>
                        <button
                            className="grayBtn"
                            onClick={submitRegister}
                            variant="secondary"
                        >
                            확인
                        </button>
                        </Row>
                    </Container>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
};

export default AuctionSettlement;
