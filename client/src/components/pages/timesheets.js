import React, { Component } from "react";
import api from "../util/apis";

import { Icon, Button, Table, Divider, Tag } from "antd";
import { Link } from "react-router-dom";
import SubNavbar from "../util/subNavbar";

//COmmenaire

class Timesheets extends Component {
  state = {
    calendars: []
  };

  refreshCalendars = () => {
    api.getCalendars().then(calendars => {
      this.setState({ calendars: calendars });
      console.log(this.state.calendars);
      // this.state.calendars.map(e => {
      //   e
      // } )
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

  duplicateCalendar = key => {
    api.getTimesheet(key).then(timesheet => {
      if (timesheet.week === 52) {
        this.setState({
          week: 1,
          year: timesheet.year + 1,
          user: timesheet.user,
          works: timesheet.works
        });
      } else {
        this.setState({
          week: timesheet.week + 1,
          year: timesheet.year,
          user: timesheet.user,
          works: timesheet.works
        });
      }
      const calendar = {
        week: this.state.week,
        year: this.state.year,
        works: this.state.works
      };
      api.addNewCalendar(calendar).then(res => this.refreshCalendars());
    });
  };

  render() {
    return (
      <div>
        <SubNavbar />
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
                  <Link
                    color="black"
                    to={`/timesheets/duplicate/${record.key}`}
                  >
                    <Icon color="black" type="apartment" />
                  </Link>
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
