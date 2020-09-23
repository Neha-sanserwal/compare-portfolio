import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import WithComparisons from "./Components/Comparisons";
import * as Api from "./Components/Api";
import alert from "./Components/hooks/useAlert";
function App() {
  const [user, setUser] = useState({});
  const [message, dispatch] = useReducer(alert, "");
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
            <LandingPage user={user} message={message} dispatch={dispatch} />
          </Route>
          <Route exact path="/profile">
            <Profile message={message} />
          </Route>
          <Route exact path={"/comparisons/:id"}>
            <WithComparisons dispatch={dispatch} />
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
