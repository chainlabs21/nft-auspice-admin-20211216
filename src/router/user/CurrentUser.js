import { connect } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
// import { setAllPopupOff, setMHeaderPopup } from "./util/store";

function CurrentUser({ store }) {
  const navigate = useNavigate();

  return (
    <CurrentUserBox id="CurrentUser">
      <strong className="title">회원현황</strong>

      <section className="contBox">
        <article className="topBar">
          <div className="leftBox"></div>

          <div className="rightBox">
            <div className="limitBox"></div>
          </div>
        </article>
      </section>
    </CurrentUserBox>
  );
}

const CurrentUserBox = styled.div`
  padding: 20px;

  .title {
    font-size: 18px;
    color: #999;
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
