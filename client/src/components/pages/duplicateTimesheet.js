import React, { Component } from "react";
import api from "../util/apis";
import { Redirect, Link } from "react-router-dom";
import fr_FR from "antd/lib/locale-provider/fr_FR";
import "moment/locale/fr";
import {
  Form,
  DatePicker,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Tag,
  Table,
  Divider,
  Button,
  AutoComplete,
  InputNumber
} from "antd";
import SubNavbar from "../util/subNavbar";

const { Search } = Input;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class DuplicateTimesheets extends Component {
  state = {
    redirect: false,
    forbidenWeeks: [],
    allowClear: false,
    weekToTest: 0,
    disabled: true,
    dataSource: [],
    week: null,
    year: null,
    calendars: [],
    projects: [],
    works: [
      {
        project: "",
        lundi: 0,
        mardi: 0,
        mercredi: 0,
        jeudi: 0,
        vendredi: 0,
        samedi: 0,
        dimanche: 0,
        key: 0
      }
    ],
    user: null
  };

  addNewCalendar = e => {
    const calendar = {
      week: this.state.week,
      year: this.state.year,
      works: this.state.works
    };
    api.addNewCalendar(calendar).then(res => this.setState({ redirect: true }));
  };

  editCalendar = e => {
    const calendar = {
      week: this.state.week,
      year: this.state.year,
      works: this.state.dataSource
    };
    api
      .editCalendar(this.props.timesheetId, calendar)
      .then(res => this.setState({ redirect: true }));
  };

  // toutes les fonctions pour editer le state
  refreshProjects = () => {
    api.getProjects().then(projects => {
      this.setState({ projects: projects });
    });
  };

  refreshCalendars = () => {
    api.getCalendars().then(calendars => {
      this.setState({ calendars: calendars }, e => {
        const forbidenWeeks = this.state.calendars.map(
          e => `${e.year}${e.week}`
        );

        this.setState({ forbidenWeeks: forbidenWeeks });
      });
    });
  };

  testValue = e => {
    if (this.state.forbidenWeeks.includes(e)) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };

  componentDidMount() {
    this.refreshProjects();
    this.refreshCalendars();

    api.getTimesheet(this.props.timesheetId).then(timesheet => {
      this.setState({
        week: timesheet.week,
        year: timesheet.year,
        user: timesheet.user,
        works: timesheet.works
      });

      this.setState({ dataSource: this.state.works });
    });
  }

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleSemaineChange = val => {
    this.setState({ week: val });
    this.setState({ weekToTest: `${this.state.year}${val}` });
    this.testValue();
  };

  handleYearChange = val => {
    this.setState({ year: val });
    this.setState({ weekToTest: `${val}${this.state.week}` });
    this.testValue();
  };

  onDateChange(date, dateString) {
    this.setState({
      year: parseFloat(date.format("YYYY")),
      week: parseFloat(date.format("W")),
      weekToTest: `${date.format("YYYY")}${date.format("W")}`
    });
    this.testValue(`${date.format("YYYY")}${date.format("W")}`);
  }

  handleSelectChange = val => {
    this.setState({ role: val });
  };

  handleProjectChange(index, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.works[index].project = e;
    this.setState(stateCopy);
  }

  handlelundiChange(index, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.works[index].lundi = e;
    this.setState(stateCopy);
  }
  handlemardiChange(index, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.works[index].mardi = e;
    this.setState(stateCopy);
  }
  handlemercrediChange(index, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.works[index].mercredi = e;
    this.setState(stateCopy);
  }
  handlejeudiChange(index, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.works[index].jeudi = e;
    this.setState(stateCopy);
  }
  handlevendrediChange(index, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.works[index].vendredi = e;
    this.setState(stateCopy);
  }
  handlesamediChange(index, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.works[index].samedi = e;
    this.setState(stateCopy);
  }
  handledimancheChange(index, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.works[index].dimanche = e;
    this.setState(stateCopy);
  }

  addworks = e => {
    this.state.works.push({
      project: "",
      lundi: 0,
      mardi: 0,
      mercredi: 0,
      jeudi: 0,
      vendredi: 0,
      samedi: 0,
      dimanche: 0,
      key: this.state.works.length
    });
    this.setState({ works: this.state.works });
  };

  deleteWork = e => {
    const worksBefore = this.state.dataSource.slice(0, e);
    const worksAfter = this.state.dataSource.slice(
      e + 1,
      this.state.dataSource.length
    );
    const NewWorks = worksBefore.concat(worksAfter);
    const NewWorks2 = NewWorks.map((e, index) => {
      return {
        project: e.project,
        lundi: e.lundi,
        mardi: e.mardi,
        mercredi: e.mercredi,
        jeudi: e.jeudi,
        vendredi: e.vendredi,
        samedi: e.samedi,
        dimanche: e.dimanche,
        key: index
      };
    });

    this.setState({ dataSource: NewWorks2 });
  };

  render() {
    const DataSource = this.state.dataSource.map((e, index) => ({
      name: e.project,
      lundi: e.lundi,
      mardi: e.mardi,
      mercredi: e.mercredi,
      jeudi: e.jeudi,
      vendredi: e.vendredi,
      samedi: e.samedi,
      dimanche: e.dimanche,
      key: index
    }));
    return this.state.redirect ? (
      <Redirect to="/timesheets" />
    ) : (
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
            <div className="weekPicker">
              <WeekPicker
                allowClear={this.state.allowClear}
                locale={fr_FR}
                onChange={(e, f) => this.onDateChange(e, f)}
                placeholder="Select Week"
              />
            </div>
            <div className="timesheets-buttons">
              <div className="addline-button">
                <Button
                  shape="round"
                  type="primary"
                  onClick={e => {
                    this.addworks();
                  }}
                >
                  <Icon type="ordered-list" /> Ajouter une ligne
                </Button>
              </div>
              <div>
                <Button
                  disabled={this.state.disabled}
                  shape="round"
                  type="primary"
                  onClick={e => {
                    this.addNewCalendar();
                  }}
                >
                  <Icon type="check" /> Sauvegarder
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="TimesheetsPage">
          <div className="TimesheetsTable">
            <Table
              columns={[
                {
                  title: "Nom du projet",
                  dataIndex: "name",
                  width: 400,
                  key: "name",
                  render: (text, record) => (
                    <Select
                      id={record.name}
                      style={{ width: "100%" }}
                      onChange={e => this.handleProjectChange(record.key, e)}
                      showSearch
                      placeholder="Projet"
                      value={record.name}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.state.projects.map(e => {
                        return (
                          <Option key={e._id} value={e._id}>
                            {e.title}
                          </Option>
                        );
                      })}
                    </Select>
                  )
                },
                {
                  title: "Lundi",
                  dataIndex: "lundi",
                  key: "lundi",
                  render: (name, work) => {
                    return (
                      <InputNumber
                        value={work.lundi}
                        min={0}
                        max={12}
                        onChange={e => this.handlelundiChange(work.key, e)}
                      />
                    );
                  }
                },
                {
                  title: "Mardi",
                  dataIndex: "mardi",
                  key: "mardi",
                  render: (name, work) => {
                    return (
                      <InputNumber
                        value={work.mardi}
                        min={0}
                        max={12}
                        onChange={e => this.handlemardiChange(work.key, e)}
                      />
                    );
                  }
                },
                {
                  title: "Mercredi",
                  dataIndex: "mercredi",
                  key: "mercredi",
                  render: (name, work) => {
                    return (
                      <InputNumber
                        value={work.mercredi}
                        min={0}
                        max={12}
                        onChange={e => this.handlemercrediChange(work.key, e)}
                      />
                    );
                  }
                },
                {
                  title: "Jeudi",
                  dataIndex: "jeudi",
                  key: "jeudi",
                  render: (name, work) => {
                    return (
                      <InputNumber
                        value={work.jeudi}
                        min={0}
                        max={12}
                        onChange={e => this.handlejeudiChange(work.key, e)}
                      />
                    );
                  }
                },
                {
                  title: "Vendredi",
                  dataIndex: "vendredi",
                  key: "vendredi",
                  render: (name, work) => {
                    return (
                      <InputNumber
                        value={work.vendredi}
                        min={0}
                        max={12}
                        onChange={e => this.handlevendrediChange(work.key, e)}
                      />
                    );
                  }
                },
                {
                  title: "Samedi",
                  dataIndex: "samedi",
                  key: "samedi",
                  render: (name, work) => {
                    return (
                      <InputNumber
                        value={work.samedi}
                        min={0}
                        max={12}
                        onChange={e => this.handlesamediChange(work.key, e)}
                      />
                    );
                  }
                },
                {
                  title: "Dimanche",
                  dataIndex: "dimanche",
                  key: "dimanche",
                  render: (name, work) => {
                    return (
                      <InputNumber
                        value={work.dimanche}
                        min={0}
                        max={12}
                        onChange={e => this.handledimancheChange(work.key, e)}
                      />
                    );
                  }
                },
                {
                  title: "Supprimer",
                  key: "action",

                  width: 70,
                  render: (text, record) => (
                    <span>
                      <Link>
                        <Icon
                          onClick={() => {
                            this.deleteWork(record.key);
                          }}
                          type="delete"
                        />
                      </Link>
                    </span>
                  )
                }
              ]}
              dataSource={DataSource}
            />
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default DuplicateTimesheets;
