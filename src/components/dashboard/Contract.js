import { connect } from "react-redux";
import styled from "styled-components";

function Contarct({ store }) {
  return (
    <ContarctBox>
      <div className="topBar">
        <div className="btnBox">
          <button className="readBtn" onClick={() => {}}>
            Read Contract
          </button>
          <button className="writeBtn" onClick={() => {}}>
            Write Contract
          </button>
        </div>
      </div>
    </ContarctBox>
  );
}

const ContarctBox = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 470px;
  padding: 12px;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .btnBox {
      display: flex;
      gap: 12px;

      button {
        width: 108px;
        height: 30px;
        border-radius: 4px;

        &.readBtn {
          text-transform: capitalize;
          color: #fff;
          background: #77838f;
        }

        &.writeBtn {
          color: #77838f;
          border: 1px solid #d5dae2;
        }
      }
    }
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Contarct);
