import React, { Component } from "react";
import api from "../util/apis";

import {
  Icon,
  Button,
  Input,
  Drawer,
  Form,
  Col,
  Row,
  Select,
  Checkbox,
  DatePicker,
  Table,
  Divider,
  Tag
} from "antd";
import { Link } from "react-router-dom";
import SubNavbar from "../util/subNavbar";
const { Search } = Input;

class Timesheets extends Component {
  state = {
    calendars: []
  };

  refreshCalendars = () => {
    api.getCalendars().then(calendars => {
      this.setState({ calendars: calendars });
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

  render() {
    return (
      <div>
        <div className="subnavbar">
          <div className="subcontent">
            <Search
              disabled
              className="searchBar"
              placeholder="Rechercher"
              id="search"
              value={this.state.search}
              onChange={e => this.handleChange(e)}
              enterButton
            />

            <div>
              <Button ghost shape="round" type="primary">
                <Link to="/timesheets/new">
                  <Icon type="plus" /> Nouvelle Timesheet
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="TimesheetsRecapTable">
            <Table
              columns={[
                {
                  title: "Année",
                  dataIndex: "year",
                  key: "year",
                  width: 100
                },
                {
                  title: "Semaine",
                  dataIndex: "week",
                  key: "week",
                  width: 100
                },

                {
                  title: "Action",
                  key: "action",

                  width: 200,
                  render: (text, record) => (
                    <span>
                      <Link to={`/timesheets/duplicate/${record.key}`}>
                        <Icon type="apartment" />
                      </Link>
                      <Divider type="vertical" />
                      <Link to={`/timesheets/edit/${record.key}`}>
                        <Icon type="edit" />
                      </Link>
                      <Divider type="vertical" />
                      <Link>
                        <Icon
                          onClick={() => this.deleteCalendar(record.key)}
                          type="delete"
                        />
                      </Link>
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
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default Timesheets;
