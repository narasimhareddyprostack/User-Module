import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../../../../assets/img/pcart.PNG";
import { useSelector, useDispatch } from "react-redux";
import { logOutAction } from "../../../../redux/users/users.actions";
import { useHistory } from "react-router-dom";

let Navbar = () => {
  let dispatch = useDispatch();
  let history = useHistory();


  let userInfo = useSelector((state) => {
    return state.userData;
  });
  let { loading, isAuthenticated, user } = userInfo;

  let logOutHandler = () => {
    console.log("Hello, NavBar");
    dispatch(logOutAction(history));
  };
  let beforeLogin = (
    <React.Fragment>
      {" "}
      <li className="nav-item">
        <Link to="/users/Login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/users/register" className="nav-link">
          Register
        </Link>
      </li>
    </React.Fragment>
  );
  let afterLogin = (
    <React.Fragment>
      <li className="nav-item">
        <Link to="/users/Logout" className="nav-link" onClick={logOutHandler}>
          Logout
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/users/profile" className="nav-link">
          {user ? user.name : ''}
        </Link>
      </li>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        <div className="container">
          <Link to="/" className="nav-link">
            <p className="h3">ECart</p>

            {/* <img src={logoImage} alt="" /> */}
          </Link>
          <div className="collapse navbar-collapse">

            <ul className="navbar-nav ml-auto">
              {!loading && <>{!isAuthenticated ? beforeLogin : afterLogin}</>}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;
