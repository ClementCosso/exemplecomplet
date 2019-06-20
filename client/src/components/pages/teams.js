import React, { Component } from "react";
import TeamCard from "../util/card";
import api from "../util/apis";
import { Button } from "antd";
import { Link } from "react-router-dom";

class Teams extends Component {
  state = {
    team: []
  };

  componentDidMount() {
    api.getTeams().then(team => {
      this.setState({ team: team });
    });
  }

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
          {this.state.team.map((e, index) => (
            <TeamCard title={e.username} description={e.role} key={index} />
          ))}
        </div>
      </div>
    );
  }
}

export default Teams;
