import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import I_x from "../../img/icon/I_x.png";
import { setAllPopupOff } from "../../util/store";
import axios from "axios";
import { API } from "../../configs/api";
import { LOGGER } from "../../util/common";
import { query_noargs, query_decimals } from "../../util/contract-calls";
import WAValidator from "multicoin-address-validator";
import SetErrorBar from "../../util/SetErrorBar";
import { messages } from "../../configs/messages";
const cryptotype = "ETH";

function EnrollItemPopup({ store, setAllPopupOff }) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [fee, setFee] = useState("");
  const [contract, setContract] = useState("");
  const [toggle, setToggle] = useState(false);

  const onClickQueryBtn = (_) => {
    let address = contract;
    LOGGER("", `_${address}_`, name);
    let isaddressvalid = WAValidator.validate(
      address,
      cryptotype.toLowerCase()
    );
    if (isaddressvalid) {
    } else {
      SetErrorBar(messages.MSG_INVALID_REQDATA);
      return;
    }
    let aproms = [];
    aproms[aproms.length] = query_noargs({
      contractaddress: address,
      methodname: "decimals",
    });

    aproms[aproms.length] = query_noargs({
      contractaddress: address,
      methodname: "name",
    });
    Promise.all(aproms).then((aresps) => {
      LOGGER(aresps);
      setName(aresps[1]);
      setUnit(aresps[0]);
    });
  };

  function onClickEnrollBtn() {
    
  }

  return (
    <EnrollItemPopupBox>
      <div className="titleBar">
        <strong className="title">결제 토큰 추가</strong>
        <img src={I_x} alt="" onClick={setAllPopupOff} />
      </div>

      <ul className="contBox">
        <li>
          <span className="key">컨트랙트</span>
          <span className="value inputBox">
            <input
              value={contract}
              onChange={(e) => setContract(e.target.value)}
              placeholder="컨트렉트 입력"
            />
          </span>
        </li>

        <li className="btnBox">
          <span className="key"></span>
          <button
            className="enrollBtn"
            disabled={!contract}
            onClick={onClickQueryBtn}
          >
            조회하기
          </button>
        </li>

        <li>
          <span className="key">이름</span>
          <span className="value inputBox">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="eg. 이더리움"
            />
          </span>
        </li>

        <li>
          <span className="key">단위</span>
          <span className="value inputBox">
            <input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="eg. ETH"
            />
          </span>
        </li>

        <li>
          <span className="key">결제 활성</span>
          <span className="value">
            <button
              className="toggleBtn"
              onClick={() => setToggle(!toggle)}
              style={{ background: toggle ? "#7ED321" : "#FF5274" }}
            >
              <span style={{ marginLeft: toggle ? "48px" : 0 }} />
              {toggle && <p className="on btnText">ON</p>}
              {!toggle && <p className="off btnText">OFF</p>}
            </button>
          </span>
        </li>

        <li className="btnBox">
          <span className="key" />
          <span className="value">
            <button
              className="enrollBtn"
              disabled={!(contract && name)}
              onClick={onClickEnrollBtn}
            >
              등록
            </button>
          </span>
        </li>
      </ul>
    </EnrollItemPopupBox>
  );
}

const EnrollItemPopupBox = styled.div`
  width: 756px;
  padding: 40px;
  background: #fff;
  box-shadow: 2px 3px 10px #7777771a;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;
  display: flex;
  flex-direction: column;
  color: #464a53;

  .titleBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;
    line-height: 30px;

    img {
      cursor: pointer;
    }
  }

  .contBox {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 56px;
    font-size: 16px;

    li {
      display: flex;
      align-items: center;

      .key {
        width: 152px;
      }

      .value {
        display: flex;
        align-items: center;
        flex: 1;
        height: 52px;

        &.inputBox {
          color: #abafb3;
          background: #6a707e00;
          border: 1px solid #dddfe1;
          border-radius: 2px;
          padding: 15px;

          input {
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
            font-size: 16px;
            color: #464a53;

            &::placeholder {
              color: #abafb3;
            }
          }
        }
      }

      &.btnBox {
        margin-top: 36px;

        .enrollBtn {
          flex: 1;
          height: 45px;
          background: #2662f0;
          box-shadow: 0px 1px 8px #2662f066;
          border-radius: 8px;
          color: #fff;
          font-size: 16px;

          &:disabled {
            color: #636d73;
            background: #dce2e8;
            box-shadow: unset;
          }
        }
      }

      .toggleBtn {
        display: flex;
        align-items: center;
        width: 86px;
        height: 38px;
        border-radius: 20px;
        padding: 2px;
        color: #fff;
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
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setAllPopupOff: () => dispatch(setAllPopupOff()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnrollItemPopup);
