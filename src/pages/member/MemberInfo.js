import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import FunctionalTable from "../../components/table/FunctionalTable";
import {
  CategorySelector,
  MainCategorySelector,
  CategoryMainRowWrapper,
  CategoryRowWrapper,
} from "../../stlye/globalStyles";

import { mainCategory } from "./MemberInfoProps";
import { Mockups } from "./MemberInfoMokups";
import PageTitle from "../../components/PageTitle";
import { useDispatch } from "react-redux";
import { SET_SHOW_MEMBER_SLIDER } from "../../store/uiReducer";
import { HiOutlineDesktopComputer } from "react-icons/hi";

const MemberInfo = () => {
  const [curCategory, setCurCategory] = useState(0);
  const [curSubCategory, setCurSubCategory] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SET_SHOW_MEMBER_SLIDER, payload: { value: true } });

    return () => {
      dispatch({ type: SET_SHOW_MEMBER_SLIDER, payload: { value: false } });
    };
  }, [dispatch]);

  return (
    <Container fluid className="userDetail">
      <Row>
        <Col>
          <PageTitle title={"회원 상세"} />
        </Col>
      </Row>
      <CategoryMainRowWrapper>
        {mainCategory.map((cate, i) => (
          <Col key={i}>
            <MainCategorySelector
              className={
                curCategory === i ? "selected-category" : "default-category"
              }
              onClick={() => {
                setCurCategory(i);
              }}
            >
              <HiOutlineDesktopComputer
                style={{
                  float: "left",
                  fontSize: "2rem",
                  marginLeft: "0.6rem",
                }}
              />
              <span style={{ maringRight: "0.5rem" }}>{cate.title}</span>
            </MainCategorySelector>
          </Col>
        ))}
      </CategoryMainRowWrapper>

      <div className="contBox">
        <CategoryRowWrapper
          className={curCategory === 0 ? "categoryBar" : "categoryBar d-none"}
        >
          {mainCategory[0].subCategory.map((cate, i) => (
            <CategorySelector
              className={
                curSubCategory === i
                  ? "selected-sub-category"
                  : "default-sub-category"
              }
              onClick={() => {
                setCurSubCategory(i);
              }}
            >
              {cate.title}
            </CategorySelector>
          ))}
        </CategoryRowWrapper>
        <RowWrapper className="info-table">
          {curCategory === 0 ? (
            <Col>
              <FunctionalTable
                datePicker
                refresh
                excel
                keyList={mainCategory[0].subCategory[curSubCategory].keyList}
                tableData={
                  Mockups[curCategory].subMokups[curSubCategory].tableData
                }
              />
            </Col>
          ) : (
            <Col>
              <FunctionalTable
                datePicker
                excel
                refresh
                keyList={mainCategory[curCategory].keyList}
                tableData={Mockups[curCategory].tableData}
              />
            </Col>
          )}
        </RowWrapper>
      </div>
    </Container>
  );
};

const RowWrapper = styled(Row)`
  margin-bottom: 50px;
`;
export default MemberInfo;
