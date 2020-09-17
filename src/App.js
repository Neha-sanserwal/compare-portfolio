import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Profile from "./Components/Profile";
import LandingPage from "./Components/LandingPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`}
          >
            Login
          </a>
        </nav>

        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/about">
            <h1>About us</h1>
          </Route>
          <Route exact path="/authorize">
            <Profile />
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
