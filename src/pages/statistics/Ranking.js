import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "../../store/reducer";
import { useState, useEffect } from "react";
import FunctionalTable from "../../components/table/FunctionalTable";
import { JsonToTableData } from "../../utils/tableUtils";
import styled from "styled-components";
import { CategorySelector, CategoryRowWrapper } from "../../stlye/globalStyles";
import PageTitle from "../../components/PageTitle";

const keyList = [
  { title: "Ranking" },
  { title: "Owner" },
  { title: "전체 거래(USD)" },
  { title: "1주일간 거래(USD)" },
  { title: "평균가 (KLAY)" },
  { title: "보유 Items" },
];
const keyToValue = [
  "rank",
  "owner",
  "totalTrade",
  "weekTrade",
  "everage",
  "storeItems",
];

const Ranking = () => {
  const { categoryList, rankingList } = useSelector((state) => state.market);
  const [tableData, setTableData] = useState([]);
  const [curCategory, setCurCategory] = useState(0);

  const createCategory = () => {
    const temp = [];
    categoryList.forEach((v, i) => {
      temp.push(
        <CategorySelector
          style={{ fontSize: "0.9rem" }}
          className={
            curCategory === i + 1 ? "selected-category" : "dafault-category"
          }
          onClick={() => {
            setCurCategory(i + 1);
          }}
        >
          {v.name}
        </CategorySelector>
      );
    });
    return temp;
  };
  useEffect(() => {
    const jsonData = JsonToTableData(rankingList, keyToValue);
    setTableData(jsonData);
  }, [rankingList]);
  return (
    <Container fluid>
      <Row>
        <Col>
          <PageTitle title={"랭킹"} />
        </Col>
      </Row>
      <CategoryRowWrapper>
        <CategorySelector
          stlye={{ fontSize: "0.9rem" }}
          className={
            curCategory === 0 ? "selected-category" : "dafault-category"
          }
          onClick={() => {
            setCurCategory(0);
          }}
        >
          All
        </CategorySelector>
        {createCategory()}
      </CategoryRowWrapper>
      <Row>
        <Col>
          <FunctionalTable
            keyList={keyList}
            tableData={tableData}
            refresh
            excel
          />
        </Col>
      </Row>
    </Container>
  );
};
export default Ranking;
const RowWrapper = styled(Row)`
  .selected-category {
    background-color: grey;
  }
`;

const CategoryWrapper = styled.div`
  width: 160px;
  font-size: 1rem;
  border: 1px solid grey;
  padding: 20px;
  display: inline-block;
  text-align: center;
`;
