import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
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
import {SET_CURRENT_USER } from "../../store/memberReducer";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import axios from "axios";
import {API} from "../../utils/api"
import moment from "moment";
import GeneralPagination from "../../utils/Pagination";

const MemberInfo = () => {
  const { search } = useLocation();
  const { userId } = queryString.parse(search);
  const [user, setuser] = useState(false);
  const [curCategory, setCurCategory] = useState(0);
  const [curSubCategory, setCurSubCategory] = useState(0);
  const [tableData, setTableData] = useState([])
  const [page, setPage] = useState(1);
  const [DEFAULT_SIZE, setDEFAULT_SIZE] = useState(20);
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  useEffect(()=>{
    if(!userId){return;}
    //if(setuser){window.location.reload()}
    dispatch({
      type: SET_SHOW_MEMBER_SLIDER,
      payload: {value: true}
    })
    axios.get(API.GET_USER_DETAIL(userId, 'general', 1, 10)).then((resp)=>{
      let user_data = resp.data?.resp;
      if(!user_data) {alert('no data found'); return;}
      console.log(resp)
      dispatch({
        type: SET_CURRENT_USER,
        payload: {
          id: 1,
          email: user_data.email,
          createdAt: moment().format("2021-01-01 19:35"),
          address: user_data.username,
          nickname: user_data.nickname,
          items: user_data.itemscount,
          coverImage: user_data.coverimageurl,
          profImage: user_data.profileimageurl,
          introduce: user_data.description,
        }
      })
    })
  },[userId])

  const CallbackfromPagination=(e)=>{
    setPage(e)
    //setSearch(false)
  }

  useEffect(()=>{

    console.log(curCategory)
    console.log(curSubCategory)
    setTableData([])

    switch (curCategory){
      case 0:
        console.log('wallet');
        switch(curSubCategory){
          case 0:
            console.log('buy')
            axios.get(API.GET_USER_DETAIL(userId, 'buy', 100, 0)).then((resp)=>{
              console.log(resp)
              let {rows, count} = resp.data.resp;
              rows.map((v, i)=>{
                setTableData(pre=>[...pre, {
                  no: i+1,
                tradeDate: moment(v.createdat).format("2021-06-12 09:50:11"),
                itemName: v.item_logorder_info.titlename,
                itemId: v.itemid,
                payToken: "KLAY",
                payAmount: v.price,
                tradeNumber: v.id,
                tradeMethod: "지정가",
                tradeState: "완료",
                payTokenBuy: "KLAY",
                payAmountBuy: 1,
                payUSD: 30.45,
                From: v.buyer_logorder_info?.nickname,
                To: v.seller_logorder_info?.nickname,
                fee: 0.25,
                transaction: v.closingtxhash,
                }])
                
              })
            })
            break;
          case 1:
            console.log('sale')
            axios.get(API.GET_USER_DETAIL(userId, 'sale', 100, 0)).then((resp)=>{
              console.log(resp)
              let {rows, count} = resp.data.resp;
              rows.map((v, i)=>{
                setTableData(pre=>[...pre, {
                  no: 1,
                tradeDate: moment(v.createdat).format("2021-06-12 09:50:11"),
                itemName: v.item_logorder_info.titlename,
                itemId: v.itemid,
                payToken: v.item_logorder_info.priceunit,
                payAmount: v.price,
                tradeNumber: v.id,
                tradeMethod: v.typestr,
                tradeState: "완료",
                payTokenBuy: v.item_logorder_info.priceunit,
                payAmountBuy: v.price,
                payUSD: 30.45,
                From: v.seller_logorder_info?.nickname,
                To: v.buyer_logorder_info?.nickname,
                fee: 0.25,
                transaction: v.closingtxhash,
                }])
                
              })
            })
            break;
          case 2:
            console.log('수수료')
            break;
          case 3:
            console.log('로얄티')
            break;
          default:
            return;
        }
        break;
      case 1:
        console.log('items');
        axios.get(API.GET_USER_DETAIL(userId, 'items', 100, 0)).then((resp)=>{
          console.log(resp)
          let {rows, count} = resp.data.resp;
          rows.map((v, i)=>{
            setTableData(pre=>[...pre, {
              no: i+1,
            createdat: moment(v.createdat).format("2021-06-12 09:50:11"),
            creator: v.balance_item_info?.author,
            owner: v.owner_info?.nickname,
            itemname: v.balance_item_info?.titlename,
            itemid: v.balance_item_info?.itemid,
            category: v.balance_item_info?.categorystr,
            token: v.balance_item_info?.priceunit,
            price: v.balance_item_info?.price || 0,
            contract: v.balance_item_info?.contract

            }])
            
          })
        })
        break;
      case 2: 
        console.log('activity');
        axios.get(API.GET_USER_DETAIL(userId, 'activity', 100, 0)).then((resp)=>{
          console.log(resp)
          let query = resp.data.query;
          query.map((v, i)=>{
            setTableData(pre=>[...pre, {
              no: v.id,
              createdat: v.createdat,
              type: v.type,
              name: v.itemname,
              itemid: v.itemid,
              coin: v.unit,
              price: v.price,
              from: v.from,
              to: v.to,
              tx: v.txhash

            }])
            
          })
        })
        break;
      case 3:
        console.log('fav');
        axios.get(API.GET_USER_DETAIL(userId, 'fav', 100, 0)).then((resp)=>{
          console.log(resp)
          let {rows, count} = resp.data.resp;
          rows.map((v, i)=>{
            setTableData(pre=>[...pre, {
              no: i+1,
              createdat: v.createdat,
              owner: v.liked_item_info.author_info.nickname,
              name: v.liked_item_info.titlename,
              itemid: v.itemid,
              coin: v.liked_item_info.priceunit,
              price: v.liked_item_info.price,
              contract: v.liked_item_info.contract

            }])
            
          })
        })
        break;
      default:
        break;
    }


  },[curCategory, curSubCategory, userId])

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
          className={
            curCategory === 0 ? "customCategoryBar" : "customCategoryBar d-none"
          }
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
                wrapName="tableHasNo"
                datePicker
                refresh
                excel
                keyList={mainCategory[0].subCategory[curSubCategory].keyList}
                tableData={
                  tableData
                }
              />
            </Col>
          ) : (
            <Col>
              <FunctionalTable
                wrapName={`${curCategory !== 2 && "tableHasNo"} ${
                  curCategory > 3 && "fixedPixel"
                }`}
                datePicker
                excel
                refresh
                keyList={mainCategory[curCategory].keyList}
                tableData={tableData}
              />
            </Col>
          )}
        </RowWrapper>
      </div>
      <GeneralPagination passToParent={CallbackfromPagination} count={count} size={DEFAULT_SIZE}/> 
    </Container>
  );
};

const RowWrapper = styled(Row)`
  margin-bottom: 50px;
`;
export default MemberInfo;
