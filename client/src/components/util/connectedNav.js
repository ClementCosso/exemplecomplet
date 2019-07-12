import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logout from "../util/logout";
import { Menu, Icon } from "antd";

const { SubMenu } = Menu;

class ConnectedNav extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="inside-navbar">
            <div className="nav-content">
              <div className="nav-first-part">
                <Link className="nav-items" to="/dashboard">
                  {" "}
                  Tableau de bord{" "}
                </Link>
                <Link icon="team" className="nav-items" to="/teams">
                  {" "}
                  Equipes{" "}
                </Link>
                <Link className="nav-items" to="/projects">
                  {" "}
                  Projets{" "}
                </Link>
                <Link className="nav-items" to="/timesheets">
                  {" "}
                  Timesheets{" "}
                </Link>
              </div>
              <div className="nav-second-part">
                <Logout
                  currentUser={this.props.currentUser}
                  onUserChange={this.props.onUserChange}
                />
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default ConnectedNav;
