import React, { Component } from "react";
import { LocaleProvider } from "antd";
import fr_FR from "antd/lib/locale-provider/fr_FR";
import "moment/locale/fr";

import {
  Icon,
  Button,
  Input,
  Select,
  Checkbox,
  DatePicker,
  Table,
  Divider,
  Progress,
  Tag
} from "antd";
import ProjectModal from "../util/editProjectModal";
import { Link } from "react-router-dom";
import api from "../util/apis";
const { Search } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;

class WeeklyResultByPeople extends Component {
  state = {
    allowClear: false,
    calendars: [],
    team: [],
    numbersOfWeeks: 0
  };

  getWeekNumber = d => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));

    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

    var year = d.getUTCFullYear();
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

    this.setState({ numbersOfWeeks: weekNo });
  };

  refreshCalendars = () => {
    api.getAllCalendars().then(calendars => {
      this.setState({ calendars: calendars });
    });
  };
  refreshTeams = () => {
    api.getTeams().then(team => {
      this.setState({ team: team });
    });
  };

  componentDidMount() {
    this.refreshCalendars();
    this.refreshTeams();
    this.getWeekNumber(new Date());
  }

  render() {
    const now = new Date();

    const DataSource = this.state.team;
    const percent = [];
    for (var i = 0; i < DataSource.length; i++) {
      const teamMate = DataSource[i]._id;
      const howManyTimesheets = this.state.calendars.filter(
        f => f.user === teamMate
      );
      percent.push({
        username: DataSource[i].username,
        percent: Math.floor(
          (howManyTimesheets.length / this.state.numbersOfWeeks) * 100
        )
      });
    }

    return (
      <div>
        <div>
          <Table
            columns={[
              {
                title: "Team",
                dataIndex: "username",
                key: "username",
                width: 150
              },
              {
                title: "Stats",
                width: 150,
                key: "percent",
                dataIndex: "percent",
                render: stat => {
                  return (
                    <div>
                      <Progress
                        strokeColor={{
                          "0%": "#8ACDEA",
                          "100%": "#0E34A0"
                        }}
                        percent={stat}
                        status="active"
                      />
                    </div>
                  );
                }
              }
            ]}
            dataSource={percent}
          />
        </div>
      </div>
    );
  }
}

export default WeeklyResultByPeople;
