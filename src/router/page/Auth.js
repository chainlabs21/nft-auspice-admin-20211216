import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Central from "../../components/auth/Central";
import Crypto from "../../components/auth/Crypto";

function Auth({ store }) {
  const [category, setCategory] = useState(0);

  return (
    <AuthBox>
      <div className="innerBox">
        <section className="contBox">
          <article className="topBox">
            <ul className="categoryList">
              {categoryList.map((cont, index) => (
                <li
                  key={index}
                  style={{
                    color: category === index && "#3498db",
                    borderBottom: category === index && "2px solid #3498db",
                  }}
                  onClick={() => setCategory(index)}
                >
                  {cont}
                </li>
              ))}
            </ul>
          </article>

          {category === 0 && <Central />}
          {category === 1 && <Crypto />}
        </section>
      </div>
    </AuthBox>
  );
}

const AuthBox = styled.div`
  display: flex;
  padding: 100px 32px 556px 0;
  color: #4a4f55cc;

  .innerBox {
    padding: 20px 0 0 0;
    width: 1400px;

    .contBox {
      border-radius: 8px;
      background: #fff;

      .topBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 46px;
        border-bottom: 1px solid #eee;
        padding: 0 12px 0 0;

        .categoryList {
          display: flex;
          height: 100%;

          li {
            display: flex;
            align-items: center;
            width: 200px;
            height: 100%;
            padding: 0 12px;
            font-weight: 700;
            font-size: 16px;
            cursor: pointer;
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
    // setConnect: (walletId) => dispatch(setConnect(walletId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

const categoryList = ["중앙형", "Crypto"];
