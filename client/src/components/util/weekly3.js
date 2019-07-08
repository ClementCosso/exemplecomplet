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
  Tag
} from "antd";
import ProjectModal from "../util/editProjectModal";
import { Link } from "react-router-dom";
import api from "../util/apis";
const { Search } = Input;
const { Option } = Select;

class Weekly3 extends Component {
  state = {
    calendars: []
  };

  refreshCalendars = () => {
    api.getAllCalendars().then(calendars => {
      this.setState({ calendars: calendars });
    });
  };

  componentDidMount() {
    this.refreshCalendars();
  }

  render() {
    const DataSource = this.state.calendars;
    // console.log(this.state.calendars);
    const Source = [];
    for (let j = 2019; j < 2020; j++) {
      for (let i = 0; i < 53; i++) {
        const dataSorted = DataSource.filter(e => e.year === j)
          .filter(e => e.week === i)
          .map(
            e => e.works
            // .map(f => f.lundi);
          );
        const concat = [];

        for (var k = 0; k < dataSorted.length - 1; k++) {
          concat = concat.concat(dataSorted[k]);
        }

        const DataSortedConcat = concat.map(
          f =>
            f.lundi +
            f.mardi +
            f.mercredi +
            f.jeudi +
            f.vendredi +
            f.samedi +
            f.dimanche
        );

        const NewData = [];
        if (DataSortedConcat.length > 0) {
          NewData =
            Math.floor(
              (DataSortedConcat.reduce((ac, currV) => ac + currV) / 8) * 100
            ) / 100;

          Source.unshift({ year: j, week: i, days: NewData });
          console.log(Source);
        }
      }
    }

    return (
      <div>
        <div>
          <Table
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
                title: "Action",
                key: "action",

                width: 70,
                render: (text, record) => (
                  <span>
                    <Link>
                      <Icon
                        onClick={() =>
                          this.props.date(record.year, record.week)
                        }
                        type="dashboard"
                      />
                    </Link>
                  </span>
                )
              }
            ]}
            dataSource={Source}
          />
        </div>
      </div>
    );
  }
}

export default Weekly3;
