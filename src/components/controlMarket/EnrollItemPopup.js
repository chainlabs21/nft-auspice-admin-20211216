import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import I_x from "../../img/icon/I_x.png";
import I_dnPolygonGray from "../../img/icon/I_dnPolygonGray.png";
import I_tagGray from "../../img/icon/I_tagGray.png";
import I_tagBlue from "../../img/icon/I_tagBlue.png";
import I_clockGray from "../../img/icon/I_clockGray.png";
import I_clockBlue from "../../img/icon/I_clockBlue.png";
import I_chartGray from "../../img/icon/I_chartGray.png";
import I_chartBlue from "../../img/icon/I_chartBlue.png";

import { setAllPopupOff } from "../../util/store";

function EnrollItemPopup({ store, setAllPopupOff }) {
  const formData = new FormData();

  const [selectMarket, setSelectMarket] = useState("");
  const [toggleSelectMarket, setToggleSelectMarket] = useState(false);

  const [selectMethod, setSelectMethod] = useState(0);

  const [selectToken, setSelectToken] = useState("");
  const [toggleSelectToken, setToggleSelectToken] = useState(false);

  const [price, setPrice] = useState("");
  const [royalty, setRoyalty] = useState("");

  const [selectCategory, setSelectCategory] = useState("");
  const [toggleSelectCategory, setToggleSelectCategory] = useState(false);

  const [itemtitle, setItemTitle] = useState("");
  const [description, setDescription] = useState("");

  const [uploadFileName, setUploadFileName] = useState("");

  function onClickSelectMarket(market) {
    setSelectMarket(market);
    setToggleSelectMarket(false);
  }

  function onClickSelectToken(token) {
    setSelectToken(token);
    setToggleSelectToken(false);
  }

  function onClickSelectCategory(category) {
    setSelectCategory(category);
    setToggleSelectCategory(false);
  }

  function onClickPopupBg() {
    setToggleSelectMarket(false);
    setToggleSelectToken(false);
    setToggleSelectCategory(false);
  }

  function OnChangeProfImgFile(file) {
    if (file.size >= 10 * 1024 * 1024) return;
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/gif"
    )
      return;

    setUploadFileName(file.name);
    formData.append("file", file);
  }

  function onClickEnrollBtn() {
    setAllPopupOff();
  }

  return (
    <EnrollItemPopupBox>
      <div className="titleBar">
        <strong className="title">아이템 등록</strong>
        <img src={I_x} alt="" onClick={setAllPopupOff} />
      </div>
      <div className="scrollBox">
        <ul className="infoList">
          <li>
            <span className="key">판매 마켓</span>
            <span className="value">
              <button
                className="selectBtn"
                style={{ color: !selectMarket && "#ABAFB3" }}
                onClick={() => setToggleSelectMarket(true)}
              >
                {selectMarket ? selectMarket : "마켓 선택"}
                <img src={I_dnPolygonGray} alt="" />
              </button>

              {toggleSelectMarket && (
                <ul className="marketPopup selectPopup">
                  {commonList.map((market, index) => (
                    <li
                      key={index}
                      style={{ color: market === selectMarket && "#2662F0" }}
                      onClick={() => onClickSelectMarket(market)}
                    >
                      {market}
                    </li>
                  ))}
                </ul>
              )}
            </span>
          </li>

          <li className="methodBox">
            <span className="key">판매 방식</span>
            <span className="value">
              <button
                className="commonBtn"
                style={{
                  color: selectMethod === 0 && "#2662F0",
                  borderColor: selectMethod === 0 && "#2662F0",
                }}
                onClick={() => setSelectMethod(0)}
              >
                <img src={selectMethod === 0 ? I_tagBlue : I_tagGray} alt="" />{" "}
                일반 판매
              </button>
              <button
                className="bidBtn"
                style={{
                  color: selectMethod === 1 && "#2662F0",
                  borderColor: selectMethod === 1 && "#2662F0",
                }}
                onClick={() => setSelectMethod(1)}
              >
                <img
                  src={selectMethod === 1 ? I_clockBlue : I_clockGray}
                  alt=""
                />
                경매
              </button>
              <button
                className="divisionBtn"
                style={{
                  color: selectMethod === 2 && "#2662F0",
                  borderColor: selectMethod === 2 && "#2662F0",
                }}
                onClick={() => setSelectMethod(2)}
              >
                <img
                  src={selectMethod === 2 ? I_chartBlue : I_chartGray}
                  alt=""
                />
                분할 판매
              </button>
            </span>
          </li>

          <li>
            <span className="key">결제 토큰</span>
            <span className="value">
              <button
                className="selectBtn"
                style={{ color: !selectToken && "#ABAFB3" }}
                onClick={() => setToggleSelectToken(true)}
              >
                {selectToken ? selectToken : "결제 토큰 선택"}
                <img src={I_dnPolygonGray} alt="" />
              </button>

              {toggleSelectToken && (
                <ul className="tokenPopup selectPopup">
                  {commonList.map((token, index) => (
                    <li
                      key={index}
                      style={{ color: token === selectToken && "#2662F0" }}
                      onClick={() => onClickSelectToken(token)}
                    >
                      {token}
                    </li>
                  ))}
                </ul>
              )}
            </span>
          </li>

          <li className="priceBox">
            <span className="key">금액</span>
            <input
              className="value"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
            />
          </li>

          <li className="royaltyBox">
            <span className="key">로열티</span>
            <span className="value">
              <input
                value={royalty}
                onChange={(e) => setRoyalty(e.target.value)}
                placeholder="0"
              />
              %
            </span>
          </li>

          <li>
            <span className="key">카테고리</span>
            <span className="value">
              <button
                className="selectBtn"
                style={{ color: !selectCategory && "#ABAFB3" }}
                onClick={() => setToggleSelectCategory(true)}
              >
                {selectCategory ? selectCategory : "카테고리 선택"}
                <img src={I_dnPolygonGray} alt="" />
              </button>

              {toggleSelectCategory && (
                <ul className="tokenPopup selectPopup">
                  {commonList.map((category, index) => (
                    <li
                      key={index}
                      style={{
                        color: category === selectCategory && "#2662F0",
                      }}
                      onClick={() => onClickSelectCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </span>
          </li>

          <li className="itemTitleBox">
            <span className="key">아이템 제목</span>
            <input
              className="value"
              value={itemtitle}
              onChange={(e) => setItemTitle(e.target.value)}
              placeholder="아이템 제목을 입력하세요."
            />
          </li>

          <li className="descriptionBox">
            <span className="key">아이템 소개</span>
            <textarea
              className="value"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="아이템 소개글을 입력하세요."
            />
          </li>

          <li className="uloadBox">
            <span className="key">아이템 소개</span>
            <span className="value">
              <p style={{ color: !uploadFileName && "#ABAFB3" }}>
                {uploadFileName ? uploadFileName : "아이템을 업로드 하세요."}
              </p>
              <label htmlFor="UploadInput">파일 첨부</label>
            </span>
          </li>

          <li className="btnBox">
            <span className="key"></span>
            <button
              className="enrollBtn"
              disabled={
                !(
                  selectMarket &&
                  selectToken &&
                  price &&
                  royalty &&
                  selectCategory &&
                  itemtitle &&
                  description &&
                  uploadFileName
                )
              }
              onClick={onClickEnrollBtn}
            >
              등록
            </button>
          </li>
        </ul>
      </div>

      {(toggleSelectMarket || toggleSelectToken || toggleSelectCategory) && (
        <div className="popupBg" onClick={onClickPopupBg} />
      )}

      <input
        id="UploadInput"
        type="file"
        onChange={(e) => OnChangeProfImgFile(e.target.files[0])}
      />
    </EnrollItemPopupBox>
  );
}

const EnrollItemPopupBox = styled.div`
  width: 756px;
  height: 800px;
  padding: 40px;
  background: #fff;
  box-shadow: 2px 3px 10px #7777771a;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;
  display: flex;
  flex-direction: column;

  .titleBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;
    line-height: 30px;
    color: #464a53;

    img {
      cursor: pointer;
    }
  }

  .infoList {
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 650px;
    margin-top: 58px;
    padding-bottom: 30px;
    font-size: 16px;
    overflow-y: scroll;

    input::placeholder {
      font-size: 16px;
      color: #abafb3;
    }

    button {
      font-size: 16px;
    }

    li {
      display: flex;
      align-items: center;

      .key {
        width: 152px;
        color: #464a53;
      }

      .value {
        flex: 1;
        height: 52px;
        background: #6a707e00;
        border: 1px solid #dddfe1;
        border-radius: 2px;
        position: relative;

        .selectBtn {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 16px;
          padding-right: 28px;
          width: 100%;
          height: 100%;
        }

        .selectPopup {
          width: 100%;
          padding: 10px 0;
          position: absolute;
          border: 1px solid #bbcdd9;
          background: #fff;
          border-radius: 5px;
          color: #414d55;
          z-index: 6;

          li {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-right: 28px;
            height: 40px;
            cursor: pointer;

            &:hover {
              background: #fafbfd;
            }
          }
        }
      }

      &.methodBox {
        .value {
          display: flex;
          justify-content: space-between;
          border: unset;

          button {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 6px;
            border: 1px solid #dddfe1;
            border-radius: 2px;
            width: 143px;
            height: 52px;
            font-size: 16px;
            line-height: 16px;
            color: #abafb3;
          }
        }
      }

      &.priceBox {
        .value {
          text-align: end;
          padding-right: 54px;
        }
      }

      &.royaltyBox {
        .value {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 10px;
          text-align: end;
          padding-right: 28px;
          color: #abafb3;

          input {
            width: 100%;
            text-align: end;
          }
        }
      }

      &.itemTitleBox {
        .value {
          padding-left: 15px;
        }
      }

      &.descriptionBox {
        align-items: flex-start;

        .key {
          margin-top: 15px;
        }

        .value {
          height: 156px;
          padding: 14px;
          font-size: 16px;

          &::placeholder {
            color: #abafb3;
          }
        }
      }

      &.uloadBox {
        .value {
          display: flex;
          overflow: hidden;

          p {
            display: flex;
            align-items: center;
            width: 100%;
            padding-left: 15px;
          }

          label {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 106px;
            height: 100%;
            color: #2662f0;
            background: #2662f00d;
            border: 1px solid #2662f0;
          }
        }
      }

      &.btnBox {
        margin-top: 46px;

        .enrollBtn {
          flex: 1;
          height: 45px;
          background: #2662f0;
          box-shadow: 0px 1px 8px #2662f066;
          border-radius: 8px;
          color: #fff;
          font-size: 16px;

          &:disabled {
            color: #636d73;
            background: #dce2e8;
            box-shadow: unset;
          }
        }
      }
    }
  }

  .popupBg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
  }

  #UploadInput {
    width: 0;
    height: 0;
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

export default connect(mapStateToProps, mapDispatchToProps)(EnrollItemPopup);

const commonList = ["abc", "def", "ghi", "jkl"];
