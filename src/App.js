import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Link, NavLink } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import Cards from "./Components/Cards";
import WithComparisons from "./Components/WithComparisons";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/profile">
            <Profile></Profile>
          </Route>
          <Route exact path={"/comparisons/:id"}>
            <WithComparisons />
          </Route>
          <Route>
            <h1>Not found</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
