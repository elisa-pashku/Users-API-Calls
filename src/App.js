import React, { useEffect, useState } from "react";

import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SingleUser from "./Components/SingleUser";
import UsersPage from "./Components/UsersPage";
import CreateUserPage from "./Components/CreateUserPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <UsersPage />
        </Route>
        <Route exact path="/create">
          <CreateUserPage />
        </Route>
        <Route exact path={"/details/:id"}>
          <SingleUser />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
