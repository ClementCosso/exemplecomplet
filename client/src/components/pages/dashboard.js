import React, { Component } from "react";
import { Input, DatePicker } from "antd";
import SubNavbar from "../util/subNavbar";
import WeeklySumOfTime from "../util/weeklySumOfTime";
import WeeklyUploadByPeople from "../util/weeklyUploadByPeople";
import WeeklyResultByPeople from "../util/WeeklyResultByPeople";
import { LocaleProvider } from "antd";
import fr_FR from "antd/lib/locale-provider/fr_FR";
import "moment/locale/fr";
import Weekly2 from "../util/weekly2";
import Weekly3 from "../util/weekly3";
const { WeekPicker } = DatePicker;
const { Search } = Input;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowClear: false
    };
  }

  getWeekNumber = d => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));

    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

    var year = d.getUTCFullYear();
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

    this.setState({ week: weekNo, year: year });
  };

  componentDidMount() {
    this.getWeekNumber(new Date());
  }

  onDateChange(date, dateString) {
    this.setState({
      year: parseFloat(date.format("YYYY")),
      week: parseFloat(date.format("W"))
    });
  }

  render() {
    return (
      <div>
        <div className="subnavbar">
          <div className="subcontent">
            <Search
              className="searchBar"
              placeholder="Rechercher"
              disabled
              enterButton
            />
            <div className="weekPicker">
              <WeekPicker
                allowClear={this.state.allowClear}
                locale={fr_FR}
                onChange={(e, f) => this.onDateChange(e, f)}
                placeholder="Select Week"
              />
            </div>

            <div />
          </div>
        </div>
        <div className="dashboard-row-1">
          <div className="dash-box ">
            <WeeklySumOfTime date={this.dateSet} />
          </div>
          <div className="dash-box ">
            <WeeklyUploadByPeople
              week={this.state.week}
              year={this.state.year}
            />
          </div>
          <div className="dash-box">
            <WeeklyResultByPeople />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
