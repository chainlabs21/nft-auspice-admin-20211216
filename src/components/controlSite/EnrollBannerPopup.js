import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import I_x from "../../img/icon/I_x.png";
import I_dnPolygonGray from "../../img/icon/I_dnPolygonGray.png";
import I_plusSky from "../../img/icon/I_plusSky.svg";

import { setAllPopupOff } from "../../util/store";
import SelectPopup from "../SelectPopup";
import { API } from "../../configs/api";
import axios from "axios";
import ReactDatePicker from "react-datepicker";

function EnrollBannerPopup({ store, setAllPopupOff }) {
  const formData = new FormData();

  const uploadInput = useRef();

  const [pos, setPos] = useState("");
  const [posPopup, setPosPopup] = useState(false);

  const [selectTerms, setSelectTerms] = useState("");
  const [termsPopup, setTermsPopup] = useState(false);

  const [terms, setTerms] = useState("");

  const [link, setLink] = useState("");

  const [pcFileData, setPcFileData] = useState("");
  const [mobileFileData, setMobileFileData] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [startDateText, setStartDateText] = useState(
    `${startDate.getFullYear()}-${
      startDate.getMonth() + 1
    }-${startDate.getDate()}`
  );
  const [endDate, setEndDate] = useState(new Date());
  const [endDateText, setEndDateText] = useState(
    `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`
  );

  useEffect(() => {
    if (selectTerms === "무기한") setTerms("");
  }, [selectTerms]);

  function onChangeStartDate(date) {
    setStartDate(date);

    setStartDateText(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
  }

  function onChangeEndDate(date) {
    setEndDate(date);

    setEndDateText(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
  }

  function onClickPopupBg() {
    setPosPopup(false);
    setTermsPopup(false);
  }

  function OnChangeProfImgFile(file) {
    if (file.size >= 10 * 1024 * 1024) return;
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpg" &&
      file.type !== "image/gif"
    )
      return;

    formData.append("file", file);
  }

  function enrollDisable() {
    if (!pos) return true;

    if (!selectTerms) return true;

    if (!link) return true;

    if (!(pcFileData || mobileFileData)) return true;

    return false;
  }

  function handleEventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e, type = "pc") {
    handleEventDefault(e);
    let file = e.dataTransfer.items[0].getAsFile();

    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      if (type === "pc") setPcFileData(reader.result);
      if (type === "mobile") setMobileFileData(reader.result);
    };

    formData.append("file", file);
  }

  function onClickEnrollBtn() {
    let isexposetimed = 0;

    if (selectTerms === "기간 설정") isexposetimed = 1;

    const data = {
      imagebase64_desktop: pcFileData,
      imagebase64_mobile: mobileFileData,
      position: pos,
      isexposetimed,
      exposedate0: startDateText,
      exposedate1: endDateText,
      url: link,
    };

    console.table(data);

    axios.post(`${API.API_POST_BANNERS_ENROLL}`, data).then((res) => {
      console.log(res);
    });

    window.location.reload();
    setAllPopupOff();
  }

  return (
    <EnrollBannerPopupBox
      onDragEnter={(e) => handleEventDefault(e)}
      onDrop={(e) => {
        handleEventDefault(e);
      }}
      onDragOver={(e) => {
        handleEventDefault(e);
      }}
    >
      <div className="titleBar">
        <strong className="title">배너 등록</strong>
        <img src={I_x} alt="" onClick={setAllPopupOff} />
      </div>

      <div className="scrollBox">
        <ul className="infoList">
          <li>
            <span className="key">배너 위치</span>
            <span className="value">
              <button
                className="selectBtn"
                style={{ color: !pos && "#ABAFB3" }}
                onClick={() => setPosPopup(true)}
              >
                {pos ? pos : "위치 선택"}
                <img src={I_dnPolygonGray} alt="" />
              </button>

              {posPopup && (
                <>
                  <SelectPopup
                    contList={commonList}
                    selectCont={pos}
                    setCont={setPos}
                    setContPopup={setPosPopup}
                  />
                  <div className="selectBg" />
                </>
              )}
            </span>
          </li>

          <li className="termsBox">
            <span className="key">노출 기간</span>
            <span className="value">
              <div className="btnBox">
                <button
                  className="selectBtn"
                  style={{ color: !selectTerms && "#ABAFB3" }}
                  onClick={() => setTermsPopup(true)}
                >
                  {selectTerms ? selectTerms : "선택"}
                  <img src={I_dnPolygonGray} alt="" />
                </button>
              </div>

              {selectTerms === "기간 설정" && (
                <div className="datePickerBox">
                  <span className="dateBox">
                    <ReactDatePicker
                      locale="ko"
                      selected={startDate}
                      onChange={(date) => onChangeStartDate(date)}
                      dateFormat="yyyy/MM/dd"
                    />
                  </span>
                  ~
                  <span className="dateBox">
                    <ReactDatePicker
                      locale="ko"
                      selected={endDate}
                      onChange={(date) => onChangeEndDate(date)}
                      dateFormat="yyyy/MM/dd"
                    />
                  </span>
                </div>
              )}

              {termsPopup && (
                <SelectPopup
                  contList={termsList}
                  selectCont={selectTerms}
                  setCont={setSelectTerms}
                  setContPopup={setTermsPopup}
                />
              )}
            </span>
          </li>

          <li className="linkBox">
            <span className="key">링크</span>
            <input
              className="value"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="링크를 입력하세요"
            />
          </li>

          <li className="uloadBox">
            <span className="key">파일 업로드</span>
            <span className="value">
              <span className="pcBox buttonBox">
                <button
                  htmlFor="UploadInput"
                  onDrop={(e) => handleDrop(e, "pc")}
                >
                  {pcFileData ? (
                    <img src={pcFileData} alt="" />
                  ) : (
                    <>
                      <span className="iconBox">
                        <img src={I_plusSky} alt="" />
                      </span>
                      Drag file to Upload
                    </>
                  )}
                </button>

                <p className="contTitle">PC 배너</p>
              </span>

              <span className="mobileBox buttonBox">
                <button
                  htmlFor="UploadInput"
                  onDrop={(e) => handleDrop(e, "mobile")}
                >
                  {mobileFileData ? (
                    <img src={mobileFileData} alt="" />
                  ) : (
                    <>
                      <span className="iconBox">
                        <img src={I_plusSky} alt="" />
                      </span>
                      Drag file to Upload
                    </>
                  )}
                </button>
                <p className="contTitle">모바일 배너</p>
              </span>

              <input
                ref={uploadInput}
                type="file"
                onChange={(e) => OnChangeProfImgFile(e.target.files[0])}
              />
            </span>
          </li>

          <li className="btnBox">
            <span className="key"></span>
            <button
              className="enrollBtn"
              disabled={enrollDisable()}
              onClick={onClickEnrollBtn}
            >
              등록
            </button>
          </li>
        </ul>
      </div>

      {(posPopup || termsPopup) && (
        <div className="popupBg" onClick={onClickPopupBg} />
      )}
    </EnrollBannerPopupBox>
  );
}

