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
  Hint,
  MarkSeries
} from "react-vis";

const { Text } = Typography;

export default class Graph3 extends Component {
  state = {
    value: false,
    name: "",
    calendars: [],
    projects: [],
    week: 0
  };
  componentDidMount() {
    this.getWeekNumber(new Date());
    this.refreshCalendars();
    this.refreshProjects();
  }
  refreshCalendars = () => {
    api.getAllCalendars().then(calendars => {
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
    const myData = [
      { x: 1, y: 10, size: 30 },
      { x: 1.7, y: 12, size: 30 },
      { x: 2, y: 5, size: 30 },
      { x: 3, y: 15, size: 30 },
      { x: 2.5, y: 7, size: 30 }
    ];
    const Allprojects = this.state.projects;

    const mappingOfWorks = this.state.calendars
      .filter(e => e.year === this.state.year)
      .filter(f => f.week >= this.state.week - 8);

    const ListOfWorks = [];
    for (var i = 0; i < mappingOfWorks.length - 1; i++) {
      for (var j = 0; j < mappingOfWorks[i].works.length - 1; j++) {
        const clearedProject = mappingOfWorks[i].works[j];
        const sumOfDays =
          clearedProject.lundi +
          clearedProject.mardi +
          clearedProject.mercredi +
          clearedProject.jeudi +
          clearedProject.vendredi +
          clearedProject.samedi +
          clearedProject.dimanche;

        ListOfWorks.push({
          project: clearedProject.project,
          timeSpent: sumOfDays,
          user: mappingOfWorks[i].user
        });
      }
    }

    const DataTime = [];
    for (var k = 0; k < Allprojects.length; k++) {
      const Time = ListOfWorks.filter(e => e.project === Allprojects[k]._id)
        .map(e => e.timeSpent)
        .reduce((acc, curV) => acc + curV, 0);
      DataTime.push({
        name: Allprojects[k].title,
        size: 1,
        x: Math.floor((Time / 8) * 100) / 100
      });
    }

    const DataPeople = [];
    for (var k = 0; k < Allprojects.length; k++) {
      const People = ListOfWorks.filter(e => e.project === Allprojects[k]._id)
        .map(e => e.user)
        .sort();
      const clearedPeople = [...new Set(People)];

      DataPeople.push({ name: Allprojects[k].title, y: clearedPeople.length });
    }

    const dataBrute = [];
    for (var l = 0; l < DataPeople.length; l++) {
      const returnedTarget = Object.assign(DataTime[l], DataPeople[l]);

      dataBrute.push(returnedTarget);
    }

    const dataSource = dataBrute.filter(e => e.x !== 0 && e.y !== 0);

    return (
      <div>
        <div className="textBadge">
          <Text code>Allocation des ressources - cumul 8 semaines</Text>
        </div>
        <div className="graph3">
          <XYPlot width={620} height={475}>
            <XAxis title="Temps passé en jours" />
            <YAxis title="# personnes impliquées" />
            <VerticalGridLines />
            <HorizontalGridLines />
            <MarkSeries
              color={["#03B96C"]}
              strokeWidth={1}
              opacity="1"
              sizeRange={[0, 7]}
              data={dataSource}
            />
          </XYPlot>
        </div>
      </div>
    );
  }
}
