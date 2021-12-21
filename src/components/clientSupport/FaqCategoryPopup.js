import { connect } from "react-redux";
import styled from "styled-components";

import I_x from "../../img/icon/I_x.png";
import I_minusRed from "../../img/icon/I_minusRed.png";
import I_plusBlue from "../../img/icon/I_plusBlue.png";

import { setAllPopupOff } from "../../util/store";
import { useState } from "react";

function EnrollItemPopup({ store, categoryData, setAllPopupOff }) {
  const [newCategory, setNewCategory] = useState("");
  const [categoryList, setCategoryList] = useState(categoryData);

  function addCategory() {
    if (!newCategory) return;

    let categoryArray = [...categoryList, newCategory];

    setNewCategory("");
    setCategoryList(categoryArray);
  }

  return (
    <EnrollItemPopupBox>
      <div className="titleBar">
        <strong className="title">공지 분류 관리</strong>
        <img src={I_x} alt="" onClick={setAllPopupOff} />
      </div>
      <div className="scrollBox">
        <ul className="categoryList">
          {categoryList.map((category, index) => (
            <li key={index}>
              {category}
              <button className="editBtn" onClick={() => {}}>
                <img src={I_minusRed} alt="" />
              </button>
            </li>
          ))}

          <li>
            <input
              className="newCategory"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="분류 제목을 입력하세요."
            />

            <button className="editBtn" onClick={addCategory}>
              <img src={I_plusBlue} alt="" />
            </button>
          </li>
        </ul>

        <button className="saveBtn" onClick={() => {}}>
          저장
        </button>
      </div>
    </EnrollItemPopupBox>
  );
}

const EnrollItemPopupBox = styled.div`
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

  .categoryList {
    margin-top: 56px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 54px;
      font-size: 16px;
      color: #636d73;
      border-bottom: 1px solid #dddfe1;

      input {
        color: #636d73;
        font-size: 16px;

        &::placeholder {
          color: #abafb3;
        }
      }

      .editBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        border: 1px solid #f1f5f8;
        border-radius: 50%;
        box-shadow: 1.5px 2.6px 10px rgba(119, 119, 119, 0.1);
      }
    }
  }

  .saveBtn {
    width: 100%;
    height: 46px;
    margin-top: 100px;
    border-radius: 8px;
    font-size: 16px;
    color: #fff;
    background: #2662f0;
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
