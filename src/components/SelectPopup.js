import { connect } from "react-redux";
import styled from "styled-components";

function SortPopup({ store, contList, selectCont, setCont, setContPopup }) {
  function onClickSetSort(data) {
    setCont(data);
    setContPopup(false);
  }

  return (
    <SortPopupBox className="selectPopup">
      {contList.map((cont, index) => (
        <li
          key={index}
          style={{ color: selectCont === cont && "#2662F0" }}
          onClick={() => onClickSetSort(cont)}
        >
          {cont}
        </li>
      ))}
    </SortPopupBox>
  );
}

const SortPopupBox = styled.ul`
  padding: 10px 0;
  position: absolute;
  border: 1px solid #bbcdd9;
  background: #fff;
  border-radius: 5px;
  color: #414d55;
  z-index: 6;

  li {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 12px;

    &:hover {
      background: #fafbfd;
      cursor: pointer;
    }
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    // setEnrollItemPopup: () => dispatch(setEnrollItemPopup()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SortPopup);
