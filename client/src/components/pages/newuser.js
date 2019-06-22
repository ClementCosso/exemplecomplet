import React, { Component } from "react";
import api from "../util/apis";
import { Redirect } from "react-router-dom";
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

class NewUser extends Component {
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

  addNewUser = e => {
    api.addNewUser(this.state).then(res => this.setState({ redirect: true }));
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
          />
          <Input
            placeholder="Email"
            id="email"
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            value={this.state.email}
            onChange={this.handleChange}
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

          <Checkbox id="teamleader" onChange={this.handleChange}>
            Team Leader
          </Checkbox>
          <Checkbox id="employee" onChange={this.handleChange}>
            Interne (vs.freelance)
          </Checkbox>
          <Checkbox id="administrator" onChange={this.handleChange}>
            Admin
          </Checkbox>
        </div>
        <Button onClick={this.addNewUser}>Ajouter</Button>
      </div>
    );
  }
}

export default NewUser;
