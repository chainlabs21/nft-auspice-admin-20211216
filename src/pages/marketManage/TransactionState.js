import FunctionalTable from "../../components/table/FunctionalTable";
import { USER_DETAIL_URL, WALLET_QUERY_URL } from "../../config/urlDefine";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { API } from "../../utils/api";
import moment from 'moment';
import GeneralPagination from "../../utils/Pagination";


const keyList = [
    { title: "no" },
    { title: "트랜잭션" },
    { title: "생성일", isDate: true },
    { title: "아이템 ID", href: WALLET_QUERY_URL, search: true },
    {
        title: "유저",
        href: USER_DETAIL_URL + "?userId=",
        search: true,
    },
    { title: "토큰" },
    { title: "가격" },
    { title: "최고가" },
    { title: "최저가" },
];


const TransactionState = () => {
    const [transactions, setTransactions] = useState([])
    const [DEFAULT_SIZE, setDEFAULT_SIZE] = useState(20)
    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState(false);

    useEffect(() => {
        axios.get(API.GET_TRANSACTIONS(DEFAULT_SIZE, DEFAULT_SIZE*(page-1))).then((res) => {
            setTransactions([])
            const {list} = res.data
            list.map((order, index) => {
                const information = {
                    no: index + 1,
                    transaction: order.txhash,
                    registerDate: moment(order.createdat).format("YYYY-MM-DD"),
                    itemId: order.itemid,
                    user: order.username,
                    token: order.item?.priceunit,
                    price: order.price,
                    maxPrice: order.item?.pricemax,
                    minPrice: order.item?.pricemin
                }
                setTransactions(prev => [...prev, information])
            })
        })
        axios.get(API.GET_COUNT('transactions')).then((res) => {
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
                        <PageTitle title={"트랜잭션 조회"} margin={5} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FunctionalTable
                        passtheCount={CallbackfromTable}
                            wrapName="tableHasNo"
                            tableData={transactions}
                            keyList={keyList}
                            search
                            datePicker
                            excel
                            refresh
                        />
                    </Col>
                </Row>
                <GeneralPagination passToParent={CallbackfromPagination} count={search? transactions.length : count} size={DEFAULT_SIZE}/>
            </Container>
        </>
    );
};

export default TransactionState;
