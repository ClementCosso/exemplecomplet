import React, { Component } from "react";
import api from "../util/apis";
import { Redirect } from "react-router-dom";

import {
  Form,
  DatePicker,
  Radio,
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

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class NewTimesheets extends Component {
  state = {
    redirect: false,
    dataSource: [],

    week: null,
    year: 2019,
    calendars: [],
    forbidenWeeks: [],
    weekToTest: 0,
    disabled: true,
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
    ]
  };

  addNewCalendar = e => {
    const calendar = {
      week: this.state.week,
      year: this.state.year,
      works: this.state.works
    };
    api.addNewCalendar(calendar).then(res => this.setState({ redirect: true }));
  };

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

  testValue = () => {
    if (this.state.forbidenWeeks.includes(this.state.weekToTest)) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };

  componentDidMount() {
    this.refreshProjects();
    this.refreshCalendars();
  }

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleSemaineChange = val => {
    this.setState(
      { week: val, weekToTest: `${this.state.year}${val}` },
      this.testValue
    );
  };

  handleYearChange = val => {
    this.setState(
      { year: val, weekToTest: `${val}${this.state.week}` },
      this.testValue
    );
  };

  handleSelectChange = val => {
    this.setState({ role: val });
  };

  handleProjectChange(index, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.works[index].project = e;
    this.setState(stateCopy);
    console.log(this.state.works);
  }

  handlelundiChange(index, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.works[index].lundi = e;
    this.setState(stateCopy);
    console.log(this.state.works);
  }
  handlemardiChange(index, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.works[index].mardi = e;
    this.setState(stateCopy);
    console.log(this.state.works);
  }
  handlemercrediChange(index, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.works[index].mercredi = e;
    this.setState(stateCopy);
    console.log(this.state.works);
  }
  handlejeudiChange(index, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.works[index].jeudi = e;
    this.setState(stateCopy);
    console.log(this.state.works);
  }
  handlevendrediChange(index, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.works[index].vendredi = e;
    this.setState(stateCopy);
    console.log(this.state.works);
  }
  handlesamediChange(index, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.works[index].samedi = e;
    this.setState(stateCopy);
    console.log(this.state.works);
  }
  handledimancheChange(index, e) {
    let stateCopy = Object.assign({}, this.state);
    stateCopy.works[index].dimanche = e;
    this.setState(stateCopy);
    console.log(this.state.works);
  }

  onDateChange(date, dateString) {
    console.log(date, dateString);
  }

  addNewTimesheets = e => {
    api
      .addNewTimesheets(this.state)
      .then(res => this.setState({ redirect: true }));
  };

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

  render() {
    return this.state.redirect ? (
      <Redirect to="/timesheets" />
    ) : (
      <div>
        <SubNavbar />
        <div className="container">
          <WeekPicker
            onChange={(e, f) => this.onDateChange(e, f)}
            placeholder="Select Week"
          />

          <InputNumber
            id="year"
            min={2019}
            max={2020}
            label="Année"
            hasFeedback
            defaultValue={2019}
            placeholder="Année"
            value={this.state.year}
            onChange={this.handleYearChange}
          />
          <InputNumber
            id="week"
            min={1}
            hasFeedback
            max={52}
            placeholder="#semaine"
            onChange={this.handleSemaineChange}
            value={this.state.week}
          />
        </div>
        <div>
          <Table
            columns={[
              {
                title: "Nom du projet",
                dataIndex: "name",
                key: "name",
                render: (text, record) => (
                  <Select
                    id={record.name}
                    style={{ width: "100%" }}
                    onChange={e => this.handleProjectChange(record.key, e)}
                    showSearch
                    placeholder="Projet"
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
                      min={0}
                      max={12}
                      onChange={e => this.handledimancheChange(work.key, e)}
                    />
                  );
                }
              }
            ]}
            dataSource={this.state.works.map((e, index) => ({
              name: e.project,
              lundi: e.lundi,
              mardi: e.mardi,
              mercredi: e.mercredi,
              jeudi: e.jeudi,
              vendredi: e.vendredi,
              samedi: e.samedi,
              dimanche: e.dimanche,

              key: index
            }))}
          />
        </div>
        <Button
          onClick={e => {
            this.addworks();
          }}
        >
          Ajouter une ligne
        </Button>

        <Button
          disabled={this.state.disabled}
          onClick={e => {
            this.addNewCalendar();
          }}
        >
          Sauvegarder la timesheet
        </Button>
      </div>
    );
  }
}

export default NewTimesheets;
