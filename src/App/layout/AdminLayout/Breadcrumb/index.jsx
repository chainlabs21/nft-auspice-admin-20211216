import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import config from "../../../../config";
import navigation from "../../../../menu-items";
import DEMO from "../../../../store/constant";
import styled from "styled-components";

const Breadcrumb = (props) => {
  const [main, setMain] = useState();
  const [item, setItem] = useState();
  const getCollapse = useCallback((item) => {}, []);
  useEffect(() => {
    navigation.items.map((item, index) => {
      if (item.children) {
        item.children.forEach((v, i) => {
          if (document.location.pathname === v.url) {
            setItem(v.title);
          }
        });
      } else {
        setItem(item.title);
      }
    });
  }, [props, getCollapse]);
  let main_, item_;
  let breadcrumb = "";
  let title = item;
  if (main && main.type === "collapse") {
    main_ = (
      <li className="breadcrumb-item">
        <a href={DEMO.BLANK_LINK}>{main.title}</a>
      </li>
    );
  }
  if (item && item.type === "item") {
    title = item.title;
    item_ = (
      <li className="breadcrumb-item">
        <a href={DEMO.BLANK_LINK}>{title}</a>
      </li>
    );
  }
  breadcrumb = (
    <div className="page-header">
      <div className="page-block">
        <div className="row align-items-center">
          <div className="col-md-12">
            <HeaderWrapper className="page-header-title">
              <h1 className="m-b-10">{title}</h1>
            </HeaderWrapper>
          </div>
        </div>
      </div>
    </div>
  );
  document.title = title + " | Able Pro Premium React + Redux Admin Template";
  return <>{breadcrumb}</>;
};
export default Breadcrumb;
const HeaderWrapper = styled.div`
  margin-bottom: 5rem;
  margin-top: 1rem;
  margin-left: 2rem;
  h1 {
    color: white;
  }
`;
