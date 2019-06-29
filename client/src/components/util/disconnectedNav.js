import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class DisconnectedNav extends Component {
  render() {
    return (
      <div>
        <nav>
          <NavLink to="/"> Home </NavLink>
          <NavLink to="/login-page"> Login </NavLink>
        </nav>
      </div>
    );
  }
}

export default DisconnectedNav;
