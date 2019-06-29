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
  AutoComplete,
  Card
} from "antd";

const { TextArea } = Input;

class ActionProject extends Component {
  state = {
    title: "",
    description: "",
    owner: ""
  };

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleSelectChange = val => {
    this.setState({ owner: val });
  };

  render() {
    return (
      <div>
        <Card
          title="Nouveau Projet"
          extra={
            <a
              onClick={() => {
                this.props.actionProject(
                  this.state.title,
                  this.state.description,
                  this.state.owner
                );
                this.setState({ title: "", description: "", owner: "" });
              }}
            >
              Ajouter
            </a>
          }
          style={{ width: 300 }}
        >
          <p>
            {" "}
            <Input
              placeholder="Nom du projet"
              id="title"
              prefix={<Icon type="bulb" style={{ color: "rgba(0,0,0,.25)" }} />}
              value={this.state.title}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <TextArea
              placeholder="Description"
              autosize={{ minRows: 2, maxRows: 6 }}
              id="description"
              prefix={
                <Icon type="file-search" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              value={this.state.description}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <Input
              placeholder="Owner"
              id="owner"
              prefix={
                <Icon type="crown" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              value={this.state.owner}
              onChange={this.handleChange}
            />
          </p>
        </Card>
      </div>
    );
  }
}

export default ActionProject;
