import { connect } from "react-redux";
import styled from "styled-components";

function BottomBar({ store }) {
  return (
    <BottomBarBox>
      <p>Copyright &copy; 2021. All Rights Reserved.</p>
    </BottomBarBox>
  );
}

const BottomBarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100vw;
  min-width: 1360px;
  height: 70px;
  background: #414d55;
  z-index: 4;

  p {
    font-size: 14px;
    color: #abafb3;
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    // setBottomBarPopup: () => dispatch(setBottomBarPopup()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);
