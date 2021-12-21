import { connect } from "react-redux";
import styled from "styled-components";
import I_eye from "../../img/icon/I_eye.png";
import I_info from "../../img/icon/I_info.png";
import I_rtArw3Green from "../../img/icon/I_rtArw3Green.svg";
import { putCommaAtPrice } from "../../util/Util";

function Holders({ store }) {
  return (
    <HoldersBox>
      <div className="topBar">
        <p className="count">A total of {dataList.length} transactions found</p>

        <span className="pageBtnBox">
          <button className="firstBtn" onClick={() => {}}>
            First
          </button>

          <button className="beforeBtn" onClick={() => {}}>
            &lt;
          </button>

          <button className="indexBtn" onClick={() => {}}>
            Page 1 of 1
          </button>

          <button className="beforeBtn" onClick={() => {}}>
            &gt;
          </button>

          <button className="lastBtn" onClick={() => {}}>
            Last
          </button>
        </span>
      </div>

      <div className="dataListBox">
        <ul className="listHeader">
          <li>Rank</li>
          <li>Address</li>
          <li>Quantity</li>
          <li>Percentage</li>
        </ul>

        <ul className="dataList">
          {dataList.map((cont, index) => (
            <li key={index}>
              <span>{index + 1}</span>

              <span>
                <p className="address">{cont.address}</p>
              </span>

              <span>{putCommaAtPrice(cont.quantity)}</span>
              <span>
                <div className="percentBox">{cont.percent.toFixed(4)}%</div>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </HoldersBox>
  );
}

const HoldersBox = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 470px;
  padding: 12px;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .count {
      font-size: 14px;
    }

    .pageBtnBox {
      display: flex;
      gap: 4px;

      button {
        height: 30px;
        padding: 0 12px;
        font-size: 12px;
        color: #4a4f55cc;
        background: #eaf4fb;
        border-radius: 8px;
      }
    }
  }

  .dataListBox {
    .listHeader {
      display: flex;
      align-items: center;
      height: 42px;
      font-weight: 600;
      font-size: 14px;
      background: #eaf4fb;
      border-top: 1px solid #eee;
    }

    .dataList {
      border-top: 2px solid #eee;

      li {
        display: flex;
        align-items: center;
        height: 48px;
        font-size: 14px;

        &:nth-of-type(n + 2) {
          border-top: 1px solid #eee;
        }

        .address {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        span {
          &:nth-of-type(2) {
            color: #3498db;
          }

          &:nth-of-type(4) {
            padding: 0 8px 0 0;

            .percentBox {
              padding: 0 0 8px 0;
              border-bottom: 2px solid #3498db;
            }
          }
        }
      }
    }

    .listHeader li,
    .dataList li > span {
      &:nth-of-type(1) {
        width: 56px;
        padding: 0 0 0 8px;
      }

      &:nth-of-type(2) {
        flex: 1;
      }

      &:nth-of-type(3) {
        width: 274px;
      }

      &:nth-of-type(4) {
        width: 224px;
      }
    }
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Holders);

const dataList = [
  {
    address:
      "0x04a09dca4d849fd31cc727f7432ec650a3c06b823dffae3a34f927859e1416c5",
    quantity: 89999999890,
    percent: 100,
  },
  {
    address:
      "0x04a09dca4d849fd31cc727f7432ec650a3c06b823dffae3a34f927859e1416c5",
    quantity: 98,
    percent: 0,
  },
  {
    address:
      "0x04a09dca4d849fd31cc727f7432ec650a3c06b823dffae3a34f927859e1416c5",
    quantity: 10,
    percent: 0,
  },
  {
    address:
      "0x04a09dca4d849fd31cc727f7432ec650a3c06b823dffae3a34f927859e1416c5",
    quantity: 2,
    percent: 0,
  },
];
