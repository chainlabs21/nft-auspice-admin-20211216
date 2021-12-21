import { useEffect } from "react";
import { connect } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./components/globalStyle";
import BottomBar from "./router/BottomBar";
import Send from "./router/page/Send";
import Dashboard from "./router/page/Dashboards";
import Header from "./router/Header";
import LeftBar from "./router/LeftBar";
import Login from "./router/Login";
import RouterListen from "./util/RouterListen";
import { setConnect, setHref } from "./util/store";
import SendBlock from "./router/page/SendBlock";
import Incineration from "./router/page/Incineration";
import Pause from "./router/page/Pause";
import Lock from "./router/page/Lock";
import TimeLock from "./router/page/TimeLock";
import Auth from "./router/page/Auth";

function App({ store, setHref, setConnect }) {
  return (
    <AppBox
      className="appBox"
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
        rel="stylesheet"
        type="text/css"
      />

      <GlobalStyle />
      <HashRouter>
        <RouterListen />
        <Header />
        <LeftBar />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/:address" element={<Dashboard />} />
          <Route path="/send/:address" element={<Send />} />
          <Route path="/sendblock/:address" element={<SendBlock />} />
          <Route path="/incineration/:address" element={<Incineration />} />
          <Route path="/pause/:address" element={<Pause />} />
          <Route path="/lock/:address" element={<Lock />} />
          <Route path="/timelock/:address" element={<TimeLock />} />
          <Route path="/auth/:address" element={<Auth />} />
        </Routes>

        <BottomBar />
      </HashRouter>
    </AppBox>
  );
}

const AppBox = styled.div`
  display: flex;
  background: #f3f6f9;
  position: relative;
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setHref: (href) => dispatch(setHref(href)),
    setConnect: (walletId) => dispatch(setConnect(walletId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

const installMetaMaskUrl =
  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
