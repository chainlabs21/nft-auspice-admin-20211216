import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { displayTime } from "../../util/Util";
import I_dnPolygonGray from "../../img/icon/I_dnPolygonGray.png";

function TradeInfoList({ store }) {
  const [category, setCategory] = useState("예술");
  const [toggle, setToggle] = useState(false);
  const [togglecategoryPopup, setTogglecategoryPopup] = useState(false);

  function onClickCopy(data) {
    const textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = data;

    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }

  function onClickCategory(data) {
    setCategory(data);
    setTogglecategoryPopup(false);
  }

  return (
    <TradeInfoListBox>
      <div className="topBar">
        <div className="titleBox">
          <strong className="subtitle">사용자 입출금 상세조회</strong>
        </div>
      </div>

      <ul className="infoList">
        <li>
          <span className="key">사용자 아이디</span>
          <span className="value">user00</span>
          <span className="key">회원 가입일</span>
          <span className="value">2021-11-25 12:10:00</span>
        </li>

        <li>
          <span className="key">보유 TOKEN</span>
          <span className="value">102.1</span>
          <span className="key">누적 입/출금 수량</span>
          <span className="value">1230/567</span>
        </li>
        <li>
          <span className="key">보유 TOKEN</span>
          <span className="value">102.1</span>
          <span className="key">누적 입/출금 수량</span>
          <span className="value">1230/567</span>
        </li>
        <li>
          <span className="key">보유 TOKEN</span>
          <span className="value">102.1</span>
          <span className="key">누적 입/출금 수량</span>
          <span className="value">1230/567</span>
        </li>
        <li>
          <span className="key">보유 TOKEN</span>
          <span className="value">102.1</span>
          <span className="key">누적 입/출금 수량</span>
          <span className="value">1230/567</span>
        </li>
        <li>
          <span className="key">보유 TOKEN</span>
          <span className="value">102.1</span>
          <span className="key">누적 입/출금 수량</span>
          <span className="value">1230/567</span>
        </li>
      </ul>
    </TradeInfoListBox>
  );
}

const TradeInfoListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 46px;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;

    .titleBox {
      display: flex;
      align-items: flex-end;
      .subtitle {
        color: #414d55;
        font-size: 20px;
        margin-right: 14px;
      }

      .target {
        color: #2662f0;
        margin-left: 8px;
      }
    }

    .btnBox {
      display: flex;
      gap: 12px;
      border-radius: 5px;
      font-size: 16px;

      button {
        height: 40px;
      }

      .hideBtn {
        width: 136px;
        color: #414d55;
        border: 1px solid #bbcdd9;
        background: #fafbfd;
        border: 1px solid #bbcdd9;
      }

      .saveBtn {
        width: 122px;
        color: #fff;
        background: #2662f0;
      }
    }
  }

  .infoList {
    border: 1px solid #dddfe1;
    border-bottom: unset;
    font-size: 16px;

    & > li {
      display: flex;
      height: 60px;
      border-bottom: 1px solid #dddfe1;
      font-size: 18px;

      .key {
        width: 220px;
        padding: 0 12px 0 42px;
        color: #464a53;
        background: #f7f7f7;
      }

      .value {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 490px;
        padding: 0 12px 0 42px;
      }

      span {
        display: flex;
        align-items: center;

        &.status {
          color: #2662f0;
        }

        &.selectBox {
          cursor: pointer;
          position: relative;

          .PopupBg {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }

          .categoryPopup {
            width: 100%;
            background: #fff;
            padding: 10px 0;
            position: absolute;
            top: 60px;
            left: 0;
            border: 1px solid #e0e0e2;
            border-radius: 5px;
            box-shadow: 0px 1px 15px #0000001a;
            z-index: 3;

            li {
              display: flex;
              align-items: center;
              height: 40px;
              padding-left: 42px;

              &:hover {
                background: #fafbfd;
              }
            }
          }
        }

        .copyBtn {
          width: 70px;
          height: 35px;
          color: #636d73;
          background: #f1f5f8;
          border: 1px solid #a2c0d4;
          border-radius: 3px;
          font-size: 16px;
        }

        .toggleBtn {
          display: flex;
          align-items: center;
          width: 86px;
          height: 38px;
          border-radius: 20px;
          padding: 2px;
          transition: all 0.4s;
          position: relative;
          font-size: 16px;

          span {
            display: inline-block;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: #fff;
            transition: all 0.4s;
          }

          .btnText {
            position: absolute;

            &.on {
              left: 10px;
            }

            &.off {
              right: 10px;
            }
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
    // setEnrollAdminPopup: () => dispatch(setEnrollAdminPopup()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeInfoList);

const categoryPopup = ["예술", "abc", "def", "ghi", "jkl"];
