import { connect } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
// import { setAllPopupOff, setMHeaderPopup } from "./util/store";

function DashBoard({ store }) {
  const navigate = useNavigate();

  return <DashBoardBox id="DashBoard"></DashBoardBox>;
}

const DashBoardBox = styled.div`
  background: #fff;
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    // setAllPopupOff: () => dispatch(setAllPopupOff()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
