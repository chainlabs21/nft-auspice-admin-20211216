import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setAutoConnect, setConnect } from "../../util/store";

function Lock({ store }) {
  const [stateLock, setStateLock] = useState(false);

  return (
    <LockBox>
      <div className="innerBox">
        <section className="lockBox">
          <ul className="infoList">
            <li>
              <span className="key">대상 계정 주소</span>
              <span className="value">
                0x04a09dca4d849fd31cc727f7432ec650a3c06b823dffae3a34f927859e1416c5
              </span>
            </li>
          </ul>

          <div className="btnBox">
            <button
              className="lockBtn"
              onClick={() => setStateLock(!stateLock)}
              style={{
                background: stateLock ? "#b6d7a8" : "#FF9900",
              }}
            >
              {stateLock ? "락 해제하기" : "락 적용하기"}
            </button>

            <p className="explain">
              *해당 계정주소의 전송 및 수령 기능이 중지됩니다
            </p>
          </div>
        </section>

        <section className="historyBox">
          <strong className="title">*락 내역</strong>

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
    </LockBox>
  );
}

const LockBox = styled.div`
  display: flex;
  padding: 100px 32px 556px 0;
  color: #4a4f55cc;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0 0 0;
    width: 1400px;

    .lockBox {
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
            border-radius: 8px;
          }

          .value {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            background: #d9d2e9;
            border-radius: 8px;
            padding: 0 12px;
            line-height: 32px;
          }
        }
      }

      .btnBox {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .lockBtn {
          width: 320px;
          height: 40px;
          font-size: 18px;
          color: #4a4f55cc;
          background: #eaf4fb;
          border-radius: 8px;
        }

        .explain {
          font-size: 12px;
        }
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
    // setConnect: (walletId) => dispatch(setConnect(walletId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lock);

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
