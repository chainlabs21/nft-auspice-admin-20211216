import FunctionalTable from "../../components/table/FunctionalTable";
import { USER_DETAIL_URL, WALLET_QUERY_URL } from "../../config/urlDefine";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { API } from "../../utils/api";


const keyList = [
    { title: "no" },
    { title: "이미지" },
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

    useEffect(() => {
        axios.get(API.GET_ORDERS(DEFAULT_SIZE)).then((res) => {
            const {list} = res.data
            list.map((order, index) => {
                const information = {
                    no: index + 1,
                    image: order.item.url,
                    registerDate: order.createdat,
                    updateDate: order.item.updatedat,
                    title: order.item.titlename,
                    owner: order.author.nickname,
                    token: order.item.priceunit,
                    maxPrice: order.item.pricemax,
                    minPrice: order.item.pricemin
                }
                setOrders(prev => [...prev, information])
            })
        })
    }, []);

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
            </Container>
        </>
    );
};

export default MemberState;
