import React from "react";
import { Route, Switch } from "react-router";
import {
  Home,
  Reset,
  SignIn,
  SignUp,
  MovieMemo,
  MovieMemoEdit,
  MovieMemoList,
} from "./templates";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signin/reset"} component={Reset} />

      <Auth>
        <Route exact path={"(/)?"} component={Home} />
        <Route exact path={"/moviememo/list"} component={MovieMemoList} />
        <Route exact path={"/moviememo/"} component={MovieMemo} />
        <Route path={"/moviememo/edit/(/:id)?"} component={MovieMemoEdit} />
      </Auth>
    </Switch>
  );
};

export default Router;
