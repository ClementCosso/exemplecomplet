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
  Tag
} from "antd";
import ProjectModal from "../util/editProjectModal";
import { Link } from "react-router-dom";
import api from "../util/apis";
const { Search } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;

class WeeklyUploadByPeople extends Component {
  state = {
    allowClear: false,
    calendars: [],
    team: [],
    year: "",
    week: ""
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
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      week: nextProps.week,
      year: nextProps.year
    });
  }

  handleChange(e) {
    let { id, value } = e.target;
    this.setState({ [id]: value });
  }
  onDateChange(date, dateString) {
    this.setState({
      year: parseFloat(date.format("YYYY")),
      week: parseFloat(date.format("W"))
    });
  }

  render() {
    // gerer le tableau
    const DataSource = this.state.team;

    const ListeDeNoms = DataSource.map(e => {
      const hasFilledTimesheet = this.state.calendars
        .filter(e => e.week === this.state.week)
        .filter(e => e.year === this.state.year)
        .some(c => c.user === e._id);
      return {
        user: e.username,
        hasFilledTimesheet
      };
    });

    const resultats = ListeDeNoms.map((e, index) => {
      if (this.state.week > 0) {
        if (e.hasFilledTimesheet === true) {
          return { user: e.user, hasFilled: "DONE", key: e[index] };
        } else {
          return { user: e.user, hasFilled: "missing", key: e[index] };
        }
      } else {
        if (e.hasFilledTimesheet === true) {
          return {
            user: e.user,
            hasFilled: "Choisir une semaine",
            key: e[index]
          };
        } else {
          return {
            user: e.user,
            hasFilled: "Choisir une semaine",
            key: e[index]
          };
        }
      }
    });

    //liste de tous ceux qui ont  rempli leur ts sur la semaine donnée

    return (
      <div>
        <div>
          <Table
            columns={[
              {
                title: "Team",
                dataIndex: "user",
                key: "user",
                width: 150
              },
              {
                title: `Semaine ${this.state.week}`,
                width: 150,
                key: "hasFilled",
                dataIndex: "hasFilled",
                render: posted => {
                  let color = "white";
                  if (posted === "DONE") {
                    color = "#4FAF47";
                  } else if (posted === "missing") {
                    color = "#f50";
                  } else {
                    color = "white";
                  }
                  return (
                    <span>
                      <Tag color={color} key={posted}>
                        {posted}
                      </Tag>
                    </span>
                  );
                }
              }
            ]}
            dataSource={resultats}
          />
        </div>
      </div>
    );
  }
}

export default WeeklyUploadByPeople;
