import FunctionalTable from "../../components/table/FunctionalTable";
import { USER_DETAIL_URL, WALLET_QUERY_URL } from "../../config/urlDefine";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { API } from "../../utils/api";


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

const DEFAULT_SIZE = 20

const TransactionState = () => {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        axios.get(API.GET_TRANSACTIONS(DEFAULT_SIZE)).then((res) => {
            const {list} = res.data
            list.map((order, index) => {
                const information = {
                    no: index + 1,
                    transaction: order.txhash,
                    registerDate: order.createdat,
                    itemId: order.itemid,
                    user: order.username,
                    token: order.item.priceunit,
                    price: order.price,
                    maxPrice: order.item.pricemax,
                    minPrice: order.item.pricemin
                }
                setTransactions(prev => [...prev, information])
            })
        })
    }, []);

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
            </Container>
        </>
    );
};

export default TransactionState;
