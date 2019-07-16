import React, { Component } from "react";
import {
  Icon,
  Button,
  Input,
  Select,
  Checkbox,
  DatePicker,
  Table,
  Divider,
  Tag,
  Tooltip
} from "antd";

import { Link } from "react-router-dom";
import api from "../util/apis";

class WeeklySumOfTime extends Component {
  state = {
    calendars: [],
    DataSource: []
  };

  refreshCalendars = () => {
    api.getAllCalendars().then(calendars => {
      this.setState({ calendars: calendars });
      this.getDataSource();
    });
  };

  componentDidMount() {
    this.refreshCalendars();

    // this.props.sumPerWeek(this.state.DataSource);
  }

  componentWillUnmount() {
    this.setState({ calendars: [] });
  }

  getDataSource() {
    const Source = [];

    for (var data of this.state.calendars) {
      const works = data.works;

      var somme = 0;
      for (var work of works) {
        var magicalFunction = (a, s) => [...a.slice(s.length - a.length), ...s],
          array = [],
          stream = [
            work.lundi,
            work.mardi,
            work.mercredi,
            work.jeudi,
            work.vendredi,
            work.samedi,
            work.dimanche
          ];

        array = magicalFunction(array, stream);

        array = array.reduce((pv, cv) => pv + cv, 0);

        // console.log(array);
        somme = somme + array;
      }

      Source.push({
        week: data.week,
        year: data.year,
        days: somme
      });
    }

    const DataSource = [];
    for (let j = 2019; j < 2020; j++) {
      for (let i = 0; i < 53; i++) {
        const rework = Source.filter(e => e.year === j)
          .filter(f => f.week === i)
          .map(g => g.days)
          .reduce((pv, cv) => pv + cv, 0);
        if (rework > 0) {
          DataSource.unshift({
            year: j,
            week: i,

            days: Math.floor((rework / 8) * 100) / 100
          });
        }
      }
    }
    this.props.sumPerWeek(DataSource);
  }

  render() {
    const { date } = this.props;

    const Source = [];

    for (var data of this.state.calendars) {
      const works = data.works;

      var somme = 0;
      for (var work of works) {
        var magicalFunction = (a, s) => [...a.slice(s.length - a.length), ...s],
          array = [],
          stream = [
            work.lundi,
            work.mardi,
            work.mercredi,
            work.jeudi,
            work.vendredi,
            work.samedi,
            work.dimanche
          ];

        array = magicalFunction(array, stream);

        array = array.reduce((pv, cv) => pv + cv, 0);

        // console.log(array);
        somme = somme + array;
      }

      Source.push({
        week: data.week,
        year: data.year,
        days: somme
      });
    }

    const DataSource = [];
    for (let j = 2019; j < 2020; j++) {
      for (let i = 0; i < 53; i++) {
        const rework = Source.filter(e => e.year === j)
          .filter(f => f.week === i)
          .map(g => g.days)
          .reduce((pv, cv) => pv + cv, 0);
        if (rework > 0) {
          DataSource.unshift({
            week: i,
            year: j,
            days: Math.floor((rework / 8) * 100) / 100
          });
        }
      }
    }
    return (
      <div>
        <div>
          <Table
            pagination={{ pageSize: 8 }}
            columns={[
              {
                title: "Année",
                dataIndex: "year",
                key: "year",
                width: 100
              },
              {
                title: "Semaine",
                width: 100,
                key: "week",
                dataIndex: "week"
              },
              {
                title: "# de jours",
                dataIndex: "days",
                key: "days",
                width: 100
              },
              {
                title: "Détail",
                key: "action",

                width: 70,
                render: (text, record) => (
                  <span>
                    <Link>
                      <Tooltip placement="right" title={"Détail de la semaine"}>
                        <Icon
                          onClick={() => {
                            date(record.year, record.week);
                          }}
                          type="eye"
                        />
                      </Tooltip>
                    </Link>
                  </span>
                )
              }
            ]}
            dataSource={DataSource}
          />
        </div>
      </div>
    );
  }
}

export default WeeklySumOfTime;
