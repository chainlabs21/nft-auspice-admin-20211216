import { Fragment } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";

function LeftBar({ store }) {
  const navigate = useNavigate();

  if (store.href)
    return (
      <LeftBarBox>
        <ul className="categoryList">
          <ul className="contList">
            <li
              style={{
                borderLeft: store.href === "dashboard" && "3px solid #2662F0",
                color: store.href === "dashboard" && "#2662F0",
              }}
              onClick={() => navigate(`/dashboard/${store.address}`)}
            >
              대시보드
            </li>

            <li
              style={{
                borderLeft: store.href === "send" && "3px solid #2662F0",
                color: store.href === "send" && "#2662F0",
              }}
              onClick={() => navigate(`/send/${store.address}`)}
            >
              전송
            </li>

            <li
              style={{
                borderLeft: store.href === "sendblock" && "3px solid #2662F0",
                color: store.href === "sendblock" && "#2662F0",
              }}
              onClick={() => navigate(`/sendblock/${store.address}`)}
            >
              대량전송
            </li>

            <li
              style={{
                borderLeft:
                  store.href === "incineration" && "3px solid #2662F0",
                color: store.href === "incineration" && "#2662F0",
              }}
              onClick={() => navigate(`/incineration/${store.address}`)}
            >
              소각
            </li>

            <li
              style={{
                borderLeft: store.href === "pause" && "3px solid #2662F0",
                color: store.href === "pause" && "#2662F0",
              }}
              onClick={() => navigate(`/pause/${store.address}`)}
            >
              정지/정상운영
            </li>

            <li
              style={{
                borderLeft: store.href === "lock" && "3px solid #2662F0",
                color: store.href === "lock" && "#2662F0",
              }}
              onClick={() => navigate(`/lock/${store.address}`)}
            >
              락
            </li>

            <li
              style={{
                borderLeft: store.href === "timelock" && "3px solid #2662F0",
                color: store.href === "timelock" && "#2662F0",
              }}
              onClick={() => navigate(`/timelock/${store.address}`)}
            >
              타임락
            </li>

            <li
              style={{
                borderLeft: store.href === "auth" && "3px solid #2662F0",
                color: store.href === "auth" && "#2662F0",
              }}
              onClick={() => navigate(`/auth/${store.address}`)}
            >
              계정설정
            </li>
          </ul>
        </ul>
      </LeftBarBox>
    );
  else return <Fragment />;
}

const LeftBarBox = styled.div`
  z-index: 3;
  position: relative;
  width: 300px;
  min-width: 300px;
  height: 100vh;

  .categoryList {
    display: flex;
    flex-direction: column;
    gap: 44px;
    position: fixed;
    top: 100px;
    bottom: 0;
    left: 0;
    width: 300px;
    padding: 54px 0 120px 0;
    background: #f3f6f9;
    overflow-y: scroll;

    .categoryTitle {
      font-size: 14px;
      color: #a2c0d4;
      padding-left: 44px;
    }

    .contList {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 16px;
      font-size: 16px;
      color: #636d73;

      li {
        padding-left: 44px;
        cursor: pointer;
      }
    }
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    // setLeftBarPopup: () => dispatch(setLeftBarPopup()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);
