import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import I_leftPolygon from "../../img/icon/I_leftPolygon.png";
import I_rightPolygon from "../../img/icon/I_rightPolygon.png";
import { displayTime, putCommaAtPrice, strDot } from "../../util/Util";

function TradeHistory({ store, setTradeDetailPopup }) {
  const [pageNow, setPageNow] = useState(1);

  function onClickPreBtn() {
    if (pageNow > 1) setPageNow(pageNow - 1);
  }
  function onClickNextBtn() {
    if (pageNow < pageList.length) setPageNow(pageNow + 1);
  }

  return (
    <TradeHistoryBox>
      <p className="subtitle">아이템 정보 확인</p>

      <ul className="HistoryList">
        <ul className="listHeader">
          {listHeader.map((header, index) => (
            <li key={index}>{header}</li>
          ))}
        </ul>

        {HistoryList.map((trade, index) => (
          <li key={index} onClick={setTradeDetailPopup}>
            <span>{trade.num}</span>
            <span>{trade.category}</span>
            <span>{displayTime(trade.time, 6)}</span>
            <span>{trade.nickname}</span>
            <span>{trade.payment}</span>
            <span>
              <p>{trade.count}</p>
              <p className="payment">{trade.payment}</p>
            </span>
            <span>{putCommaAtPrice(trade.price)}&nbsp;원</span>
            <span>{strDot(trade.detail, 11)}</span>
          </li>
        ))}
      </ul>
      <div className="pageBox">
        <button className="preBtn" onClick={onClickPreBtn}>
          <img src={I_leftPolygon} alt="" />
        </button>
        <ul className="pageList">
          {pageList.map((page, index) => (
            <li
              key={index}
              style={{
                color: pageNow === index + 1 && "#2662F0",
                borderColor: pageNow === index + 1 && "#2662F0",
                background: pageNow === index + 1 && "#E5EAEF",
              }}
            >
              {index + 1}
            </li>
          ))}
        </ul>
        <button className="ellipseBtn">…</button>
        <button className="lasgPageBtn">456</button>
        <button className="preBtn" onClick={onClickNextBtn}>
          <img src={I_rightPolygon} alt="" />
        </button>
      </div>
    </TradeHistoryBox>
  );
}

const TradeHistoryBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 38px;

  .subtitle {
    color: #414d55;
    font-size: 20px;
    margin-right: 14px;
  }
  .HistoryList {
    border-top: 3px solid #dddfe1;
    margin-top: 40px;

    .listHeader,
    & > li {
      display: flex;
      align-items: center;
      padding: 0 30px;
      border-bottom: 1px solid #dddfe1;

      &.listHeader {
        height: 45px;
        font-size: 17px;
        color: #414d55;
      }

      & > * {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:nth-of-type(1) {
          width: 62px;
        }
        &:nth-of-type(2) {
          width: 146px;
          text-align: center;
        }
        &:nth-of-type(3) {
          padding-left: 64px;
          width: 216px;
          text-align: center;
        }
        &:nth-of-type(4) {
          width: 188px;
          margin-left: 84px;
        }
        &:nth-of-type(5) {
          width: 100px;
        }
        &:nth-of-type(6) {
          width: 168px;
          text-align: end;
        }
        &:nth-of-type(7) {
          width: 122px;
          text-align: end;
        }
        &:nth-of-type(8) {
          flex: 1;
          padding-left: 86px;
          color: #2662f0;
          text-decoration: underline;
        }

        p {
          display: inline-block;

          &.payment {
            color: #636d73;
            margin-left: 14px;
          }
        }
      }
    }

    & > li {
      height: 74px;
      font-size: 15px;
      cursor: pointer;

      &:hover {
        background: #fafbfd;
      }

      span {
        &:nth-of-type(1) {
          color: #414d55;
        }
      }
    }
  }

  .pageBox {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    margin-top: 20px;
    color: #636d73;

    .pageList li,
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;
      height: 45px;
      border: 1px solid #bbcdd9;
      border-radius: 1px;
      cursor: pointer;
    }

    .pageList {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .lasgPageBtn {
      width: unset;
      padding: 14px 20px;
    }
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    // setTradeDetailPopup: () => dispatch(setTradeDetailPopup()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeHistory);

const listHeader = [
  "번호",
  "분류",
  "일시",
  "닉네임",
  "결제 토큰",
  "수량",
  "가격",
  "Transaction Details",
];

const HistoryList = [
  {
    num: 248,
    category: "옥션 취소",
    time: [2021, 10, 13, 15, 45, 44],
    nickname: "nicknames",
    payment: "ETH",
    count: 0.05,
    price: 14348,
    detail: "0xcda72070ellllllll",
  },
  {
    num: 248,
    category: "옥션 참여",
    time: [2021, 10, 13, 15, 45, 44],
    nickname: "nicknames",
    payment: "ETH",
    count: 0.05,
    price: 14348,
    detail: "0xcda72070ellllllll",
  },
  {
    num: 248,
    category: "옥션 참여",
    time: [2021, 10, 13, 15, 45, 44],
    nickname: "nicknames",
    payment: "ETH",
    count: 0.05,
    price: 14348,
    detail: "0xcda72070ellllllll",
  },
  {
    num: 248,
    category: "옥션 취소",
    time: [2021, 10, 13, 15, 45, 44],
    nickname: "nicknames",
    payment: "ETH",
    count: 0.05,
    price: 14348,
    detail: "0xcda72070ellllllll",
  },
  {
    num: 248,
    category: "옥션 취소",
    time: [2021, 10, 13, 15, 45, 44],
    nickname: "nicknames",
    payment: "ABC",
    count: 0.05,
    price: 14348,
    detail: "0xcda72070ellllllll",
  },
];

const pageList = [1, 2, 3, 4, 5];
