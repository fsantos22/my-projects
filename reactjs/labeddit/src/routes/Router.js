import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./../Pages/Home/index";
import LoginPage from "./../Pages/LoginPage/index";
import SignUpPage from "../Pages/SignUpPage";
import Feed from "./../Pages/Feed/index";
import PostDetails from "./../Pages/PostDetails/index";


const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignUpPage />
        </Route>
        <Route exact path="/feed">
          <Feed />
        </Route>
        <Route exact path="/feed/:page">
          <Feed />
        </Route>
        <Route path="/post/:postId">
          <PostDetails />
        </Route>
        <Route path="/post/:postId/:page">
          <PostDetails />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
