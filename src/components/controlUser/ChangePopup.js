import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import I_x from "../../img/icon/I_x.png";
import I_dnPolygonGray from "../../img/icon/I_dnPolygonGray.png";
import { setAllPopupOff } from "../../util/store";
import axios from "axios";
import { API } from "../../configs/api";

function SendPopup({ store, off, username}) {
  const [address, setAddress] = useState("0xF83...Be03");
  const [count, setCount] = useState(10);
  const [group, setGroup] = useState(groupList[0]);

  const [groupPopup, setGroupPopup] = useState(false);
  const [calObj, setCalObj] = useState("");

  // console.log(index);

  useEffect(()=>{
    console.log("username: dfsa", username);
  },[]);
  

  function onClickGroup(data) {
    setGroup(data);
    setGroupPopup(false);
  }

  function onClickMinus() {
    if (count > 0) setCount(count - 1);
  }

  function onClickEnrollBtn() {
    off();
    axios
    .post(`${API.API_TOKEN_DEAL}/${username}/${group}/${calObj}${count}`)
    .then((resp) => {
      console.log(resp);
    });
  }

  return (
    <SendPopupBox>
      <div className="titleBar">
        <strong className="title">토큰 지급/차감</strong>
        <img src={I_x} alt="" onClick={() => off()} />
      </div>

      <ul className="infoList">
        <li>
          <p className="key">선택</p>
          <span>
            지급 <input type="radio" value="지급" onClick={() => {setCalObj("")}}/>
          </span>
          <span>
            차감 <input type="radio" value="차감" onClick={() => {setCalObj("-")}}/>
          </span>
        </li> 
        <li>
          <p className="key">종류</p>
          <span className="value">
            <button
              className="selectBtn"
              onClick={() => setGroupPopup(!groupPopup)}
            >
              {group}
              <img src={I_dnPolygonGray} alt="" />
            </button>
            {groupPopup && (
              <ul className="groupPopup">
                {groupList.map((group, index) => (
                  <li key={index} onClick={() => onClickGroup(group)}>
                    {group}
                  </li>
                ))}
              </ul>
            )}
          </span>
        </li>

        <li>
          <p className="key">수량</p>
          <span className="value countBox">
            <button className="minusBtn" onClick={onClickMinus}>
              -
            </button>
            <input value={count} onChange={(e) => setCount(e.target.value)} />
            <button className="plusBtn" onClick={() => setCount(count + 1)}>
              +
            </button>
          </span>
        </li>
      </ul>

      <button
        className="enrollBtn"
        disabled={!(count && group && address)}
        onClick={onClickEnrollBtn}
      >
        확인
      </button>
    </SendPopupBox>
  );
}

const SendPopupBox = styled.div`
  width: 600px;
  padding: 40px;
  color: #464a53;
  background: #fff;
  box-shadow: 2px 3px 10px #7777771a;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;

  .titleBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;

    img {
      width: 20px;
      cursor: pointer;
    }
  }

  .infoList {
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin: 40px 0 0 0;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .key {
        width: 120px;
        font-size: 16px;
        color: #464a53;
      }

      .value {
        flex: 1;
        display: flex;
        height: 45px;
        background: #6a707e00;
        border: 1px solid #dddfe1;
        border-radius: 2px;
        position: relative;

        &.countBox {
          display: flex;
          align-items: center;
          padding: 0 24px;

          button {
            font-size: 24px;
          }

          input {
            flex: 1;
            text-align: center;
          }
        }

        input {
          width: 100%;
          height: 100%;
          font-size: 16px;
          padding: 0 15px;

          &::placeholder {
            color: #abafb3;
            font-size: 16px;
          }
        }

        .selectBtn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          cursor: pointer;
          padding: 0 15px;
          font-size: 16px;
        }

        .groupPopup {
          width: 100%;
          background: #fff;
          font-size: 16px;
          border: 1px solid #dddfe1;
          z-index: 6;
          top: 45px;
          position: absolute;

          li {
            padding-left: 15px;
            height: 45px;
            cursor: pointer;

            &:hover {
              background: #fafbfd;
            }
          }
        }
      }

      .useBtn {
        display: flex;
        align-items: center;
        width: 86px;
        height: 38px;
        border-radius: 20px;
        padding: 2px;
        transition: all 0.4s;
        position: relative;

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

  .enrollBtn {
    width: 100%;
    height: 45px;
    margin: 25px 0 0 0;
    font-size: 16px;
    color: #fff;
    background: #2662f0 0% 0% no-repeat padding-box;
    box-shadow: 0px 1px 8px #2662f066;
    border-radius: 8px;

    &:disabled {
      background: #dddfe1;
      box-shadow: unset;
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

export default connect(mapStateToProps, mapDispatchToProps)(SendPopup);

const groupList = ["METAPLANET", "ETH"];
