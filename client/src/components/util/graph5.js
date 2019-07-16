import React, { Component } from "react";
import "../../../src/App.css";
import "react-vis/dist/style.css";
import api from "../util/apis";
import { Typography } from "antd";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  VerticalBarSeries,
  HeatmapSeries,
  LineSeries,
  AreaSeries,
  RadialChart,
  Hint
} from "react-vis";
const { Text } = Typography;

export default class Graph5 extends Component {
  state = {
    value: false,
    name: "",
    calendars: [],
    projects: []
  };

  componentDidMount() {
    this.getWeekNumber(new Date());
    this.refreshCalendars();
    this.refreshProjects();
  }
  refreshCalendars = () => {
    api.getCalendars().then(calendars => {
      this.setState({ calendars: calendars });
    });
  };
  refreshProjects = () => {
    api.getProjects().then(projects => {
      this.setState({ projects: projects });
    });
  };
  getWeekNumber = d => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));

    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

    var year = d.getUTCFullYear();
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

    this.setState({ week: weekNo, year: year });
  };

  render() {
    const { value } = this.state;
    const Allprojects = this.state.projects;

    const mappingOfWorks = this.state.calendars
      .filter(e => e.year === this.state.year)
      .filter(
        f => f.week <= this.state.week - 1 && f.week > this.state.week - 5
      )
      .map(e => e.works);

    var concat = [];
    for (var j = 0; j < mappingOfWorks.length; j++) {
      concat = mappingOfWorks[j].concat(concat);
    }

    const DataString = [];
    for (var k = 0; k < Allprojects.length; k++) {
      const mappingOfWorks = concat
        .filter(e => e.project === Allprojects[k]._id)
        .map(
          f =>
            f.lundi +
            f.mardi +
            f.mercredi +
            f.jeudi +
            f.vendredi +
            f.samedi +
            f.dimanche
        )
        .reduce((acc, curV) => acc + curV, 0);

      DataString.push({
        Project: Allprojects[k].title,
        theta: Math.floor((mappingOfWorks / 8) * 100) / 100
      });
    }
    DataString.sort(function(a, b) {
      return b.theta - a.theta;
    });

    const FirstData = DataString.slice(0, 5);

    const Rest = DataString.slice(5, DataString.length);
    const RestReduced = Rest.map(e => e.theta).reduce(
      (acc, curV) => acc + curV,
      0
    );
    const RestObject = [{ Project: "All others", theta: RestReduced }];

    const DataSource = FirstData.concat(RestObject);

    return (
      <div>
        <div className="textBadge">
          <Text code>Top 5 projets - cumul 4 semaines</Text>
        </div>
        <div>
          <RadialChart
            innerRadius={77}
            radius={100}
            getAngle={d => d.theta}
            colorRange={[
              "#eeeeee",
              "#03B96C",
              "#dddddd",
              "#cccccc",
              "#bbbbbb",
              "#aaaaaa"
            ]}
            data={DataSource}
            onValueMouseOver={v => {
              this.setState({ value: v });
              console.log(v);
            }}
            onSeriesMouseOut={v => this.setState({ value: false })}
            width={280}
            height={260}
            padAngle={0.02}
          >
            {value !== false && (
              <Hint
                value={value}
                format={v => [
                  { title: "Projet", value: v.Project },
                  { title: "Temps passé", value: `${v.theta} jours` }
                ]}
              />
            )}
          </RadialChart>
        </div>
      </div>
    );
  }
}
