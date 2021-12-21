import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { setAllPopupOff } from "../util/store";

function PopupBg({ store, setAllPopupOff, bg, off }) {
  function onClickBg() {
    setAllPopupOff();
    if (off) off();
  }

  return (
    <PopupBgBox
      onClick={onClickBg}
      style={{ background: bg && "rgba(65,77,85,0.35" }}
    />
  );
}

const PopupBgBox = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 5;
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setAllPopupOff: () => dispatch(setAllPopupOff()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupBg);
