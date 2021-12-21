import { connect } from "react-redux";
import styled from "styled-components";
import I_eye from "../../img/icon/I_eye.png";
import I_info from "../../img/icon/I_info.png";
import I_rtArw3Green from "../../img/icon/I_rtArw3Green.svg";

function Transfers({ store }) {
  return (
    <TransfersBox>
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
          <li></li>
          <li>Txn Hash</li>
          <li>
            <p>Method</p>
            <img className="infoImg" src={I_info} alt="" />
          </li>
          <li>Age</li>
          <li>From</li>
          <li></li>
          <li>To</li>
          <li>Quantity</li>
        </ul>

        <ul className="dataList">
          {dataList.map((cont, index) => (
            <li key={index}>
              <span>
                <button className="moreBtn" onClick={() => {}}>
                  <img src={I_eye} alt="" />
                </button>
              </span>

              <span>
                <p className="address">{cont.txnHash}</p>
              </span>

              <span>
                <span className="methodBox">{cont.method}</span>
              </span>

              <span>{cont.age}</span>

              <span>
                <p className="address">{cont.from}</p>
              </span>

              <span>
                <span className="arrowBox">
                  <img src={I_rtArw3Green} alt="" />
                </span>
              </span>

              <span>
                <p className="address">{cont.to}</p>
              </span>

              <span>
                <p className="address">{cont.quantity}</p>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </TransfersBox>
  );
}

const TransfersBox = styled.article`
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

      li {
        &:nth-of-type(3) {
          display: flex;
          align-items: center;
          gap: 4px;

          .infoImg {
            width: 12px;
          }
        }

        &:nth-of-type(4) {
          color: #3498db;
        }
      }
    }

    .dataList {
      border-top: 2px solid #eee;

      li {
        display: flex;
        align-items: center;
        height: 48px;
        font-size: 14px;

        &:hover {
          background: #f5f7fa;
        }

        &:nth-of-type(n + 2) {
          border-top: 1px solid #eee;
        }

        .address {
          width: 170px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        span {
          &:nth-of-type(1) {
            .moreBtn {
              width: 20px;
              height: 20px;
              border-radius: 4px;
              background: #f1f2f4;

              &:hover {
                background: rgb(120, 131, 143);
              }

              img {
                width: 12px;
              }
            }
          }

          &:nth-of-type(2) {
            color: #3498db;
          }

          &:nth-of-type(3) {
            .methodBox {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 68px;
              height: 24px;
              font-size: 11px;
              font-weight: 500;
              text-transform: capitalize;
              background: #eaf4fb;
              border-radius: 8px;
            }
          }

          &:nth-of-type(5) {
            color: #3498db;
          }

          &:nth-of-type(6) {
            .arrowBox {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #e5f9f6;

              img {
                width: 12px;
              }
            }
          }

          &:nth-of-type(7) {
            color: #3498db;
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
        width: 264px;
      }

      &:nth-of-type(3) {
        width: 122px;
      }

      &:nth-of-type(4) {
        width: 192px;
      }

      &:nth-of-type(5) {
        width: 264px;
      }

      &:nth-of-type(6) {
        width: 42px;
      }

      &:nth-of-type(7) {
        width: 264px;
      }

      &:nth-of-type(8) {
        flex: 1;
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

export default connect(mapStateToProps, mapDispatchToProps)(Transfers);

const dataList = [
  {
    txnHash:
      "0x04a09dca4d849fd31cc727f7432ec650a3c06b823dffae3a34f927859e1416c5",
    method: "transfer",
    age: "8 days 8 hrs ago",
    from: "0x5c7552f154d81a99e2b5678fc5fd7d1a4085d8d7",
    to: "0x5c7552f154d81a99e2b5678fc5fd7d1a4085d8d7",
    quantity: 10,
  },
  {
    txnHash:
      "0x04a09dca4d849fd31cc727f7432ec650a3c06b823dffae3a34f927859e1416c5",
    method: "transfer",
    age: "8 days 8 hrs ago",
    from: "0x5c7552f154d81a99e2b5678fc5fd7d1a4085d8d7",
    to: "0x5c7552f154d81a99e2b5678fc5fd7d1a4085d8d7",
    quantity: 1,
  },
  {
    txnHash:
      "0x04a09dca4d849fd31cc727f7432ec650a3c06b823dffae3a34f927859e1416c5",
    method: "transfer",
    age: "8 days 8 hrs ago",
    from: "0x5c7552f154d81a99e2b5678fc5fd7d1a4085d8d7",
    to: "0x5c7552f154d81a99e2b5678fc5fd7d1a4085d8d7",
    quantity: 1,
  },
  {
    txnHash:
      "0x04a09dca4d849fd31cc727f7432ec650a3c06b823dffae3a34f927859e1416c5",
    method: "transfer",
    age: "8 days 8 hrs ago",
    from: "0x5c7552f154d81a99e2b5678fc5fd7d1a4085d8d7",
    to: "0x5c7552f154d81a99e2b5678fc5fd7d1a4085d8d7",
    quantity: 10,
  },
];
