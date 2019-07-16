import React, { Component } from "react";
import {
  Input,
  Button,
  Icon,
  Menu,
  Dropdown,
  DatePicker,
  Typography
} from "antd";
import SubNavbar from "../util/subNavbar";
import WeeklySumOfTime from "../util/weeklySumOfTime";
import WeeklyUploadByPeople from "../util/weeklyUploadByPeople";
import WeeklyResultByPeople from "../util/WeeklyResultByPeople";
import { LocaleProvider } from "antd";
import fr_FR from "antd/lib/locale-provider/fr_FR";
import "moment/locale/fr";
import Weekly2 from "../util/weekly2";
import Weekly3 from "../util/weekly3";
import QuarterlyResults from "../util/QuarterlyResults";
import "moment/locale/fr";
import { CSVLink, CSVDownload } from "react-csv";
import Graph1 from "../util/graph1";
import BasicSunburst from "../util/graph2";
import Graph2 from "../util/graph2";
import Graph3 from "../util/graph3";
const { WeekPicker } = DatePicker;
const { Search } = Input;
const { Text } = Typography;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowClear: false,
      quarterly: [],
      sumPerWeek: []
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

  dateSet = (year, week) => {
    this.setState({ year, week });
  };

  onDateChange(date, dateString) {
    this.setState({
      year: parseFloat(date.format("YYYY")),
      week: parseFloat(date.format("W"))
    });
  }

  quarterly = quarterly => {
    this.setState({ quarterly: quarterly });
  };

  sumPerWeek = sumPerWeek => {
    this.setState({ sumPerWeek: sumPerWeek });
  };

  render() {
    const sumPerWeek = this.state.sumPerWeek;
    const quarterly = this.state.quarterly;

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">
          <CSVLink data={sumPerWeek} target="_blank">
            Temps par semaine
          </CSVLink>
        </Menu.Item>
        <Menu.Item key="2">
          <CSVLink data={quarterly} target="_blank">
            Temps par projet
          </CSVLink>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <div className="subnavbar-dashboard">
          <div className="subcontent-dashboard">
            <Search
              className="searchBar"
              placeholder="Rechercher"
              disabled
              enterButton
            />
            <div className="weekPicker-dashboard">
              <WeekPicker
                allowClear={this.state.allowClear}
                locale={fr_FR}
                onChange={(e, f) => this.onDateChange(e, f)}
                placeholder="Select Week"
              />
            </div>
            <div className="dash-align-right">
              <div>
                <Dropdown overlay={menu}>
                  <Button shape="circle" type="primary">
                    <Icon type="download" />
                  </Button>
                </Dropdown>
              </div>
            </div>
            <div />
          </div>
        </div>
        <div className="dashboard-row-1">
          <div className="dash-box ">
            <WeeklySumOfTime sumPerWeek={this.sumPerWeek} date={this.dateSet} />
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
          <div className="dash-box ">
            <QuarterlyResults quarterly={this.quarterly} />
          </div>
          <div className="dash-box-graph ">
            <div>
              <div>
                <Graph1 />
              </div>

              <div>
                <Graph2 />
              </div>
            </div>
            <div className="graph3box">
              <Graph3 />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
