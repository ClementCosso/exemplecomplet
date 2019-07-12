import React, { Component } from "react";
import axios from "axios";
import { Button } from "antd";

class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .delete("http://localhost:3001/api/logout", { withCredentials: true })
      .then(response => {
        console.log("Login Page", response.data);
        const { userDoc } = response.data;
        // send "userDoc" to the App.js function that changes "currentUser"
        this.props.onUserChange(userDoc);
      })
      .catch(err => {
        if (err.response && err.response.data) {
          // console.error("API response", err.response.data)
          return this.setState({ message: err.response.data.message });
        }
      });
  }

  render() {
    return (
      <Button
        ghost
        shape="round"
        type="primary"
        icon="logout"
        onClick={event => this.handleSubmit(event)}
      >
        Logout
      </Button>
    );
  }
}

export default Logout;
