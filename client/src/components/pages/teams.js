import React, { Component } from "react";
import TeamCard from "../util/card";
import api from "../util/apis";
import { Button } from "antd";
import { Link } from "react-router-dom";

class Teams extends Component {
  state = {
    team: []
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

  render() {
    return (
      <div>
        <h1>Teams</h1>
        <div>
          <Button>
            <Link to="/teams/new"> Nouveau profil</Link>
          </Button>
        </div>
        <div className="team-container">
          {this.state.team
            .filter(e => !e.hidden)
            .map((e, index) => (
              <TeamCard
                key={index}
                edit={e}
                title={e.username}
                description={e.role}
                deleteUser={this.deleteUser}
                editUser={this.editUser}
                keyId={e._id}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Teams;
