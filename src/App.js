import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import WithComparisons from "./Components/Comparisons";
import * as Api from "./Components/Api";

function App() {
  const [user, setUser] = useState({});
  const changeSessionUser = () => {
    Api.getCurrentUser().then(setUser);
  };
  useEffect(() => {
    changeSessionUser();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar changeSessionUser={changeSessionUser} user={user} />
        <Switch>
          <Route exact path="/">
            <LandingPage user={user} />
          </Route>
          <Route exact path="/profile">
            <Profile />
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
