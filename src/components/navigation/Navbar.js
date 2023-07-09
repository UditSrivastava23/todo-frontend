import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./navbar.module.css";

function Navbar() {
  const [loggedIn, setIsLoggedIn] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    checkToken()
  });

  function checkToken(){
    if (localStorage.getItem("token")) {
        console.log('TOken Is Found');
      setToken(localStorage.getItem("token"));
      setIsLoggedIn(true);
    }
    else{
        console.log('Token Not Found');
        setIsLoggedIn(false)
    }
  }

  let navBarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 15px 5px 15px",
    width: "98vw",
    backgroundColor: "rgb(235, 228, 219)",
    // position : 'fixed'
  };

  let signedJsx = (
    <>
      <div onClick={checkToken}>
        <Link to="/home" className={classes.a}>
          My Task
        </Link>
      </div>
      <div onClick={checkToken}>
        <Link to="/form" className={classes.a}>
          Form
        </Link>
      </div>
      <div onClick={()=>{setIsLoggedIn(false)}}>
        <Link to="/logout" className={classes.a}>
          Sign Out
        </Link>
      </div>
    </>
  );

  let unSignedJsx = (
    <>
      <div onClick={checkToken}>
        <Link to="/signup" className={classes.a}>
          Sign Up
        </Link>
      </div>
      <div onClick={checkToken}>
        <Link to="/signin" className={classes.a}>
          Sign In
        </Link>
      </div>
    </>
  );

  console.log("this is state", loggedIn);
  return (
    <div className="navbar" style={navBarStyle}>
      <div class="appName">
        <h3>TO DO APP</h3>
      </div>
      <div class="menuBtn" style={{ ...navBarStyle, width: "300px" }}>
        {loggedIn ?signedJsx : unSignedJsx}
      </div>
    </div>
  );
}

export default Navbar;
