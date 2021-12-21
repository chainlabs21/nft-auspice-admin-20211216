import { useRef, useState } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { setAutoConnect, setConnect } from "../../util/store";
import I_spinner from "../../img/icon/I_spinner.svg";

function SendBlock({ store, setConnect, setAutoConnect }) {
  const enrollRef = useRef();
  const formData = new FormData();

  const [file, setFile] = useState("");
  const [filename, setFileName] = useState("");
  const [count, setCount] = useState("");

  function onChangeFile(file) {
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setFile(reader.result);
      setFileName(file.name);
    };

    formData.append("file", file);
  }

  return (
    <SendBlockBox>
      <div className="innerBox">
        <section className="sendBox">
          <ul className="infoList">
            <li>
              <span className="key">수령인 리스트 파일 열기</span>
              <span className="value">
                <button
                  className="inputBox"
                  onClick={() => enrollRef.current.click()}
                >
                  {filename}

                  <input
                    className="enrollFile"
                    type="file"
                    ref={enrollRef}
                    onChange={(e) => onChangeFile(e.target.files[0])}
                    placeholder=""
                  />
                </button>
                <p className="balance">*파일 내 유효한 계정주소: 55</p>
              </span>
            </li>

            <li>
              <span className="key">수량</span>
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
                  <p className="balance">*현재잔액: 9700000(Metaland)</p>
                  <p className="afterBalance">
                    *전송 완료 후 예상 잔여수량: 9499450
                  </p>
                </div>
              </span>
            </li>
          </ul>

          <button className="sendBtn" onClick={() => {}}>
            대량전송하기
          </button>
        </section>

        <section className="historyBox">
          <strong className="title">*전송내역</strong>

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
                  <span>{cont.address}</span>
                  <span>
                    {cont.state ? "전송완료" : <img src={I_spinner} alt="" />}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </SendBlockBox>
  );
}

const aniSpin = keyframes`
100%{
   transform: rotate(360deg);  
}`;

const SendBlockBox = styled.div`
  display: flex;
  padding: 100px 32px 556px 0;
  color: #4a4f55cc;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0 0 0;
    width: 1400px;

    .sendBox {
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

              &.count {
                input {
                  flex: 1;
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

      .sendBtn {
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

              &:nth-of-type(3) {
                img {
                  width: 20px;
                  animation: ${aniSpin} 1.4s infinite linear;
                }
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

const listHeader = ["*번호", "주소", "상태"];

const historyList = [
  {
    address:
      "0x04a09dca4d849fd31cc727f7432ec650a3c06b823dffae3a34f927859e1416c5",
    state: true,
  },
  {
    address:
      "0x04a09dca4d849fd31cc727f7432ec650a3c06b823dffae3a34f927859e1416c5",
    state: true,
  },
  {
    address:
      "0x04a09dca4d849fd31cc727f7432ec650a3c06b823dffae3a34f927859e1416c5",
    state: false,
  },
];
