import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
// import { setAllPopupOff, setMHeaderPopup } from "./util/store";

function NavBar({ store }) {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  return (
    <NavBox id="Nav">
      <ul className="common">
        <strong>일반</strong>
        <li
          style={{ background: path === "/" && "#d8d8d8" }}
          onClick={() => navigate("/")}
        >
          대시보드
        </li>
      </ul>

      <ul className="user">
        <strong>회원</strong>
        <li
          style={{ background: path.indexOf("currentuser") > -1 && "#d8d8d8" }}
          onClick={() => navigate("/currentuser")}
        >
          회원현황
        </li>
        <li>회원상세</li>
      </ul>

      <ul className="market">
        <strong>마켓관리</strong>
        <li>ITEM 현황</li>
        <li>Minting Inspection</li>
        <li>마켓카테고리관리</li>
      </ul>

      <ul className="statis">
        <strong>통계</strong>
        <li>통계현황</li>
        <li>통계상세</li>
        <li>랭킹</li>
      </ul>

      <ul className="support">
        <strong>고객지원</strong>
        <li>공지사항</li>
        <li>FAQ</li>
      </ul>

      <ul className="setting">
        <strong>설정</strong>
        <li>운영설정</li>
      </ul>

      <ul className="system">
        <strong>시스템</strong>
        <li>시스템 계정</li>
      </ul>
    </NavBox>
  );
}

const NavBox = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 60px;
  width: 200px;
  padding: 10 0;
  border-right: 1px solid #aaa;
  top: 0;
  bottom: 0;
  left: 0;
  background: #e9eff7;
  position: fixed;

  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;

    * {
      height: 32px;
      padding: 0 0 0 20px;
      line-height: 32px;
    }

    li {
      cursor: pointer;
    }
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    // setAllPopupOff: () => dispatch(setAllPopupOff()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
