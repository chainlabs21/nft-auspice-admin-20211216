import axios from "axios";
import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setAllPopupOff, setHref } from "./store";

function RouterListen({ store, setHref, setAllPopupOff }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    let hrefArray = document.location.hash.split("/");

    setHref(hrefArray[1]);

    let token_sec = localStorage.getItem("token");

    axios.defaults.headers.get.token = token_sec;
    axios.defaults.headers.post.token = token_sec;

    // if (!store.isLogin && hrefArray[1]) navigate("/");
  }, [location]);

  return <Fragment></Fragment>;
}

function mapStateToProps(state) {
  return { store: state };
}

function mapDispatchToProps(dispatch) {
  return {
    setHref: (href) => dispatch(setHref(href)),
    setAllPopupOff: () => setAllPopupOff(),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterListen);
