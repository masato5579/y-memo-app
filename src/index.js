import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/reset.css";
import "./assets/style.css";
import { Provider } from "react-redux";
import createStore from "./reducks/store/store";
import reportWebVitals from "./reportWebVitals";
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";

const history = History.createBrowserHistory();

//createstoreを実行して、storeが作られる history(pathの情報を引数として渡す)
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
