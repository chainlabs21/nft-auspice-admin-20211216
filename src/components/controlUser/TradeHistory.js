import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { connect } from "react-redux";
import styled from "styled-components";
import xlsx from "xlsx";

import I_search from "../../img/icon/I_search.png";
import I_dnPolygonGray from "../../img/icon/I_dnPolygonGray.png";

import { displayTime, putCommaAtPrice, strDot } from "../../util/Util";
import SelectPopup from "../SelectPopup";

function TradeHistory({ store, setTradeDetailPopup }) {
  const [category, setCategory] = useState(categoryList[0]);
  const [categoryPopup, setCategoryPopup] = useState(false);

  const [startDate, setStartDate] = useState(new Date(2021, 0, 1));
  const [endDate, setEndDate] = useState(new Date());
  const [search, setSearch] = useState();

  function onChangeStartDate(date) {
    setStartDate(date);
  }

  function onChangeEndDate(date) {
    setEndDate(date);
  }

  function onKeyUpSearch(e) {
    if (e.keyCode === 13) setSearch("");
  }

  function onClickSaveExcelBtn() {
    const ws = xlsx.utils.json_to_sheet(historyList);

    const wb = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");

    xlsx.writeFile(wb, "tradeList.xlsx");
  }

  return (
    <TradeHistoryBox>
      <div className="topBar">
        <span className="leftBox"></span>

        <span className="rightBox">
          <div className="categoryBox selectBox">
            <button
              className="sortBtn"
              onClick={() => setCategoryPopup(!categoryPopup)}
            >
              {category}
              <img src={I_dnPolygonGray} alt="" />
            </button>

            {categoryPopup && (
              <SelectPopup
                contList={categoryList}
                setCont={setCategory}
                setContPopup={setCategoryPopup}
              />
            )}
          </div>

          <div className="termBox">
            <span className="dateBox">
              <ReactDatePicker
                locale="ko"
                selected={startDate}
                onChange={(date) => onChangeStartDate(date)}
                dateFormat="yyyy/MM/dd"
              />
            </span>
            ~
            <span className="dateBox">
              <ReactDatePicker
                locale="ko"
                selected={endDate}
                onChange={(date) => onChangeEndDate(date)}
                dateFormat="yyyy/MM/dd"
              />
            </span>
          </div>

          <div className="searchBox">
            <input
              placeholder="검색"
              value={search}
              onKeyUp={(e) => onKeyUpSearch(e)}
              onChange={(e) => setSearch(e.target.value)}
            />

            <img src={I_search} alt="" onClick={() => setSearch("")} />
          </div>

          <button className="saveExcelBtn" onClick={onClickSaveExcelBtn}>
            Excel
          </button>
        </span>
      </div>

      <ul className="historyList">
        <ul className="listHeader">
          {listHeader.map((header, index) => (
            <li key={index}>{header}</li>
          ))}
        </ul>

        {historyList.map((trade, index) => (
          <li key={index}>
            <span>{index + 1}</span>
            <span>{trade.depositAddress}</span>
            <span>{trade.withdrawAddress}</span>
            <span>{trade.coin}</span>
            <span>{trade.count}</span>
            <span>{trade.fee}</span>
            <span>{trade.note ? trade.node : "-"}</span>
          </li>
        ))}
      </ul>
    </TradeHistoryBox>
  );
}

const TradeHistoryBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 38px;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .leftBox {
      display: flex;
      gap: 12px;
      color: #414d55;
    }

    .rightBox {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #6f748c;

      .categoryList {
        display: flex;
        border-radius: 8px;
        font-size: 14px;
        color: #636d73;

        li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 40px;
          background: #fafbfd 0% 0% no-repeat padding-box;
          cursor: pointer;

          &:first-of-type {
            border-radius: 8px 0px 0px 8px;
          }
          &:last-of-type {
            border-radius: 0px 8px 8px 0px;
          }
        }
      }

      .selectBox {
        position: relative;

        &.sortBox {
          & > * {
            width: 130px;
          }
        }

        &.categoryBox {
          & > * {
            width: 160px;
          }
        }

        .sortBtn {
          padding: 0 20px;
        }

        .sortPopup {
          padding: 10px 0;
          position: absolute;
          border: 1px solid #bbcdd9;
          background: #fff;
          border-radius: 5px;
          color: #414d55;
          z-index: 6;

          li {
            display: flex;
            align-items: center;
            height: 40px;
            padding: 0 12px;

            &:hover {
              background: #fafbfd;
              cursor: pointer;
            }
          }
        }
      }

      .sortBtn,
      .termBox,
      .searchBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        border: 1px solid #dddfe1;
        border-radius: 3px;
        height: 40px;
        font-size: 14px;
      }

      .termBox {
        gap: 18px;

        .dateBox {
          width: 100px;
        }
      }

      .searchBox {
        width: 250px;

        input {
          padding-left: 8px;
          width: 100%;
          height: 100%;
        }

        img {
          cursor: pointer;
        }
      }

      .saveExcelBtn {
        width: 120px;
        height: 40px;
        color: #fff;
        background: #2662f0;
        font-size: 18px;
        border-radius: 3px;
      }
    }
  }

  .historyList {
    border-top: 3px solid #dddfe1;

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
        font-size:18px;

        &:nth-of-type(1) {
          width: 120px;
        }
        &:nth-of-type(2) {
          width: 240px;
        }
        &:nth-of-type(3) {
          width: 240px;
        }
        &:nth-of-type(4) {
          width: 170px;
        }
        &:nth-of-type(5) {
          width: 100px;
        }
        &:nth-of-type(6) {
          width: 170px;
        }
        &:nth-of-type(7) {
          flex: 1;
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
  "입금주소",
  "출금주소",
  "코인",
  "수량",
  "수수료",
  "비고",
];

const historyList = [
  {
    depositAddress: "0xF83...Be03",
    withdrawAddress: "0xF83...Be03",
    coin: "Token",
    count: 1,
    fee: 0.005,
    note: "",
  },
  {
    depositAddress: "0xF83...Be03",
    withdrawAddress: "0xF83...Be03",
    coin: "Token",
    count: 1,
    fee: 0.005,
    note: "",
  },
  {
    depositAddress: "0xF83...Be03",
    withdrawAddress: "0xF83...Be03",
    coin: "Token",
    count: 1,
    fee: 0.005,
    note: "",
  },
  {
    depositAddress: "0xF83...Be03",
    withdrawAddress: "0xF83...Be03",
    coin: "Token",
    count: 1,
    fee: 0.005,
    note: "",
  },
];

const categoryList = ["최신순", "입금주소", "출금주소", "코인"];
