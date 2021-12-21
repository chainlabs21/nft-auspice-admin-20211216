import { connect } from "react-redux";
import styled from "styled-components";

import I_x from "../../img/icon/I_x.png";
import { putCommaAtPrice, displayTime } from "../../util/Util";
import { setAllPopupOff } from "../../util/store";

function EnrollAdminPopup({ store, setAllPopupOff }) {
  return (
    <EnrollAdminPopupBox>
      <div className="titleBar">
        <strong className="title">거래세부</strong>
        <img src={I_x} alt="" onClick={setAllPopupOff} />
      </div>

      <ul className="infoList">
        <li>
          <span className="key">거래일시</span>
          <span className="value">
            {displayTime([2021, 10, 13, 15, 45, 44], 6)}
          </span>
        </li>

        <li>
          <span className="key">마켓</span>
          <span className="value">FANC 마켓</span>
        </li>

        <li>
          <span className="key">마켓</span>
          <span className="value">FANC 마켓</span>
        </li>

        <li>
          <span className="key">구분</span>
          <span className="value">구매</span>
        </li>

        <li className="seller">
          <span className="key">판매자</span>
          <span className="value">nickname</span>
        </li>

        <li className="buyer">
          <span className="key">구매자</span>
          <span className="value">nickname</span>
        </li>

        <li>
          <span className="key">결제 토큰 및 금액</span>
          <span className="value">
            <p>{putCommaAtPrice(120)} FANC</p>
            <p>≈ {putCommaAtPrice(344000)} 원</p>
          </span>
        </li>

        <li className="itemTitle">
          <span className="key">아이템 제목</span>
          <span className="value">Item title here</span>
        </li>

        <li className="itemNum">
          <span className="key">아이템 고유번호</span>
          <span className="value">A20e9894566311</span>
        </li>

        <li className="itemNum">
          <span className="key">아이템 고유번호</span>
          <span className="value">0xcda72070excda72070e cda72070e</span>
        </li>
      </ul>
    </EnrollAdminPopupBox>
  );
}

const EnrollAdminPopupBox = styled.div`
  width: 756px;
  padding: 40px;
  background: #fff;
  box-shadow: 2px 3px 10px #7777771a;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;

  .titleBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;
    color: #464a53;

    img {
      cursor: pointer;
    }
  }

  .infoList {
    margin-top: 58px;
    margin-bottom: 80px;
    font-size: 16px;

    li {
      display: flex;
      align-items: center;
      height: 54px;
      border-bottom: 1px solid #dddfe1;

      .key {
        width: 202px;
        color: #636d73;
      }

      .value {
        color: #000;
        flex: 1;
        display: flex;
        justify-content: space-between;
        width: 458px;
      }

      &.itemTitle {
        .value {
          color: #2662f0;
        }
      }

      &.seller,
      &.buyer,
      &.itemNum {
        .value {
          flex: unset;
          width: unset;
          border-bottom: 1px solid #000;
        }
      }
    }
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setAllPopupOff: () => dispatch(setAllPopupOff()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnrollAdminPopup);
