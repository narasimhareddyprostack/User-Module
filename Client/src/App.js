import logo from "./logo.svg";
import "./App.css";
import Navbar from "./modules/layout/components/navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./modules/layout/components/home/Home";
import Login from "./modules/users/components/login/Login";
import Profile from "./modules/users/components/profile/Profile";
import Register from "./modules/users/components/register/Register";

import Alert from "./modules/layout/components/alert/Alert";
import React, { useEffect } from "react";
import { store } from "./redux/store";
import { getUserInfo } from "./redux/users/users.actions";
import { useDispatch } from "react-redux";
function App() {
  let dispatch = useDispatch();
  // to main user data entire the application.
  // useEffect(() => {
  //   store.dispatch(getUserInfo);
  // });

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  return (
    <React.Fragment>
      <div className="App">
        <Router>
          <Navbar />
          <div>
            <Alert />
          </div>
          <Switch>
            <Route exact path="/" component={Home}></Route>
           
           
           
          

           
            <Route exact path="/users/login" component={Login}></Route>
            <Route exact path="/users/profile" component={Profile}></Route>
            <Route exact path="/users/register" component={Register}></Route>
            
          </Switch>
        </Router>
      </div>
    </React.Fragment>
  );
}

export default App;

/*




*/
