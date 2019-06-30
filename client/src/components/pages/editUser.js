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
import SubNavbar from "../util/subNavbar";
const { Search } = Input;

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
    freelance: false,
    role: ""
  };

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleSelectChange = val => {
    this.setState({ role: val });
  };

  handleFreeChange = e => {
    this.setState({ freelance: e.target.checked });
  };
  handleAdminChange = e => {
    this.setState({ freelance: e.target.checked });
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
        freelance: user.freelance,
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
        <div className="subnavbar">
          <div className="subcontent">
            <Search
              disabled
              className="searchBar"
              placeholder="Rechercher"
              name="search"
              value={this.state.search}
              onChange={e => this.handleChange(e)}
              enterButton
            />
            <div className="actionButton">
              <div>
                <Button
                  type="danger"
                  shape="round"
                  icon="android"
                  onClick={this.editUser}
                >
                  Editer
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="form-container">
          <div className="form-input">
            <Input
              placeholder="Prénom et Nom"
              id="username"
              prefix={
                <Icon type="android" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <Input
              placeholder="Email"
              id="email"
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <Input.Password
              id="password"
              placeholder="Mot de passe"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <Input
              id="image"
              placeholder="Photo URL"
              onChange={this.handleChange}
              prefix={
                <Icon type="reddit" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              value={this.state.image}
            />
          </div>

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
          <div className="checkboxes">
            <div className="form-checkbox">
              <Checkbox
                checked={this.state.freelance}
                id="freelance"
                onChange={this.handleFreeChange}
              >
                Freelance
              </Checkbox>
            </div>
            <div className="form-checkbox">
              {" "}
              <Checkbox
                checked={this.state.administrator}
                id="administrator"
                onChange={this.handleChange}
              >
                Admin
              </Checkbox>
            </div>
          </div>
        </div>
        {/* <Button onClick={this.addNewUser}>Ajouter</Button> */}
      </div>
    );
  }
}

export default withRouter(EditUser);
