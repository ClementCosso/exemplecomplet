import React, { Component } from "react";
import "./App.css";
import { Switch, NavLink, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Login from "./components/user-pages/Login";
import Dashboard from "./components/pages/dashboard";
import Teams from "./components/pages/teams";
import Projects from "./components/pages/projects";
import Timesheets from "./components/pages/timesheets";
import NewUser from "./components/pages/newuser";
import NewTimesheets from "./components/pages/newtimesheets";
import EditUser from "./components/pages/editUser";
import Home from "./home.jpg";
import DisconnectedNav from "./components/util/disconnectedNav";
import ConnectedNav from "./components/util/connectedNav";
import ProjectModal from "./components/util/editProjectModal";
import EditTimesheets from "./components/pages/editTimesheets";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/checkuser", { withCredentials: true })
      .then(responseFromBackend => {
        // console.log("Check User in APP.JS: ",responseFromBackend.data)
        const { userDoc } = responseFromBackend.data;
        this.syncCurrentUser(userDoc);
      });
  }

  // this is the method for updating "currentUser"
  // (must be defined in App.js since it's the owner of "currentUser" now)
  syncCurrentUser(user) {
    this.setState({ currentUser: user });
    console.log("current user", this.state.currentUser);
  }

  isAuthenticated(component) {
    return this.state.currentUser ? component : <Redirect to="/" />;
  }
  isNotAuthenticated(component) {
    return !this.state.currentUser ? component : <Redirect to="/dashboard" />;
  }

  render() {
    return (
      <div className="App">
        <div className="Nav">
          {this.state.currentUser ? (
            <header>
              <ConnectedNav
                currentUser={this.state.currentUser}
                onUserChange={userDoc => this.syncCurrentUser(userDoc)}
              />
            </header>
          ) : (
            <header>
              {/* <DisconnectedNav /> */}
              <Login
                currentUser={this.state.currentUser}
                onUserChange={userDoc => this.syncCurrentUser(userDoc)}
              />
            </header>
          )}
        </div>

        <Switch>
          <Route
            exact
            path="/dashboard"
            render={() => this.isAuthenticated(<Dashboard />)}
          />
          <Route
            exact
            path="/teams"
            render={() => this.isAuthenticated(<Teams />)}
          />
          <Route
            exact
            path="/teams/new"
            render={() => this.isAuthenticated(<NewUser />)}
          />
          <Route
            path="/teams/edit/:userId"
            render={() => this.isAuthenticated(<EditUser />)}
          />
          <Route
            path="/projects"
            render={() => this.isAuthenticated(<Projects />)}
          />

          <Route
            exact
            path="/timesheets"
            render={() => this.isAuthenticated(<Timesheets />)}
          />
          <Route
            exact
            path="/timesheets/new"
            render={() => this.isAuthenticated(<NewTimesheets />)}
          />
          <Route
            exact
            path="/timesheets/edit/:timesheetId"
            render={props =>
              this.isAuthenticated(
                <EditTimesheets timesheetId={props.match.params.timesheetId} />
              )
            }
          />
          {/* <Route
            path="/"
            render={() =>
              this.isNotAuthenticated(
                <Login
                  currentUser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )
            }
          /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
