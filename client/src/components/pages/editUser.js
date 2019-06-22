import React, { Component } from "react";
import api from "../util/apis";
import { Redirect, withRouter } from "react-router-dom";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class EditUser extends Component {
  state = {
    redirect: false,
    username: "",
    email: "",
    password: "",
    avatar: "",
    image: "",
    quote: "",
    administrator: false,
    teamleader: false,
    employee: false,
    role: ""
  };

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleSelectChange = val => {
    this.setState({ role: val });
  };

  componentDidMount() {
    const { params } = this.props.match;

    api.getUser(params.userId).then(user => {
      this.setState({
        username: user.username,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        image: user.image,
        quote: user.quote,
        administrator: user.administrator,
        teamleader: user.teamleader,
        employee: user.employee,
        role: user.role
      });
    });
  }

  editUser = e => {
    const { params } = this.props.match;

    api
      .editUser(params.userId, this.state)
      .then(res => this.setState({ redirect: true }));
  };

  render() {
    return this.state.redirect ? (
      <Redirect to="/teams" />
    ) : (
      <div>
        <div className="container">
          <Input
            placeholder="Prénom et Nom"
            id="username"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            value={this.state.username}
            onChange={this.handleChange}
            // suffix={
            //   <Tooltip title="Extra information">
            //     <Icon type="info-circle" style={{ color: "rgba(0,0,0,.45)" }} />
            //   </Tooltip>
            // }
          />
          <Input
            placeholder="Email"
            id="email"
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            value={this.state.email}
            onChange={this.handleChange}
            // suffix={
            //   <Tooltip title="Extra information">
            //     <Icon type="info-circle" style={{ color: "rgba(0,0,0,.45)" }} />
            //   </Tooltip>
            // }
          />
          <Input.Password
            id="password"
            placeholder="Mot de passe"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Select
            id="role"
            onChange={this.handleSelectChange}
            showSearch
            prefix={
              <Icon type="usergroup-add" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Fonction"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Data Scientist">Data Scientist</Option>
            <Option value="Développeur">Développeur</Option>
            <Option value="Finance">Finance</Option>
            <Option value="Insigths & Mesure">Insigths & Mesure</Option>
            <Option value="Projet">Projet</Option>
            <Option value="UX/UI">UX/UI</Option>
            <Option value="Autre">Autre</Option>
          </Select>

          <Input
            id="image"
            placeholder="Photo URL"
            onChange={this.handleChange}
            prefix={<Icon type="reddit" style={{ color: "rgba(0,0,0,.25)" }} />}
            value={this.state.image}
          />

          <Input
            id="avatar"
            value={this.state.avatar}
            onChange={this.handleChange}
            placeholder="Avatar URL"
            prefix={
              <Icon type="aliwangwang" style={{ color: "rgba(0,0,0,.25)" }} />
            }
          />

          <Checkbox
            id="teamleader"
            checked={this.state.teamleader}
            onChange={this.handleSelectChange}
          >
            Team Leader
          </Checkbox>
          <Checkbox
            id="employee"
            checked={this.state.employee}
            onChange={this.handleSelectChange}
          >
            Interne (vs.freelance)
          </Checkbox>
          <Checkbox
            id="administrator"
            checked={this.state.administrator}
            onChange={this.handleSelectChange}
          >
            Admin
          </Checkbox>
        </div>
        <Button onClick={this.editUser}>Editer</Button>
      </div>
    );
  }
}

export default withRouter(EditUser);
