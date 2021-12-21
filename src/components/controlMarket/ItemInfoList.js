import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { displayTime } from "../../util/Util";
import I_dnPolygonGray from "../../img/icon/I_dnPolygonGray.png";

function ItemInfoList({ store }) {
  const [category, setCategory] = useState("예술");
  const [toggle, setToggle] = useState(false);
  const [togglecategoryPopup, setTogglecategoryPopup] = useState(false);

  function onClickCopy(data) {
    const textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = data;

    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }

  function onClickCategory(data) {
    setCategory(data);
    setTogglecategoryPopup(false);
  }

  return (
    <ItemInfoListBox>
      <div className="topBar">
        <div className="titleBox">
          <strong className="subtitle">아이템 정보 확인</strong>
          &gt;
          <u className="target">Item title here</u>
        </div>

        <div className="btnBox">
          <button className="hideBtn" onClick={() => {}}>
            아이템 감추기
          </button>
          <button className="saveBtn" onClick={() => {}}>
            수정사항 저장
          </button>
        </div>
      </div>

      <ul className="infoList">
        <li>
          <span className="key">아이디</span>
          <span className="value">itismyaccount</span>
          <span className="key">게시자</span>
          <span className="value">
            3D2oetdNuZUqQHPJmcMDDHY123123
            <button
              className="copyBtn"
              onClick={() => onClickCopy("3D2oetdNuZUqQHPJmcMDDHY123123")}
            >
              복사
            </button>
          </span>
        </li>

        <li>
          <span className="key">아이템 고유 번호</span>
          <span className="value">A20e9894566311</span>
          <span className="key">Txid</span>
          <span className="value">
            sdfiu2etdNuZUqSDIFd9usdknDHFIdjflsdf30
            <button
              className="copyBtn"
              onClick={() =>
                onClickCopy("sdfiu2etdNuZUqSDIFd9usdknDHFIdjflsdf30")
              }
            >
              복사
            </button>
          </span>
        </li>

        <li>
          <span className="key">판매방식</span>
          <span className="value">경매</span>
          <span className="key">업로드 일시</span>
          <span className="value">
            {displayTime([2021, 10, 10, 14, 23, 11], 6)}
          </span>
        </li>

        <li>
          <span className="key">시작일</span>
          <span className="value">
            {displayTime([2021, 10, 10, 14, 23, 11], 6)}
          </span>
          <span className="key">종료일</span>
          <span className="value">
            {displayTime([2021, 10, 10, 14, 23, 11], 6)}
          </span>
        </li>

        <li>
          <span className="key">결제토큰</span>
          <span className="value">이더리움&#40;ETH&#41;</span>
          <span className="key">상태</span>
          <span className="value status">진행중</span>
        </li>

        <li>
          <span className="key">카테고리</span>
          <span
            className="value selectBox"
            onClick={() => setTogglecategoryPopup(!togglecategoryPopup)}
          >
            {category} <img src={I_dnPolygonGray} alt="" />
            {togglecategoryPopup && (
              <>
                <div
                  className="PopupBg"
                  onClick={() => setTogglecategoryPopup(false)}
                />
                <ul className="categoryPopup">
                  {categoryPopup.map((categoryItem, index) => (
                    <li
                      key={index}
                      style={{
                        color: category === categoryItem && "#2662F0",
                      }}
                      onClick={() => onClickCategory(categoryItem)}
                    >
                      {categoryItem}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </span>
          <span className="key">아이템 확인</span>
          <span className="value">
            <u>background.png</u>
          </span>
        </li>

        <li>
          <span className="key">로열티</span>
          <span className="value">
            <p>20</p>
            <p>%</p>
          </span>
          <span className="key">소유자</span>
          <span className="value">
            <u>nicknames</u>
          </span>
        </li>

        <li>
          <span className="key">아이템 숨김</span>
          <span className="value">
            {toggle ? "ON" : "OFF"}

            <button
              className="toggleBtn"
              onClick={() => setToggle(!toggle)}
              style={{
                color: toggle ? "#fff" : "#636D73",
                background: toggle ? "#2662F0" : "#DCE2E8",
              }}
            >
              <span style={{ marginLeft: toggle ? "48px" : 0 }} />
              {toggle && <p className="on btnText">ON</p>}
              {!toggle && <p className="off btnText">OFF</p>}
            </button>
          </span>
          <span className="key">-</span>
          <span className="value">-</span>
        </li>
      </ul>
    </ItemInfoListBox>
  );
}

const ItemInfoListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 46px;

  .topBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;

    .titleBox {
      display: flex;
      align-items: flex-end;
      .subtitle {
        color: #414d55;
        font-size: 20px;
        margin-right: 14px;
      }

      .target {
        color: #2662f0;
        margin-left: 8px;
      }
    }

    .btnBox {
      display: flex;
      gap: 12px;
      border-radius: 5px;
      font-size: 16px;

      button {
        height: 40px;
      }

      .hideBtn {
        width: 136px;
        color: #414d55;
        border: 1px solid #bbcdd9;
        background: #fafbfd;
        border: 1px solid #bbcdd9;
      }

      .saveBtn {
        width: 122px;
        color: #fff;
        background: #2662f0;
      }
    }
  }

  .infoList {
    border: 1px solid #dddfe1;
    border-bottom: unset;
    font-size: 16px;

    & > li {
      display: flex;
      height: 60px;
      border-bottom: 1px solid #dddfe1;

      .key {
        justify-content: center;
        width: 220px;
        color: #464a53;
        background: #f7f7f7;
      }

      .value {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 490px;
        padding: 0 12px 0 42px;
      }

      span {
        display: flex;
        align-items: center;

        &.status {
          color: #2662f0;
        }

        &.selectBox {
          cursor: pointer;
          position: relative;

          .PopupBg {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }

          .categoryPopup {
            width: 100%;
            background: #fff;
            padding: 10px 0;
            position: absolute;
            top: 60px;
            left: 0;
            border: 1px solid #e0e0e2;
            border-radius: 5px;
            box-shadow: 0px 1px 15px #0000001a;
            z-index: 3;

            li {
              display: flex;
              align-items: center;
              height: 40px;
              padding-left: 42px;

              &:hover {
                background: #fafbfd;
              }
            }
          }
        }

        .copyBtn {
          width: 70px;
          height: 35px;
          color: #636d73;
          background: #f1f5f8;
          border: 1px solid #a2c0d4;
          border-radius: 3px;
          font-size: 16px;
        }

        .toggleBtn {
          display: flex;
          align-items: center;
          width: 86px;
          height: 38px;
          border-radius: 20px;
          padding: 2px;
          transition: all 0.4s;
          position: relative;
          font-size: 16px;

          span {
            display: inline-block;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: #fff;
            transition: all 0.4s;
          }

          .btnText {
            position: absolute;

            &.on {
              left: 10px;
            }

            &.off {
              right: 10px;
            }
          }
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
    // setEnrollAdminPopup: () => dispatch(setEnrollAdminPopup()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemInfoList);

const categoryPopup = ["예술", "abc", "def", "ghi", "jkl"];
