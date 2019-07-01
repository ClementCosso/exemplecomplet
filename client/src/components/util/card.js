import React, { Component } from "react";
import {
  Card,
  Icon,
  Avatar,
  Button,
  Input,
  Drawer,
  Form,
  Col,
  Row,
  Select,
  Checkbox,
  DatePicker
} from "antd";

import api from "../util/apis";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
const { Meta } = Card;
const { Option } = Select;
class TeamCard extends Component {
  state = {
    visible: false,
    username: "",
    email: "",
    password: "",
    image: "",
    administrator: false,
    freelance: false,
    role: ""
  };
  getUser = keyId => {
    api.getUser(keyId).then(user => {
      this.setState({
        username: user.username,
        email: user.email,
        password: user.password,
        image: user.image,
        administrator: user.administrator,
        freelance: user.freelance,
        role: user.role
      });
    });
  };
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  handleFreeChange = e => {
    this.setState({ freelance: e.target.value });
  };
  handleAdminChange = e => {
    this.setState({ administrator: e.target.value });
  };

  handleChange(e) {
    let { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handleSelectChange = val => {
    this.setState({ role: val });
  };

  render() {
    return (
      <div className="card">
        <Card
          hoverable
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <div>
              {/* <Link to={`/teams/edit/${this.props.keyId}`}> */}
              <Icon
                onClick={e => {
                  this.getUser(this.props.keyId);
                  this.showDrawer();
                }}
                type="edit"
              />
              <Drawer
                title={`Editer le profil de ${this.props.title}`}
                width={720}
                onClose={this.onClose}
                visible={this.state.visible}
              >
                <Form layout="vertical" hideRequiredMark>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Nom">
                        <Input
                          id="username"
                          placeholder="Prénom et Nom"
                          prefix={
                            <Icon
                              type="android"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          value={this.state.username}
                          onChange={e => this.handleChange(e)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Image">
                        <Input
                          id="image"
                          placeholder="URL de l'image"
                          prefix={
                            <Icon
                              type="reddit"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          value={this.state.image}
                          onChange={e => this.handleChange(e)}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Email">
                        <Input
                          id="email"
                          placeholder="Adresse email"
                          prefix={
                            <Icon
                              type="mail"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          value={this.state.email}
                          onChange={e => this.handleChange(e)}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Mot de Passe">
                        <Input.Password
                          id="password"
                          placeholder="Mot de passe"
                          prefix={
                            <Icon
                              type="lock"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          value={this.state.password}
                          onChange={e => this.handleChange(e)}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Role">
                        <Select
                          id="role"
                          onChange={e => this.handleSelectChange(e)}
                          showSearch
                          placeholder="Sélectionner la spécialité"
                        >
                          <Option value="Data Scientist">Data Scientist</Option>
                          <Option value="Développeur">Développeur</Option>
                          <Option value="Finance">Finance</Option>
                          <Option value="Insigths & Mesure">
                            Insigths & Mesure
                          </Option>
                          <Option value="Projet">Projet</Option>
                          <Option value="UX/UI">UX/UI</Option>
                          <Option value="Autre">Autre</Option>
                        </Select>
                      </Form.Item>
                    </Col>{" "}
                    <Col span={12}>
                      <div className="checkboxes">
                        <div className="form-checkbox">
                          <Checkbox
                            checked={this.state.freelance}
                            value="on"
                            onChange={this.handleFreeChange}
                          >
                            Freelance
                          </Checkbox>
                        </div>
                        <div className="form-checkbox">
                          {" "}
                          <Checkbox
                            checked={this.state.administrator}
                            value="on"
                            onChange={this.handleAdminChange}
                          >
                            Admin
                          </Checkbox>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Form>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    borderTop: "1px solid #e9e9e9",
                    padding: "10px 16px",
                    background: "#fff",
                    textAlign: "right"
                  }}
                >
                  <Button
                    shape="round"
                    onClick={this.onClose}
                    style={{ marginRight: 8 }}
                  >
                    Annuler
                  </Button>
                  <Button
                    shape="round"
                    onClick={e => {
                      this.onClose();
                      this.addNewUser();
                      this.refreshTeams();
                    }}
                    type="primary"
                  >
                    Editer
                  </Button>
                </div>
              </Drawer>
              {/* </Link> */}
            </div>,

            <Icon
              onClick={() => this.props.deleteUser(this.props.keyId)}
              type="delete"
            />
          ]}
        >
          <Meta title={this.props.title} description={this.props.description} />
        </Card>
      </div>
    );
  }
}

export default TeamCard;
