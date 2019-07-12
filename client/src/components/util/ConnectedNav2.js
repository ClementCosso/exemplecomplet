import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logout from "../util/logout";
import { Menu, Icon } from "antd";

const { SubMenu } = Menu;

class ConnectedNav2 extends Component {
  state = {
    current: "dashboard"
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };
  render() {
    return (
      <div className="nav2">
        <div className="nav2-box1">
          <div>
            <Menu
              className="menu"
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="dashboard">
                <Link to="/dashboard">
                  <Icon type="dashboard" />
                  Dashboard
                </Link>
              </Menu.Item>
              <Menu.Item key="teams">
                <Link to="/teams">
                  <Icon type="android" />
                  Equipes
                </Link>
              </Menu.Item>
              <Menu.Item key="projects">
                <Link to="/projects">
                  <Icon type="dropbox" />
                  Projets
                </Link>
              </Menu.Item>
              <Menu.Item key="timesheets">
                <Link to="/timesheets">
                  <Icon type="dot-chart" />
                  Timesheets
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </div>
        <div className="nav2-box2">
          <div>
            <Logout
              className="logout"
              currentUser={this.props.currentUser}
              onUserChange={this.props.onUserChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ConnectedNav2;
