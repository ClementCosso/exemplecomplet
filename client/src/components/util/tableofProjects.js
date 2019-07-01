import React, { Component } from "react";
import { Icon, Button, Table, Divider, Tag } from "antd";
import ProjectModal from "../util/editProjectModal";
import { Link } from "react-router-dom";
import api from "../util/apis";

class TableofProjects extends Component {
  state = {
    drawerOpen: false,
    title: "",
    description: "",
    owner: ""
  };

  toggleChildMenu = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  // editUser = keyId => {
  //   api.editUser(keyId).then(_ => {
  //     this.refreshTeams();
  //   });
  // };

  // editProject = (e, f, g) => {
  //   this.props.editProject(e, f, g);
  // };

  refreshProjects = () => {
    this.props.refreshProjects();
  };

  render() {
    return (
      <div>
        <Table
          columns={[
            {
              title: "Nom du projet",
              dataIndex: "name",
              key: "name",
              width: 200
            },
            {
              title: "Description",
              dataIndex: "description",
              key: "description",
              width: 650
            },

            {
              title: "Owner",
              width: 200,
              key: "owner",
              dataIndex: "owner",
              render: tag => (
                <span>
                  <Tag color="blue" key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                </span>
              )
            },
            {
              title: "Actions",
              key: "action",
              render: (text, record) => (
                <span>
                  {/* <Link to={`/projects/edit/${record.key}`}> */}
                  <Icon
                    color="black"
                    onClick={() => {
                      this.toggleChildMenu();
                      this.setState({
                        title: record.name,
                        description: record.description,
                        owner: record.owner,
                        projectId: record.key
                      });
                    }}
                    type="edit"
                  />
                  {/* </Link> */}

                  <Divider type="vertical" />
                  <Icon
                    onClick={() => this.props.deleteProject(record.key)}
                    type="delete"
                  />
                </span>
              )
            }
          ]}
          dataSource={this.props.dataSource.map(e => ({
            name: e.title,
            description: e.description,
            owner: e.owner,
            key: e._id
          }))}
        />
        <ProjectModal
          drawerOpen={this.state.drawerOpen}
          changeOnClose={this.toggleChildMenu}
          title={this.state.title}
          description={this.state.description}
          owner={this.state.owner}
          id={this.state.projectId}
          refreshProjects={this.props.refreshProjects}
          editProject={this.props.editProject}
        />
      </div>
    );
  }
}

export default TableofProjects;
