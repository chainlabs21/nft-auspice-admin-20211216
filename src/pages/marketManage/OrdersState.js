import FunctionalTable from "../../components/table/FunctionalTable";
import { USER_DETAIL_URL, WALLET_QUERY_URL } from "../../config/urlDefine";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { API } from "../../utils/api";
import moment from 'moment'
import GeneralPagination from '../../utils/Pagination'


const keyList = [
    { title: "no" },
    { title: "이미지", isImage: true},
    { title: "등록일", isDate: true },
    { title: "수정일", isDate: true },
    { title: "아이템 명", href: WALLET_QUERY_URL, search: true },
    {
        title: "등록자",
        href: USER_DETAIL_URL + "?userId=",
        search: true,
    },
    { title: "토큰" },
    { title: "최고가" },
    { title: "최저가" },
];

const DEFAULT_SIZE = 20

const MemberState = () => {
    const [orders, setOrders] = useState([])
    const [DEFAULT_SIZE, setDEFAULT_SIZE] = useState(20)
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState(false);

    useEffect(() => {
        axios.get(API.GET_ORDERS(DEFAULT_SIZE, DEFAULT_SIZE*(page-1))).then((res) => {
            const {list} = res.data
            setOrders([])
            list.map((order, index) => {
                const information = {
                    no: index + 1,
                    image: order.item.url,
                    registerDate: moment(order.createdat).format('YYYY-MM-DD'),
                    updateDate: moment(order.item.updatedat).format('YYYY-MM-DD'),
                    title: order.item?.titlename,
                    owner: order.author?.nickname,
                    token: order.item?.priceunit,
                    maxPrice: order.item?.pricemax,
                    minPrice: order.item?.pricemin
                }
                setOrders(prev => [...prev, information])
            })
        })
        axios.get(API.GET_COUNT('orders')).then((res) => {
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

    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <PageTitle title={"주문 조회"} margin={5} />
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
            </Container>
        </>
    );
};

export default MemberState;
