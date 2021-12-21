import { useRef, useState } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { setAutoConnect, setConnect } from "../../util/store";

function SendBlock({ store }) {
  const enrollRef = useRef();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  return (
    <SendBlockBox>
      <section className="sendBox">
        <ul className="infoList">
          <li>
            <span className="key">아이디</span>
            <span className="value">
              <div className="inputBox">
                <input
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder=""
                />
              </div>
            </span>
          </li>

          <li>
            <span className="key">비번</span>
            <span className="value">
              <div className="inputBox">
                <input
                  type="password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder=""
                />
              </div>
            </span>
          </li>
        </ul>

        <button className="sendBtn" onClick={() => {}}>
          관리자 계정 추가하기
        </button>
      </section>
    </SendBlockBox>
  );
}

const SendBlockBox = styled.div`
  width: 460px;
  background: #fff;
  border-radius: 20px;
  border: 1px dashed #000;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 6;

  .sendBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 70px;
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
          width: 100px;
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
            justify-content: end;
            align-items: center;
            gap: 4px;
            width: 100%;
            height: 32px;
            padding: 0 8px;
            font-size: 16px;
            background: #eaf4fb;

            .enrollFile {
              position: absolute;
              width: 0;
              height: 0;
            }

            input {
              flex: 1;
              text-align: end;
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

    .sendBtn {
      width: 320px;
      height: 40px;
      font-size: 18px;
      border-radius: 8px;
      background: #ff9900;
    }
  }

  .historyBox {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 800px;
    min-height: 400px;
    padding: 20px;
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
            &:nth-of-type(2) {
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
          flex: 1;
        }

        &:nth-of-type(3) {
          width: 80px;
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

export default connect(mapStateToProps, mapDispatchToProps)(SendBlock);
