import React, { Component } from "react";
import { Input } from "antd";
import SubNavbar from "../util/subNavbar";
const { Search } = Input;

class Dashboard extends Component {
  render() {
    return (
      <section>
        <SubNavbar />
      </section>
    );
  }
}

export default Dashboard;
