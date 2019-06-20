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

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class NewUser extends Component {
  state = {
    redirect: false,
    username: "",
    email: "",
    password: "",
    avatar: "",
    image: "",
    quote: "",
    administrator: "",
    teamleader: "",
    employee: "",
    role: ""
  };

  //   componentDidMount() {
  //     api.getTeams().then(team => {
  //       this.setState({ team: team });
  //     });
  //   }

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  render() {
    return this.state.redirect ? (
      <Redirect to="/beers" />
    ) : (
      <div>
        <div className="container">
          <Input
            placeholder="    Prénom et Nom"
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
            placeholder="    Email"
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            value="email"
            onChange={this.handleChange}
            // suffix={
            //   <Tooltip title="Extra information">
            //     <Icon type="info-circle" style={{ color: "rgba(0,0,0,.45)" }} />
            //   </Tooltip>
            // }
          />
          <Input.Password
            placeholder="    Mot de passe"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            value="password"
            onChange={this.handleChange}
          />
          <Select
            value="role"
            onChange={this.handleChange}
            showSearch
            prefix={
              <Icon type="usergroup-add" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="        Fonction"
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
            placeholder="    Photo URL"
            onChange={this.handleChange}
            prefix={<Icon type="reddit" style={{ color: "rgba(0,0,0,.25)" }} />}
            value="image"
          />

          <Input
            value="avatar"
            onChange={this.handleChange}
            placeholder="    Avatar URL"
            prefix={
              <Icon type="aliwangwang" style={{ color: "rgba(0,0,0,.25)" }} />
            }
          />
        </div>
        <Button onClick={this.addNewBeer}>Ajouter</Button>
      </div>
    );
  }
}

export default NewUser;
