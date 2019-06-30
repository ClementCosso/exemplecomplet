import React, { Component } from "react";
import TeamCard from "../util/card";
import api from "../util/apis";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import SubNavbar from "../util/subNavbar";

const { Search } = Input;

class Teams extends Component {
  state = {
    team: [],
    search: ""
  };

  refreshTeams = () => {
    api.getTeams().then(team => {
      this.setState({ team: team });
    });
  };

  componentDidMount() {
    this.refreshTeams();
  }

  deleteUser = keyId => {
    api.deleteUser(keyId).then(_ => {
      this.refreshTeams();
    });
  };

  editUser = keyId => {
    api.editUser(keyId).then(_ => {
      this.refreshTeams();
    });
  };

  filterTeam = e => {
    this.setState({ search: e });
  };

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <div className="subnavbar">
          <div className="subcontent">
            <Search
              className="searchBar"
              placeholder="Rechercher"
              name="search"
              value={this.state.search}
              onChange={e => this.handleChange(e)}
              enterButton
            />
            <div className="actionButton">
              <div>
                <Link to="/teams/new">
                  <Button shape="round" icon="android">
                    {" "}
                    Nouveau profil
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="team-container">
          {this.state.team
            .filter(e => !e.hidden)
            .filter(e => {
              return e.username
                .toUpperCase()
                .includes(this.state.search.toUpperCase());
            })
            .map((e, index) => (
              <TeamCard
                key={index}
                edit={e}
                title={e.username}
                description={e.role}
                deleteUser={this.deleteUser}
                editUser={this.editUser}
                keyId={e._id}
                image={e.image}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Teams;
