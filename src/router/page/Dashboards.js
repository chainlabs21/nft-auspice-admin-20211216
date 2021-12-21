import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import I_eth from "../../img/icon/I_eth.svg";
import I_info from "../../img/icon/I_info.png";
import I_copy from "../../img/icon/I_copy.svg";
import I_search from "../../img/icon/I_search.svg";
import Transfers from "../../components/dashboard/Transfers";
import Holders from "../../components/dashboard/Holders";
import Contract from "../../components/dashboard/Contract";

function DashBoards({ store }) {
  const [category, setCategory] = useState(0);

  return (
    <DashBoardsBox>
      <div className="innerBox">
        <section className="titleBox">
          <span className=""></span>
          <img className="tokenImg" src={I_eth} alt="" />
          <span className="textBox">
            <p className="token">Token</p>
            <p className="title">MetaPlanet</p>
          </span>
          <img className="infoImg" src={I_info} alt="" />
        </section>

        <section className="topBox">
          <ul className="overViewBox">
            <li>
              <span className="key">
                <span className="textBox">
                  <p className="title">Overview</p>
                  <p className="explain">(ERC-20)</p>
                </span>
              </span>
            </li>

            <li>
              <span className="key">Max Total Supply:</span>
              <span className="value">
                <p>90,000,000,000 METAPLANET</p>
                <img className="infoImg" src={I_info} alt="" />
              </span>
            </li>

            <li>
              <span className="key">Holders:</span>
              <span className="value">4</span>
            </li>

            <li>
              <span className="key">Transfers:</span>
              <span className="value">4</span>
            </li>
          </ul>

          <ul className="profileBox">
            <li>
              <span className="key">
                <span className="textBox">
                  <p className="title">Profile Summary</p>
                </span>
              </span>
            </li>

            <li>
              <span className="key">Contract:</span>
              <span className="value addressBox">
                <button className="addressBtn" onClick={() => {}}>
                  <p>0x70e509a0d868f023a8a16787bd659a3bb1357ee1</p>
                  <img className="copyImg" src={I_copy} alt="" />
                </button>
              </span>
            </li>

            <li>
              <span className="key">Decimals:</span>
              <span className="value">6</span>
            </li>
          </ul>
        </section>

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

            <button className="filterBtn" onClick={() => {}}>
              <img src={I_search} alt="" />
            </button>
          </article>

          {category === 0 && <Transfers />}
          {category === 1 && <Holders />}
          {category === 2 && <Contract />}
        </section>
      </div>
    </DashBoardsBox>
  );
}

const DashBoardsBox = styled.div`
  display: flex;
  padding: 100px 32px 556px 0;
  color: #4a4f55cc;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0 0 0;
    width: 1400px;

    .titleBox {
      display: flex;
      align-items: center;
      gap: 4px;

      .tokenImg {
        height: 28px;
      }

      .textBox {
        display: flex;
        align-items: flex-end;
        gap: 4px;

        .token {
          font-size: 21px;
          line-height: 21px;
        }

        .title {
          font-size: 17px;
          line-height: 17px;
          text-transform: uppercase;
          color: #77838f;
        }
      }

      .infoImg {
        height: 17px;
      }
    }

    & > .topBox {
      display: flex;
      gap: 20px;

      ul {
        flex: 1;
        border-radius: 8px;
        padding: 0 12px;
        background: #fff;

        li {
          display: flex;
          align-items: center;
          height: 46px;
          font-size: 14px;

          &:nth-of-type(n + 2) {
            border-top: 1px solid #eee;
          }

          .key {
            display: flex;
            width: 174px;
            text-transform: capitalize;
            font-weight: 300;

            .textBox {
              display: flex;
              align-items: flex-end;
              gap: 4px;

              .title {
                font-weight: 500;
              }

              .explain {
                font-size: 11px;
                font-weight: 400;
                color: #77838f;
              }
            }
          }

          .value {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 4px;

            .infoImg {
              width: 14px;
            }

            .addressBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 4px;
              color: #3498db;

              img {
                display: none;
                height: 12px;
              }
            }

            &.addressBox:hover {
              img {
                display: block;
              }
            }
          }
        }
      }
    }

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
            height: 100%;
            padding: 0 12px;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
          }
        }

        .filterBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 28px;
          height: 28px;
          border-radius: 4px;
          background: #3498db;
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

export default connect(mapStateToProps, mapDispatchToProps)(DashBoards);

const categoryList = ["Transfers", "Holders", "Contract"];
