import React, { Component } from "react";
import { LocaleProvider } from "antd";
import fr_FR from "antd/lib/locale-provider/fr_FR";
import "moment/locale/fr";

import { Select, Table, Progress } from "antd";

import api from "../util/apis";

const { Option } = Select;

class QuarterlyResults extends Component {
  state = {
    calendars: [],
    projects: []
  };

  getWeekNumber = d => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));

    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

    var year = d.getUTCFullYear();
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

    this.setState({ week: weekNo, year: year });
  };

  refreshCalendars = () => {
    api.getAllCalendars().then(calendars => {
      this.setState({ calendars: calendars });
      this.refreshProjects();
    });
  };

  refreshProjects = () => {
    api.getProjects().then(projects => {
      this.setState({ projects: projects });
      this.getDataSource();
    });
  };

  getDataSource() {
    const Allprojects = this.state.projects;
    const q1array = [];
    const q2array = [];
    const q3array = [];
    const q4array = [];

    for (var i = 0; i < Allprojects.length; i++) {
      const mappingOfWorks = this.state.calendars
        .filter(e => e.week < 13)
        .map(e => e.works);

      var concat = [];
      for (var j = 0; j < mappingOfWorks.length - 1; j++) {
        concat = mappingOfWorks[j].concat(concat);
      }

      const q1BeforeSum = concat.filter(e => e.project === Allprojects[i]._id);
      const q1AfterSum = q1BeforeSum
        .map(
          e =>
            e.lundi +
            e.mardi +
            e.mercredi +
            e.jeudi +
            e.vendredi +
            e.samedi +
            e.dimanche
        )
        .reduce((acc, curr) => acc + curr, 0);

      q1array.push({
        project: Allprojects[i].title,
        Q1: Math.floor(q1AfterSum / 8)
      });
    }

    for (var i = 0; i < Allprojects.length; i++) {
      const mappingOfWorks = this.state.calendars
        .filter(e => (e.week > 13) & (e.week <= 26))
        .map(e => e.works);

      var concat = [];
      for (var j = 0; j < mappingOfWorks.length - 1; j++) {
        concat = mappingOfWorks[j].concat(concat);
      }

      const q2BeforeSum = concat.filter(e => e.project === Allprojects[i]._id);
      const q2AfterSum = q2BeforeSum
        .map(
          e =>
            e.lundi +
            e.mardi +
            e.mercredi +
            e.jeudi +
            e.vendredi +
            e.samedi +
            e.dimanche
        )
        .reduce((acc, curr) => acc + curr, 0);

      q2array.push({
        project: Allprojects[i].title,
        Q2: Math.floor(q2AfterSum / 8)
      });
    }

    for (var i = 0; i < Allprojects.length; i++) {
      const mappingOfWorks = this.state.calendars
        .filter(e => (e.week > 26) & (e.week <= 40))
        .map(e => e.works);

      var concat = [];
      for (var j = 0; j < mappingOfWorks.length - 1; j++) {
        concat = mappingOfWorks[j].concat(concat);
      }

      const q3BeforeSum = concat.filter(e => e.project === Allprojects[i]._id);
      const q3AfterSum = q3BeforeSum
        .map(
          e =>
            e.lundi +
            e.mardi +
            e.mercredi +
            e.jeudi +
            e.vendredi +
            e.samedi +
            e.dimanche
        )
        .reduce((acc, curr) => acc + curr, 0);

      q3array.push({
        project: Allprojects[i].title,
        Q3: Math.floor(q3AfterSum / 8)
      });
    }

    for (var i = 0; i < Allprojects.length; i++) {
      const mappingOfWorks = this.state.calendars
        .filter(e => e.week > 40)
        .map(e => e.works);

      var concat = [];
      for (var j = 0; j < mappingOfWorks.length - 1; j++) {
        concat = mappingOfWorks[j].concat(concat);
      }

      const q4BeforeSum = concat.filter(e => e.project === Allprojects[i]._id);
      const q4AfterSum = q4BeforeSum
        .map(
          e =>
            e.lundi +
            e.mardi +
            e.mercredi +
            e.jeudi +
            e.vendredi +
            e.samedi +
            e.dimanche
        )
        .reduce((acc, curr) => acc + curr, 0);

      q4array.push({
        project: Allprojects[i].title,
        Q4: Math.floor(q4AfterSum / 8)
      });
    }
    const results = [];
    const allconcat = q1array
      .concat(q2array)
      .concat(q3array)
      .concat(q4array);

    for (var i = 0; i < this.state.projects.length; i++) {
      const elem = this.state.projects[i].title;
      const array = allconcat.filter(e => e.project === elem);

      const returnedObject1 = Object.assign(array[0], array[1]);
      const returnedObject2 = Object.assign(returnedObject1, array[2]);
      const returnedObject3 = Object.assign(returnedObject2, array[3]);
      results.push(returnedObject3);
    }

    this.props.quarterly(results);
  }
  componentDidMount() {
    this.refreshCalendars();

    this.getWeekNumber(new Date());
  }

  render() {
    const Allprojects = this.state.projects;
    const q1array = [];
    const q2array = [];
    const q3array = [];
    const q4array = [];

    for (var i = 0; i < Allprojects.length; i++) {
      const mappingOfWorks = this.state.calendars
        .filter(e => e.week < 13)
        .map(e => e.works);

      var concat = [];
      for (var j = 0; j < mappingOfWorks.length - 1; j++) {
        concat = mappingOfWorks[j].concat(concat);
      }

      const q1BeforeSum = concat.filter(e => e.project === Allprojects[i]._id);
      const q1AfterSum = q1BeforeSum
        .map(
          e =>
            e.lundi +
            e.mardi +
            e.mercredi +
            e.jeudi +
            e.vendredi +
            e.samedi +
            e.dimanche
        )
        .reduce((acc, curr) => acc + curr, 0);

      q1array.push({
        project: Allprojects[i].title,
        Q1: Math.floor(q1AfterSum / 8)
      });
    }

    for (var i = 0; i < Allprojects.length; i++) {
      const mappingOfWorks = this.state.calendars
        .filter(e => (e.week > 13) & (e.week <= 26))
        .map(e => e.works);

      var concat = [];
      for (var j = 0; j < mappingOfWorks.length - 1; j++) {
        concat = mappingOfWorks[j].concat(concat);
      }

      const q2BeforeSum = concat.filter(e => e.project === Allprojects[i]._id);
      const q2AfterSum = q2BeforeSum
        .map(
          e =>
            e.lundi +
            e.mardi +
            e.mercredi +
            e.jeudi +
            e.vendredi +
            e.samedi +
            e.dimanche
        )
        .reduce((acc, curr) => acc + curr, 0);

      q2array.push({
        project: Allprojects[i].title,
        Q2: Math.floor(q2AfterSum / 8)
      });
    }

    for (var i = 0; i < Allprojects.length; i++) {
      const mappingOfWorks = this.state.calendars
        .filter(e => (e.week > 26) & (e.week <= 40))
        .map(e => e.works);

      var concat = [];
      for (var j = 0; j < mappingOfWorks.length - 1; j++) {
        concat = mappingOfWorks[j].concat(concat);
      }

      const q3BeforeSum = concat.filter(e => e.project === Allprojects[i]._id);
      const q3AfterSum = q3BeforeSum
        .map(
          e =>
            e.lundi +
            e.mardi +
            e.mercredi +
            e.jeudi +
            e.vendredi +
            e.samedi +
            e.dimanche
        )
        .reduce((acc, curr) => acc + curr, 0);

      q3array.push({
        project: Allprojects[i].title,
        Q3: Math.floor(q3AfterSum / 8)
      });
    }

    for (var i = 0; i < Allprojects.length; i++) {
      const mappingOfWorks = this.state.calendars
        .filter(e => e.week > 40)
        .map(e => e.works);

      var concat = [];
      for (var j = 0; j < mappingOfWorks.length - 1; j++) {
        concat = mappingOfWorks[j].concat(concat);
      }

      const q4BeforeSum = concat.filter(e => e.project === Allprojects[i]._id);
      const q4AfterSum = q4BeforeSum
        .map(
          e =>
            e.lundi +
            e.mardi +
            e.mercredi +
            e.jeudi +
            e.vendredi +
            e.samedi +
            e.dimanche
        )
        .reduce((acc, curr) => acc + curr, 0);

      q4array.push({
        project: Allprojects[i].title,
        Q4: Math.floor(q4AfterSum / 8)
      });
    }
    const results = [];
    const allconcat = q1array
      .concat(q2array)
      .concat(q3array)
      .concat(q4array);

    for (var i = 0; i < this.state.projects.length; i++) {
      const elem = this.state.projects[i].title;
      const array = allconcat.filter(e => e.project === elem);

      const returnedObject1 = Object.assign(array[0], array[1]);
      const returnedObject2 = Object.assign(returnedObject1, array[2]);
      const returnedObject3 = Object.assign(returnedObject2, array[3]);
      results.push(returnedObject3);
    }

    return (
      <div>
        <div>
          <Table
            pagination={{ pageSize: 8 }}
            columns={[
              {
                title: "Project",
                dataIndex: "project",
                key: "project",
                width: 50
              },

              {
                title: "Q1",
                width: 100,
                key: "Q1",
                dataIndex: "Q1"
              },
              {
                title: "Q2",
                width: 50,
                key: "Q2",
                dataIndex: "Q2"
              },
              {
                title: "Q3",
                width: 50,
                key: "Q3",
                dataIndex: "Q3"
              },
              {
                title: "Q4",
                width: 50,
                key: "Q4",
                dataIndex: "Q4"
              }
            ]}
            dataSource={results}
          />
        </div>
      </div>
    );
  }
}

export default QuarterlyResults;
