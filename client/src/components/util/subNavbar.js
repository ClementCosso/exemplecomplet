import React, { Component } from "react";

import { Input, Card } from "antd";
const { Search } = Input;

class SubNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  handleChange(e) {
    let { name, value } = e.target;
    {
      this.setState({ [name]: value });
      this.props.search(this.state.search);
    }
  }

  render() {
    return (
      <div className="subnavbar">
        <Search
          className="searchBar"
          placeholder="Rechercher"
          name="search"
          value={this.state.search}
          onChange={e => this.handleChange(e)}
          enterButton
        />
      </div>
    );
  }
}

export default SubNavbar;
