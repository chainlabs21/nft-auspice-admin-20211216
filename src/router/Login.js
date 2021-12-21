import { connect } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useState } from "react";
import { setLogin } from "../util/store";
import I_logo from "../img/icon/I_logo.png";
import I_chkWhite from "../img/icon/I_chkWhite.png";

function Login({ store, setLogin }) {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [check, setCheck] = useState(false);

  function onClickLogin() {
    navigate("/dashboard");
  }

  return (
    <LoginBox>
      <div className="innerBox">
        <div className="titleBox">
          <div className="logoBox">
            <img src={I_logo} alt="" />
            <span className="logoText">
              <strong className="gray">Logo</strong>
              <strong className="blue">here</strong>
            </span>
          </div>

          <p className="title">관리자</p>
        </div>

        <div className="inputBox">
          <div className="idBox">
            <p className="contTitle">Account ID*</p>
            <input
              placeholder="your account"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="pwBox">
            <p className="contTitle">Password*</p>
            <input
              type="password"
              placeholder="****************"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>

          <div className="keepBox">
            <button
              id="CheckBtn"
              className="checkBox"
              style={{ background: check && "#2662f0" }}
              onClick={() => setCheck(!check)}
            >
              <img src={I_chkWhite} alt="" />
            </button>
            <label htmlFor="CheckBtn" className="keepText">
              Keep me signed in
            </label>
          </div>

          <div className="btnBox">
            <button
              className="loginBtn"
              disabled={!(id && pw)}
              onClick={onClickLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </LoginBox>
  );
}

const LoginBox = styled.header`
  display: flex;
  margin: 0 auto;
  min-height: 100vh;
  padding: 200px 0 100px 0;
  justify-content: center;

  .innerBox {
    width: 576px;
    padding: 80px 68px 110px 68px;
    background: #fff;

    .titleBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 26px;

      .logoBox {
        display: flex;
        align-items: center;
        gap: 7px;
        font-family: "Rubik", sans-serif;

        .logoText {
          display: flex;
          font-size: 32px;

          .gray {
            color: #414d55;
          }
          .blue {
            color: #2662f0;
          }
        }
      }

      .title {
        font-size: 16px;
        color: #686e7c;
      }
    }

    .inputBox {
      margin-top: 70px;

      .idBox,
      .pwBox {
        display: flex;
        flex-direction: column;
        gap: 5px;

        &.pwBox {
          margin-top: 18px;
        }

        .contTitle {
          color: #686e7c;
          font-size: 16px;
        }

        input {
          width: 440px;
          height: 52px;
          border: 1px solid #dddfe1;
          padding: 0 16px;
          font-size: 15px;
          color: #686e7c;

          &::placeholder {
            color: #abafb3;
          }
        }
      }

      .keepBox {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-top: 10px;

        .checkBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 18px;
          height: 18px;
          border: 1px solid #dddfe1;
          border-radius: 3px;

          img {
            width: 14px;
            object-fit: cover;
          }
        }

        .keepText {
          font-size: 12px;
          color: #abafb3;
        }
      }

      .btnBox {
        display: flex;
        justify-content: center;
        margin-top: 38px;

        .loginBtn {
          width: 242px;
          height: 48px;
          font-size: 18px;
          color: #fff;
          background: #2662f0;
          border-radius: 24px;

          &:disabled {
            background: #abafb3;
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
    setLogin: () => dispatch(setLogin()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
