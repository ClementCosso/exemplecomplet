import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Icon, Input, Button } from "antd";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      originalPassword: "",
      message: null,
      redirect: false
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post(
        "http://localhost:3001/api/login",
        this.state,
        { withCredentials: true } // FORCE axios to send cookies across domains
      )
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
    return this.state.redirect ? (
      <Redirect to="/dashboard" />
    ) : (
      <section className="LoginPage">
        <h2>Log In</h2>

        <form className="login-form">
          <Input
            value={this.state.email}
            onChange={event => this.genericSync(event)}
            type="email"
            name="email"
            placeholder="tagadata@relevanc.com"
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            onPressEnter={event => this.handleSubmit(event)}
          />
          <Input
            value={this.state.originalPassword}
            onChange={event => this.genericSync(event)}
            type="password"
            name="originalPassword"
            placeholder="Password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            onPressEnter={event => this.handleSubmit(event)}
          />

          <Button onClick={event => this.handleSubmit(event)}>Log In</Button>
        </form>
        {this.state.message && <div> {this.state.message} </div>}
      </section>
    );
  }
}

export default Login;
