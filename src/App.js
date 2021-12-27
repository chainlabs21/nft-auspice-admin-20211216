import { connect } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./components/globalStyle";
import NavBar from "./NavBar";
import DashBoard from "./router/common/DashBoard";
import CurrentUser from "./router/user/CurrentUser";

function App({ store, setHref, setConnect }) {
  return (
    <AppBox
      className="appBox"
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
      }}
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
        <NavBar />

        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/currentuser" element={<CurrentUser />} />
        </Routes>
      </HashRouter>
    </AppBox>
  );
}

const AppBox = styled.div`
  padding: 0 0 0 200px;
  background: #e9eff7;
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
