import { connect } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";

function Main({ store }) {
  const navigate = useNavigate();

  return (
    <HeaderBox>
      <p onClick={() => navigate("/")}>메인</p>

      <p />
      <p onClick={() => navigate("/connectwallet")}>지갑연동</p>
      <p onClick={() => navigate("/joinmembership")}>join the membership</p>
      <p onClick={() => navigate("/signup")}>sign up</p>
      <p onClick={() => navigate("/sentemail")}>sent email</p>
      <p onClick={() => navigate("/signupcomplete")}>sign up complete</p>
      <p onClick={() => navigate("/emailfailed")}>email failed</p>
      <p onClick={() => navigate("/emailrequired")}>email required</p>
      <p onClick={() => navigate("/recentemail")}>email recent</p>

      <p />
      <p onClick={() => navigate("/marketplace")}>마켓플레이스</p>
      <p onClick={() => navigate("/singleitem")}>단일 상품</p>
      <p onClick={() => navigate("/bundleitem")}>번들 상품</p>

      <p />
      <p onClick={() => navigate("/mycollection")}>My Item</p>
      <p onClick={() => navigate("/createcollection")}>
        create a new item
      </p>
      <p onClick={() => navigate("/editcollection")}>edit item</p>
      <p onClick={() => navigate("/importcontract")}>import contract</p>
      <p onClick={() => navigate("/myfavorite")}>my favorite</p>
      <p onClick={() => navigate("/mycollectionselect")}>
        my item select
      </p>
      <p onClick={() => navigate("/loyaltycheck")}>loyalty check</p>

      <p />
      <p onClick={() => navigate("/createitem")}>create Item</p>
      <p onClick={() => navigate("/salefixed")}>sale fixed</p>
      <p onClick={() => navigate("/auctionbid")}>auction bid</p>
      <p onClick={() => navigate("/salebundle")}>sale bundle</p>

      <p />
      <p onClick={() => navigate("/myprof")}>myprof</p>
      <p onClick={() => navigate("/edititem")}>edit item</p>
      <p onClick={() => navigate("/transactionhistory")}>transaction history</p>
      <p onClick={() => navigate("/offers")}>offers</p>
      <p onClick={() => navigate("/hidden item")}>hidden item</p>
      <p onClick={() => navigate("/liked")}>liked</p>
      <p onClick={() => navigate("/referals")}>referals</p>
      <p onClick={() => navigate("/handover")}>handover</p>
      <p onClick={() => navigate("/movecollection")}>move item</p>
      <p onClick={() => navigate("/logout")}>logout</p>

      <p />
      <p onClick={() => navigate("/mywallet")}>my wallet</p>
      <p onClick={() => navigate("/generalsettings")}>general settings</p>
      <p onClick={() => navigate("/notificationsettings")}>
        notification settings
      </p>
      <p onClick={() => navigate("/mprofilemenu")}>모바일 프로필 메뉴</p>

      <p onClick={() => navigate("/exploredeal")}>exploredeal</p>
      <p onClick={() => navigate("/explore")}>explore</p>
    </HeaderBox>
  );
}

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 10%;
  font-size: 16px;

  p {
    cursor: pointer;
  }
`;

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    // setAllPopupOff: () => dispatch(setAllPopupOff()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