const EnrollBannerPopupBox = styled.div`
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
    margin-top: 30px;
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

      &.termsBox {
        .value {
          display: flex;
          flex-direction: column;
          gap: 24px;
          height: unset;
          border: unset;

          * {
            font-size: 16px;
          }

          .btnBox {
            display: flex;
            justify-content: flex-end;
            width: 100%;

            .selectBtn {
              width: 134px;
              height: 52px;
              border: 1px solid #dddfe1;
              border-radius: 2px;
            }
          }

          .datePickerBox {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 4px;
            height: 40px;

            .dateBox {
              display: flex;
              padding: 10px;
              align-items: center;
              text-align: end;
              border: 1px solid #dddfe1;

              input {
                text-align: end;
              }
            }
          }

          .selectPopup {
            width: 134px;
            top: 52px;
            right: 0;
          }
        }
      }

      &.linkBox {
        .value {
          text-align: end;
          padding-right: 54px;
        }
      }

      &.uloadBox {
        align-items: unset;
        .value {
          display: flex;
          justify-content: center;
          gap: 16px;
          height: unset;
          border: unset;
          position: relative;

          .buttonBox {
            display: flex;
            flex-direction: column;
            gap: 12px;
            text-align: center;

            button {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 26px;
              width: 240px;
              height: 240px;
              padding-top: 70px;
              color: #abafb3;
              font-size: 14px;
              border: 2px dashed #ccc;
              border-radius: 5px;

              .iconBox {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50px;
                height: 50px;
                border: 3px solid #a2c0d4;
                border-radius: 50%;
              }
            }

            .contTitle {
              font-size: 16px;
              color: #636d73;
            }
          }

          input {
            width: 0;
            height: 0;
            position: absolute;
          }
        }
      }

      &.btnBox {
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

  .nospace {
    width: 0;
    height: 0;
  }
  .popupBg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
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

export default connect(mapStateToProps, mapDispatchToProps)(EnrollBannerPopup);

const commonList = ["top", "right", "bottom", "left"];

const termsList = ["무기한", "기간 설정"];
