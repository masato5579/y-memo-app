import React from "react";
import { Route, Switch } from "react-router";
import {
  Home,
  Reset,
  SignIn,
  SignUp,
  MovieMemo,
  MovieMemoEdit,
  MemoMyselfList,
  FavoList,
  Profile,
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
        <Route exact path={"/moviememo/list"} component={MemoMyselfList} />
        <Route exact path={"/moviememo"} component={MovieMemo} />
        <Route path={"/moviememo/edit/(/:id)?"} component={MovieMemoEdit} />
        <Route path={"/favorite"} component={FavoList} />
        <Route path={"/profile"} component={Profile} />
      </Auth>
    </Switch>
  );
};

export default Router;
