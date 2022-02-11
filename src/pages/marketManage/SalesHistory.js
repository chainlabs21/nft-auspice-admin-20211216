import FunctionalTable from "../../components/table/FunctionalTable";
import { USER_DETAIL_URL, WALLET_QUERY_URL } from "../../config/urlDefine";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { API } from "../../utils/api";


const keyList = [
    { title: "no" },
    { title: "판매 아이템" },
    { title: "만료일", isDate: true },
    { title: "판매자", href: WALLET_QUERY_URL, search: true },
    {
        title: "구매자",
        href: USER_DETAIL_URL + "?userId=",
        search: true,
    },
    { title: "토큰" },
    { title: "가격" },
    { title: "컨트랙트" },
];

const DEFAULT_SIZE = 20

const SalesHistory = () => {
    const [salesHistory, setSalesHistory] = useState([])

    useEffect(() => {
        axios.get(API.GET_SALES_HISTORY(DEFAULT_SIZE)).then((res) => {
            const {list} = res.data
            list.map((transaction, index) => {
                const information = {
                    no: index + 1,
                    item: transaction.itemid,
                    expirychar: transaction.expirychar,
                    seller: transaction.seller,
                    buyer: transaction.buyer,
                    token: transaction.item.priceunit,
                    price: transaction.price,
                    contract: transaction.item.contract
                }
                setSalesHistory(prevState => [...prevState, information])
            })
        })
    }, []);

    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <PageTitle title={"판매 내역"} margin={5} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FunctionalTable
                            wrapName="tableHasNo"
                            tableData={salesHistory}
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

export default SalesHistory;
