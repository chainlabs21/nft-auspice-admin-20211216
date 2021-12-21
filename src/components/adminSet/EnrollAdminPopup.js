import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import I_x from "../../img/icon/I_x.png";
import I_dnPolygonGray from "../../img/icon/I_dnPolygonGray.png";
import { setAllPopupOff } from "../../util/store";
import axios from "axios";
import { API } from "../../configs/api";

function EnrollAdminPopup({ store, setAllPopupOff }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [nickname, setNickname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(false);
  const [group, setGroup] = useState("");

  const [groupPopup, setGroupPopup] = useState(false);

  function onClickGroup(data) {
    setGroup(data);
    setGroupPopup(false);
  }

  function onClickEnrollBtn() {
    const data = {
      username: id,
      pw,
      nickname,
      phonenumber,
      email,
      active,
      group,
    };

    axios.post(`${API.API_POST_ADMINUSERS_ENROLL}`, data).then((res) => {
      console.log(res);
    });

    window.location.reload();
    setAllPopupOff();
  }

  return (
    <EnrollAdminPopupBox>
      <div className="titleBar">
        <strong className="title">관리자 등록</strong>
        <img src={I_x} alt="" onClick={setAllPopupOff} />
      </div>

      <ul className="infoList">
        <li>
          <p className="key">사용자 ID*</p>
          <span className="value">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디를 입력하세요."
            />
          </span>
        </li>

        <li>
          <p className="key">암호*</p>
          <span className="value">
            <input
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="사용될 암호를 입력하세요."
            />
          </span>
        </li>

        <li>
          <p className="key">사용자명*</p>
          <span className="value">
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="이름을 입력하세요."
            />
          </span>
        </li>

        <li>
          <p className="key">연락처*</p>
          <span className="value">
            <input
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              placeholder="연락처를 입력하세요."
            />
          </span>
        </li>

        <li>
          <p className="key">이메일*</p>
          <span className="value">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요."
            />
          </span>
        </li>

        <li>
          <p className="key">사용여부*</p>
          <button
            className="useBtn"
            onClick={() => setActive(!active)}
            style={{
              color: active ? "#fff" : "#636D73",
              background: active ? "#2662F0" : "#DCE2E8",
            }}
          >
            <span style={{ marginLeft: active ? "48px" : 0 }} />
            {active && <p className="on btnText">ON</p>}
            {!active && <p className="off btnText">OFF</p>}
          </button>
        </li>

        <li>
          <p className="key">사용자 그룹*</p>
          <span className="value">
            <button
              className="selectBtn"
              onClick={() => setGroupPopup(!groupPopup)}
            >
              {group ? group : "Select"}
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

        <div className="enrollBtnBox">
          <button
            className="enrollBtn"
            disabled={!(id && pw && nickname && phonenumber && email && group)}
            onClick={onClickEnrollBtn}
          >
            관리자 등록
          </button>
        </div>
      </ul>
    </EnrollAdminPopupBox>
  );
}

const EnrollAdminPopupBox = styled.div`
  width: 756px;
  padding: 50px;
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
      cursor: pointer;
    }
  }

  .infoList {
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-top: 56px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .key {
        font-size: 16px;
        color: #464a53;
      }

      .value {
        display: flex;
        background: #6a707e00;
        border: 1px solid #dddfe1;
        border-radius: 2px;
        width: 458px;
        height: 45px;
        position: relative;

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
          width: 458px;
          background: #fff;
          position: absolute;
          top: 45px;
          font-size: 16px;

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

    .enrollBtnBox {
      display: flex;
      justify-content: flex-end;

      .enrollBtn {
        width: 458px;
        height: 45px;
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

export default connect(mapStateToProps, mapDispatchToProps)(EnrollAdminPopup);

const groupList = ["최고관리자", "일반관리자", "기타관리자"];
