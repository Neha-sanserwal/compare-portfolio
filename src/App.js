import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Link, NavLink } from "react-router-dom";
import Login from "./Components/Login";
import LandingPage from "./Components/LandingPage";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          {/* <Route exact path="/api/authorize">
            <Login />
          </Route> */}

          <Route>
            <h1>Not found</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
