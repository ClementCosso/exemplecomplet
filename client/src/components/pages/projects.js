import React, { Component } from "react";
import api from "../util/apis";
import { List, Button, Table, Divider, Tag } from "antd";
import { Link } from "react-router-dom";

class Projects extends Component {
  state = {
    projects: []
  };

  refreshProjects = () => {
    api.getProjects().then(projects => {
      this.setState({ projects: projects });
    });
  };

  componentDidMount() {
    console.log("component did mount");
    this.refreshProjects();
  }

  // deleteUser = keyId => {
  //   api.deleteUser(keyId).then(_ => {
  //     this.refreshTeams();
  //   });
  // };

  // editUser = keyId => {
  //   api.editUser(keyId).then(_ => {
  //     this.refreshTeams();
  //   });
  // };

  render() {
    return (
      <div>
        <h1>Projects</h1>
        <div>
          <Button>
            <Link to="/teams/new"> Nouveau projet</Link>
          </Button>
        </div>
        <div>
          <div className="tableContainer">
            <Table
              columns={[
                {
                  title: "Nom du projet",
                  dataIndex: "name",
                  key: "name"
                },
                {
                  title: "Description",
                  dataIndex: "description",
                  key: "description"
                },

                {
                  title: "Owner",
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
                  title: "Action",
                  key: "action",
                  render: () => (
                    <span>
                      <a href="javascript:;">Edit</a>
                      <Divider type="vertical" />
                      <a href="javascript:;">Delete</a>
                    </span>
                  )
                }
              ]}
              dataSource={this.state.projects.map((e, index) => ({
                name: e.title,
                description: e.description,
                owner: e.owner
              }))}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;

// <Table
//   columns={[{
//   title: "Nom du projet",
//   dataIndex: "name",
//   key: "name"
// },
// {
//   title: "Description",
//   dataIndex: "description",
//   key: "description"
// },

// {
//   title: "Owner",
//   key: "owner",
//   dataIndex: "owner",
//   render: tags => (
//     <span>
//       {tags.map(tag => {
//         let color = tag.length > 5 ? "geekblue" : "green";
//         if (tag === "loser") {
//           color = "volcano";
//         }
//         return (
//           <Tag color={color} key={tag}>
//             {tag.toUpperCase()}
//           </Tag>
//         );
//       })}
//     </span>
//   )
// },
// {
//   title: "Action",
//   key: "action",
//   render: () => (
//     <span>
//       <a href="javascript:;">Edit</a>
//       <Divider type="vertical" />
//       <a href="javascript:;">Delete</a>
//     </span>
//   )
// }]}
//   dataSource={this.state.projects.map(e => ({
//     key : e[index],
//     title: e.title,
//     description: e.description,
//     owner: e.owner
//   }))}
// />
