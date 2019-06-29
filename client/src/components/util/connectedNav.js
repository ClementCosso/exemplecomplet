import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Logout from "../util/logout";

class ConnectedNav extends Component {
  render() {
    return (
      <div>
        <nav>
          <NavLink to="/dashboard"> Dashboard </NavLink>
          <NavLink to="/teams"> Teams </NavLink>
          <NavLink to="/projects"> Projects </NavLink>
          <NavLink to="/timesheets"> Timesheets </NavLink>
          <Logout
            currentUser={this.props.currentUser}
            onUserChange={this.props.onUserChange}
          />
        </nav>
      </div>
    );
  }
}

export default ConnectedNav;
