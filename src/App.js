import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import WithComparisons from "./Components/Comparisons";
import * as Api from "./Components/Api";
import alert from "./Components/util/alert";

const AlertMessage = (props) => {
  const { message, type } = props.alert || {};
  return (
    <div className={`message ${type} ${message ? "show" : ""}`}>{message}</div>
  );
};

function App() {
  const [user, setUser] = useState({});
  const [alertMessage, dispatch] = useReducer(alert, "");
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
        <AlertMessage alert={alertMessage} />
        <Switch>
          <Route exact path="/">
            <LandingPage user={user} dispatch={dispatch} />
          </Route>
          <Route exact path="/profile">
            <Profile />
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
