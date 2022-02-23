import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import App from "./App/index";
import Login from "./pages/admin/Login";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store/store";
import config from "./config";
import "./assets/scss/style.scss";


const app = (
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter basename={config.basename}>
        <App/>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
ReactDOM.render(app, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
