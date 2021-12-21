import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setAutoConnect, setConnect } from "../../util/store";

function Incineration({ store, setConnect, setAutoConnect }) {
  const [address, setAddress] = useState("");
  const [alarm, setAlarm] = useState("*유효한 주소가 아닙니다");
  const [count, setCount] = useState("");

  return (
    <IncinerationBox>
      <div className="innerBox">
        <section className="IncinerationBox">
          <ul className="infoList">
            <li>
              <span className="key">소각할 수량</span>
              <span className="value">
                <div className="inputBox count">
                  <input
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    placeholder=""
                  />

                  <p className="unit">(Metaland)</p>
                </div>

                <div className="infoBox">
                  <p className="balance">
                    *현재 분배되지 않은 수량: 9700000(Metaland)
                  </p>
                  <p className="afterBalance">
                    *소각 후 예상 잔여 수량: 9699965 (Metaland)
                  </p>
                </div>
              </span>
            </li>
          </ul>

          <button className="IncinerationBtn" onClick={() => {}}>
            소각하기
          </button>
        </section>

        <section className="historyBox">
          <strong className="title">*소각내역</strong>

          <article className="listBox">
            <ul className="listHeader">
              {listHeader.map((header, index) => (
                <li key={index}>{header}</li>
              ))}
            </ul>

            <ul className="historyList">
              {historyList.map((cont, index) => (
                <li key={index}>
                  <span>{index + 1}</span>
                  <span>{cont.date}</span>
                  <span>{cont.address}</span>
                  <span>
                    {cont.count[0]}
                    {cont.count[1]}
                  </span>
                  <span>{cont.fee}</span>
                  <span>{cont.state}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </IncinerationBox>
  );
}

const IncinerationBox = styled.div`
  display: flex;
  padding: 100px 32px 556px 0;
  color: #4a4f55cc;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0 0 0;
    width: 1400px;

    .IncinerationBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 70px;
      width: 690px;
      padding: 20px;
      background: #fff;
      border-radius: 8px;

      .infoList {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;

        li {
          display: flex;
          gap: 20px;

          .key {
            display: flex;
            align-items: center;
            width: 200px;
            height: 32px;
            padding: 0 0 0 8px;
            font-size: 16px;
            background: #eaf4fb;
          }

          .value {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 4px;

            .inputBox {
              display: flex;
              align-items: center;
              gap: 4px;
              width: 100%;
              height: 32px;
              padding: 0 8px;
              font-size: 16px;
              background: #eaf4fb;

              input {
                flex: 1;
                font-size: 16px;
                color: #4a4f55cc;
              }

              &.count {
                input {
                  text-align: end;
                }
              }
            }

            .infoBox {
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              gap: 8px;
              font-size: 12px;
            }
          }
        }
      }

      .IncinerationBtn {
        width: 320px;
        height: 40px;
        font-size: 18px;
        background: #eaf4fb;
      }
    }

    .historyBox {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
      min-height: 400px;
      background: #fff;
      border-radius: 8px;

      .title {
        font-size: 20px;
      }

      .listBox {
        .listHeader {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 12px;
          background: #eaf4fb;
        }

        .historyList {
          padding: 0 12px;
          overflow-y: scroll;

          li {
            display: flex;
            align-items: center;
            height: 48px;

            &:nth-of-type(n + 2) {
              border-top: 1px solid #eee;
            }

            span {
              &:nth-of-type(3) {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                padding: 0 20px 0 0;
              }
            }
          }
        }

        .listHeader li,
        .historyList li span {
          &:nth-of-type(1) {
            width: 80px;
          }

          &:nth-of-type(2) {
            width: 240px;
          }

          &:nth-of-type(3) {
            flex: 1;
          }

          &:nth-of-type(4) {
            width: 200px;
          }

          &:nth-of-type(5) {
            width: 120px;
          }

          &:nth-of-type(6) {
            width: 80px;
          }
        }
      }
    }
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setConnect: (walletId) => dispatch(setConnect(walletId)),
    setAutoConnect: (boolean) => dispatch(setAutoConnect(boolean)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Incineration);

const listHeader = ["*번호", "일시", "주소", "수당", "수수료", "상태"];

const historyList = [
  {
    date: "2021-12-17",
    address:
      "0x04a09dca4d849fd31cc727f7432ec650a3c06b823dffae3a34f927859e1416c5",
    count: [0.1, "Klay"],
    fee: 0.0001,
    state: "전송완료",
  },
  {
    date: "2021-12-16",
    address:
      "0x04a09dca4d849fd31cc727f7432ec650a3c06b823dffae3a34f927859e1416c5",
    count: [1.5, "Metaland"],
    fee: 0.0003,
    state: "전송완료",
  },
];
