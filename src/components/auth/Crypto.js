import { connect } from "react-redux";
import styled from "styled-components";
import I_chk from "../../img/icon/I_chk.svg";
import I_plus from "../../img/icon/I_plus.svg";
import { setEnrollCryptoPopup } from "../../util/store";
import PopupBg from "../PopupBg";
import EnrollCentralPopup from "./EnrollCentralPopup";
import EnrollCryptoPopup from "./EnrollCryptoPopup";

function Crypto({ store, setEnrollCryptoPopup }) {

  return (
    <CryptoBox>
      <div className="topBar">
        <img src={I_plus} alt="" onClick={setEnrollCryptoPopup} />
      </div>

      <article className="listBox">
        <ul className="listHeader">
          {listHeader.map((cont, index) => (
            <li key={index}>{cont}</li>
          ))}
        </ul>

        <ul className="dataList">
          {dataList.map((cont, index) => (
            <li key={index}>
              <span>{index + 1}</span>

              <span>
                <p className="address">{cont.id}</p>
              </span>

              <span>
                <button className="chkBtn" onClick={() => {}}>
                  <img src={I_chk} alt="" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      </article>

      {store.enrollCryptoPopup && (
        <>
          <EnrollCryptoPopup />
          <PopupBg />
        </>
      )}
    </CryptoBox>
  );
}

const CryptoBox = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 560px;
  min-height: 400px;
  padding: 12px;
  margin: 20px 0 0 0;

  .topBar {
    display: flex;
    justify-content: flex-end;

    img {
      cursor: pointer;
    }
  }

  .listBox {
    .listHeader {
      display: flex;
      align-items: center;
      height: 42px;
      font-weight: 600;
      font-size: 14px;
      background: #eaf4fb;
      border-top: 1px solid #eee;

      li {
        &:nth-of-type(3) {
          display: flex;
          align-items: center;
          gap: 4px;

          .infoImg {
            width: 12px;
          }
        }

        &:nth-of-type(4) {
          color: #3498db;
        }
      }
    }

    .dataList {
      border-top: 2px solid #eee;

      li {
        display: flex;
        align-items: center;
        height: 48px;
        font-size: 14px;

        &:nth-of-type(n + 2) {
          border-top: 1px solid #eee;
        }

        .address {
          width: 170px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .chkBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          border: 2px solid #aaa;
        }

        span {
          &:nth-of-type(1) {
            .moreBtn {
              width: 20px;
              height: 20px;
              border-radius: 4px;
              background: #f1f2f4;

              &:hover {
                background: rgb(120, 131, 143);
              }

              img {
                width: 12px;
              }
            }
          }

          &:nth-of-type(2) {
            color: #3498db;
          }

          &:nth-of-type(3) {
            .methodBox {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 68px;
              height: 24px;
              font-size: 11px;
              font-weight: 500;
              text-transform: capitalize;
              background: #eaf4fb;
              border-radius: 8px;
            }
          }

          &:nth-of-type(5) {
            color: #3498db;
          }

          &:nth-of-type(6) {
            .arrowBox {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #e5f9f6;

              img {
                width: 12px;
              }
            }
          }

          &:nth-of-type(7) {
            color: #3498db;
          }
        }
      }
    }

    .listHeader li,
    .dataList li > span {
      &:nth-of-type(1) {
        width: 140px;
      }

      &:nth-of-type(2) {
        width: 264px;
      }

      &:nth-of-type(3) {
        flex: 1;
      }
    }
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setEnrollCryptoPopup: () => dispatch(setEnrollCryptoPopup()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Crypto);

const listHeader = ["*번호", "아이디", "비활성화 하기"];

const dataList = [
  {
    id: "admin_xyz",
  },
  {
    id: "admin_abc",
  },
  {
    id: "administrator_1",
  },
];
