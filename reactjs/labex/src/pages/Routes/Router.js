import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

import Header from "./../../components/header/index";

import HomePage from "./../HomePage/index";
import LoginPage from "./../LoginPage/index";
import ListTripsPage from "./../ListTripsPage/index";
import AdminPage from "./../AdminPage/index";
import TripDetailsPage from "./../TripDetailsPage/index";
import CreateTripPage from "./../CreateTripPage/index";

const Router = () => {
  const [logged, setLogged] = useState(false);

  const toggle = () => {
    setLogged(!logged);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Header logged={logged} toggle={toggle} />
      <Switch>
        <Route exact path="/">
          {logged ? <AdminPage /> : <HomePage />}
        </Route>
        <Route exact path="/login">
          <LoginPage logged={logged} toggle={toggle} />
        </Route>
        <Route exact path="/admin">
          <AdminPage />
        </Route>
        <Route path="/trips/list">
          <ListTripsPage />
        </Route>
        <Route exact path="/trips/create">
          <CreateTripPage />
        </Route>
        <Route exact path="/trips/details/:id">
          <TripDetailsPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
