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
  Tooltip,
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
              <Button shape="round" type="primary">
                <Link to="/timesheets/new">
                  <Icon type="plus" /> Nouvelle timesheet
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="TimesheetsPage">
            <div className="TimesheetsRecapTable">
              <Table
                columns={[
                  {
                    title: "Année",
                    dataIndex: "year",
                    key: "year",
                    width: 200
                  },
                  {
                    title: "Semaine",
                    dataIndex: "week",
                    key: "week",
                    width: 200
                  },

                  {
                    title: "Action",
                    key: "action",

                    width: 250,
                    render: (text, record) => (
                      <span>
                        <Tooltip placement="top" title={"Dupliquer"}>
                          <Link to={`/timesheets/duplicate/${record.key}`}>
                            <Icon type="branches" />
                          </Link>
                        </Tooltip>
                        <Divider type="vertical" />{" "}
                        <Tooltip placement="top" title={"Editer"}>
                          <Link to={`/timesheets/edit/${record.key}`}>
                            <Icon type="edit" />
                          </Link>
                        </Tooltip>
                        <Divider type="vertical" />
                        <Tooltip placement="top" title={"Supprimer"}>
                          <Link>
                            <Icon
                              onClick={() => this.deleteCalendar(record.key)}
                              type="delete"
                            />
                          </Link>
                        </Tooltip>
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
      </div>
    );
  }
}

export default Timesheets;
