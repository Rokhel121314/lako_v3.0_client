import React from "react";
import "./error.css";
import { NavLink } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="error-container">
      <div className="error-image">
        <img src={require("../../assests/images/404.png")} alt="" />
      </div>
      <div className="error-message">
        <div className="access-denied">Page not Found</div>
        <div className="access-text">
          {" "}
          <div>Looks like we can't seem to find what</div>
          <div>you're looking for, Sorry About that!</div>
        </div>
        <div className="error-403">404</div>
        <NavLink className="home-redirect" to={"/"}>
          GO BACK TO HOME PAGE
        </NavLink>
      </div>
    </div>
  );
}

export default ErrorPage;
