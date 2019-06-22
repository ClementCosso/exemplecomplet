import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class disconnectedNav extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="Nav">
        <nav>
          <NavLink to="/"> Home </NavLink>
          <NavLink to="/login-page"> Login </NavLink>
        </nav>
      </div>
    );
  }
}

export default disconnectedNav;
