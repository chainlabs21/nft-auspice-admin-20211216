import { Col, Row, Container } from "react-bootstrap";
import { JsonToTableData } from "../../utils/tableUtils";
import FunctionalTable from "../../components/table/FunctionalTable";
import { useState, useEffect } from "react";
import { useSelector } from "../../store/reducer";
import { FiRefreshCcw } from "react-icons/fi";
import { TiSpanner } from "react-icons/ti";
import { CategorySelector, CategoryRowWrapper } from "../../stlye/globalStyles";
import SettingModal from "../../components/modal/SettingModal";
import { useDispatch } from "react-redux";
import { CHANGE_GAS_RATE } from "../../store/systemReducer";
import PageTitle from "../../components/PageTitle";
import { CONTRACT_QUERY_URL, TRAN_QUERY_URL } from "../../config/urlDefine";

const accountKeyList = [
  { title: "No" },
  { title: "계정명" },
  { title: "Address", href: CONTRACT_QUERY_URL },
  { title: "Symbol" },
  { title: "보유량" },
  { title: "확인일" },
  { title: "갱신", hasCallback: true },
];
const accountKeyToValue = [
  "no",
  "name",
  "address",
  "symbol",
  "reserve",
  "confirmDate",
];
const keyList = [
  { title: "No" },
  { title: "요청일" },
  { title: "Transaction 요청일" },
  { title: "Transaction 완료일" },
  { title: "요청 상태" },
  { title: "영수증 확인" },
  { title: "GasPrice" },
  { title: "GasLimit" },
  { title: "Block#" },
  { title: "nonce#" },
  { title: "수정", hasCallback: true },
  { title: "거래 종류" },
  { title: "From", hasChildren: true, numChildren: 1 },
  { title: "Address", isChildren: true, href: CONTRACT_QUERY_URL },
  { title: "To", hasChildren: true, numChildren: 1 },
  { title: "Address", isChildren: true, href: CONTRACT_QUERY_URL },
  { title: "Transaction", href: TRAN_QUERY_URL },
  { title: "코인" },
  { title: "금액" },
  { title: "액수 (USD)" },
];
const keyToValue = [
  "no",
  "requestDate",
  "transactionRequestDate",
  "transactionCompleteDate",
  "requestState",
  "confirmReceipt",
  "gasPrice",
  "gasLimit",
  "block",
  "nonce",
  "tradeKind",
  "from",
  "to",
  "transaction",
  "coin",
  "price",
  "priceUSD",
];
const categoryList = [
  "거래 현황",
  "최초 리스팅",
  "수수료 계정",
  "레퍼럴 계정",
  "로얄티 계정",
];
const SystemAccount = () => {
  const [accountTableData, setAccountTableData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const { accountList, trade } = useSelector((state) => state.system);
  const [curCategory, setCurCategory] = useState(0);
  const [editToggle, setEditToggle] = useState(false);
  const [dataIndex, setDataIndex] = useState(0);
  const [addGasRate, setAddGasRate] = useState(0);
  const dispatch = useDispatch();

  const reserveRefresh = (index) => {
    //dispatch refresh
  };

  const accountCallback = {
    icon: <FiRefreshCcw style={{ fontSize: "24px" }} />,
    callback: (index) => {
      reserveRefresh(index);
    },
  };
  const callbackData = {
    icon: <TiSpanner style={{ fontSize: "24px" }} />,
    callback: (index) => {
      setDataIndex(index);
      setAddGasRate(trade[index].gasRate);
      setEditToggle(true);
    },
  };
  const handleGasRate = () => {
    dispatch({
      type: CHANGE_GAS_RATE,
      payload: { index: dataIndex, value: addGasRate },
    });
  };

  useEffect(() => {
    const temp = JsonToTableData(trade, keyToValue);
    temp.forEach((v) => {
      v.splice(10, 0, callbackData);
    });

    setTableData(temp);
  }, [trade]);

  useEffect(() => {
    const accountTemp = JsonToTableData(accountList, accountKeyToValue);
    accountTemp.forEach((v) => {
      v.push(accountCallback);
    });
    setAccountTableData(accountTemp);
  }, [accountList]);
  return (
    <Container fluid className="systemAccount">
      <Row>
        <Col>
          <PageTitle title={"시스템 계정"} margin={5} />
        </Col>
      </Row>
      <Row>
        <Col style={{ marginBottom: "5rem" }}>
          <FunctionalTable
            wrapName="tableHasNo"
            clean
            tableData={accountTableData}
            keyList={accountKeyList}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="contBox">
            <CategoryRowWrapper className="customCategoryBar ">
              {categoryList.map((v, i) => {
                return (
                  <CategorySelector
                    onClick={() => {
                      setCurCategory(i);
                    }}
                    className={
                      curCategory === i
                        ? "selected-category"
                        : "default-category"
                    }
                  >
                    {v}
                  </CategorySelector>
                );
              })}
            </CategoryRowWrapper>

            <FunctionalTable
              wrapName="info-table tableHasNo"
              clean
              tableData={tableData}
              keyList={keyList}
            />
          </div>
        </Col>
      </Row>
      <SettingModal
        show={editToggle}
        defaultValue={addGasRate}
        onCancel={() => {
          setEditToggle(false);
        }}
        onChange={(e) => {
          setAddGasRate(e.target.value);
        }}
        unit="%"
        title="수정 : 추가 가스비 입력 (1 ~ 20%)"
        onSubmit={handleGasRate}
      />
    </Container>
  );
};
export default SystemAccount;
