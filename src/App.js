import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import CurrentUser from "./Components/CurrentUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/about">about</Link>
        <a href="https://github.com/login/oauth/authorize?client_id=8d16ade6f6a225d3f8ea">
          Login
        </a>
        <Switch>
          <Route exact path="/">
            <h1>Welcome to Portfolio.</h1>
          </Route>
          <Route exact path="/about">
            <h1>About us</h1>
          </Route>
          <Route exact path="/authorize">
            <CurrentUser />
          </Route>
          <Route path="/*">
            <h1>Not found</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
