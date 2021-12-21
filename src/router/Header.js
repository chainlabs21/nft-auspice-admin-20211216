import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import I_logo from "../img/icon/I_logo.png";
import I_klaytn from "../img/icon/I_klaytn.svg";
import I_metaMask from "../img/icon/I_metaMask.svg";
import SetErrorBar from "../util/SetErrorBar";
import { setConnect, setHeaderPopup, setLogin } from "../util/store";
import { strDot } from "../util/Util";
import { useEffect } from "react";

function Header({ store, setConnect }) {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  

  let pathArray = pathname.split("/");
  let pathAddress = pathArray[pathArray.length - 1];

  console.log(store.address);

  function onClickLogo() {
    if (store.isLogin) navigate("/dashboard");
    else navigate("/");
  }

  async function connectKaikas() {
    const { klaytn } = window;

    try {
      const accounts = await klaytn.enable();

      sessionStorage.setItem("wallet", "klaytn");
      sessionStorage.setItem("address", accounts[0]);

      SetErrorBar(`지갑이 연결되었습니다 - ${strDot(accounts[0], 6, 6)}`);
      setConnect(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  }

  async function connetMetaMask() {
    return new Promise((resolve, reject) => {
      let { ethereum } = window;

      if (ethereum) {
        ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => {
            sessionStorage.setItem("wallet", "metamask");
            sessionStorage.setItem("address", res[0]);

            SetErrorBar(`지갑이 연결되었습니다 - ${strDot(res[0], 6, 6)}`);
            setConnect(res[0]);
          })
          .catch((err) => SetErrorBar("지갑이 연결되지 않았습니다"));
      } else {
        SetErrorBar("지갑이 지원되지 않는 환경입니다");
        setTimeout(() => window.open(installMetaMaskUrl, "_blank"), 2000);
      }
    });
  }

  useEffect(() => {
    const address = sessionStorage.getItem("address");
    if (address) setConnect(address);
  }, []);

  return (
    <HeaderBox>
      <article className="logoBox" onClick={onClickLogo}>
        <img src={I_logo} alt="" />
        <span className="logoText">
          <strong className="gray">logo</strong>
          <strong className="blue">here</strong>
        </span>
      </article>

      {store.href && (
        <article className="addressBox">
          <div className="profBox">
            <span
              className="iconBox"
              style={{
                background: pathAddress === store.address && "#6aa84f",
              }}
            />
            <span
              className="addressBox"
              onClick={() => navigate(`/dashboard/${store.address}`)}
            >
              {strDot(store.address, 6, 6)}
            </span>
          </div>

          <span className="connectBox">
            <button className="kaikasBtn" onClick={connectKaikas}>
              <img src={I_klaytn} alt="" />
            </button>
            <button className="metaMaskBtn" onClick={connetMetaMask}>
              <img src={I_metaMask} alt="" />
            </button>
          </span>
        </article>
      )}
    </HeaderBox>
  );
}

const HeaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100vw;
  min-width: 1360px;
  height: 100px;
  padding: 0 40px;
  background: #fff;
  box-shadow: 0px 1px 8px #142e6e1a;
  z-index: 4;

  .logoBox {
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: "Rubik", sans-serif;
    cursor: pointer;

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

  .addressBox {
    display: flex;
    align-items: center;
    gap: 20px;

    .profBox {
      display: flex;
      align-items: center;
      gap: 8px;

      .iconBox {
        width: 30px;
        height: 30px;
        background: #f00;
        border: 1px solid #aaa;
        border-radius: 50%;
      }

      .addressBox {
        height: 36px;
        padding: 0 12px;
        border: 1px solid #aaa;
        border-radius: 4px;
        cursor: pointer;
      }
    }

    .connectBox {
      display: flex;
      gap: 20px;

      button {
        width: 60px;
        height: 60px;
      }
    }
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setHeaderPopup: () => dispatch(setHeaderPopup()),
    setLogin: () => dispatch(setLogin()),
    setConnect: (address) => dispatch(setConnect(address)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const installMetaMaskUrl =
  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
