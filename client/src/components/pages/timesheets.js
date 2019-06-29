import React, { Component } from "react";
import api from "../util/apis";

import { Icon, Button, Table, Divider, Tag } from "antd";
import { Link } from "react-router-dom";

//COmmenaire

class Timesheets extends Component {
  state = {
    calendars: []
  };

  refreshCalendars = () => {
    api.getCalendars().then(calendars => {
      this.setState({ calendars: calendars });
      console.log(this.state.calendars);
    });
  };

  componentDidMount() {
    this.refreshCalendars();
  }

  deleteCalendar = key => {
    api.deleteCalendar(key).then(_ => {
      this.refreshCalendars();
    });
  };

  // addNewProject = (e, f, g) => {
  //   const project = { title: e, description: f, owner: g };
  //   api.addNewProject(project).then(_ => {
  //     this.refreshProjects();
  //   });
  // };

  // editProject = e => {
  //   api.editProject(e).then(res => this.refreshProjects());
  // };

  // editUser = keyId => {
  //   api.editUser(keyId).then(_ => {
  //     this.refreshTeams();
  //   });
  // };

  render() {
    return (
      <div>
        <h1>Timesheets</h1>
        <div>
          <Button>
            <Link to="/timesheets/new"> Nouvelle timesheet</Link>
          </Button>
        </div>
        <Table
          columns={[
            {
              title: "Année",
              dataIndex: "year",
              key: "year"
            },
            {
              title: "Semaine",
              dataIndex: "week",
              key: "week"
            },

            {
              title: "Action",
              key: "action",
              render: (text, record) => (
                <span>
                  <Icon type="apartment" />
                  <Divider type="vertical" />
                  <Link color="black" to={`/timesheets/edit/${record.key}`}>
                    <Icon color="black" type="edit" />
                  </Link>

                  <Divider type="vertical" />
                  <Icon
                    onClick={() => this.deleteCalendar(record.key)}
                    type="delete"
                  />
                </span>
              )
            }
          ]}
          dataSource={this.state.calendars.map(e => ({
            year: e.year,
            week: e.week,
            key: e._id
          }))}
        />
      </div>
    );
  }
}

export default Timesheets;
