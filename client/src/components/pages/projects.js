import React, { Component } from "react";
import api from "../util/apis";
import TableofProjects from "../util/tableofProjects";
import ActionProject from "../util/actionProject";
import { Icon, Button, Table, Divider, Tag } from "antd";
import { Link } from "react-router-dom";
import ProjectModal from "../util/editProjectModal";

class Projects extends Component {
  state = {
    Action: "Ajouter",
    projects: []
  };

  refreshProjects = () => {
    api.getProjects().then(projects => {
      this.setState({ projects: projects });
    });
  };

  componentDidMount() {
    this.refreshProjects();
  }

  deleteProject = key => {
    api.deleteProject(key).then(_ => {
      this.refreshProjects();
    });
  };

  addNewProject = (e, f, g) => {
    const project = { title: e, description: f, owner: g };
    api.addNewProject(project).then(_ => {
      this.refreshProjects();
    });
  };

  setAction = e => {
    this.setState({ Action: e });
  };

  editProject = e => {
    api.editProject(e).then(res => this.refreshProjects());
  };

  // editUser = keyId => {
  //   api.editUser(keyId).then(_ => {
  //     this.refreshTeams();
  //   });
  // };

  render() {
    return (
      <div>
        <h1>Projects</h1>

        <div className="projectPage">
          <div className="projectsTableContainer">
            <TableofProjects
              deleteProject={this.deleteProject}
              dataSource={this.state.projects}
              refreshProjects={this.refreshProjects}
              editProject={this.editProject}
            />
          </div>
          <ActionProject
            refreshProjects={this.refreshProjects}
            actionProject={this.addNewProject}
          />
        </div>
      </div>
    );
  }
}

export default Projects;
