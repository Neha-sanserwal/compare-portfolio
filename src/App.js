import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Profile from "./Components/Profile";
import LandingPage from "./Components/LandingPage";
import Signup from "./Components/Signup";

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
          <Link to="/signup">Signup</Link>
        </nav>

        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/authorize">
            <Profile />
          </Route>
          <Route exact path="/signup">
            <Signup />
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
