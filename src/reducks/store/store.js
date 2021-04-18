import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";

import { UsersReducer } from "../users/reducers";

export default function createStore(history) {
  let middleWares = [routerMiddleware(history), thunk];
  return reduxCreateStore(
    combineReducers({
      //reduxの現在のpathの情報を管理する
      router: connectRouter(history),
      users: UsersReducer,
    }),
    //routerをミドルウェアとして利用する宣言
    applyMiddleware(...middleWares)
  );
}
