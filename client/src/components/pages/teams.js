import React, { Component } from "react";
import TeamCard from "../util/card";
import api from "../util/apis";
import {
  Button,
  Input,
  Drawer,
  Form,
  Col,
  Row,
  Select,
  Checkbox,
  DatePicker,
  Switch,
  Icon
} from "antd";
import { Link } from "react-router-dom";
import SubNavbar from "../util/subNavbar";
import newUserDrawer from "../util/newUserDrawer";

const { Search } = Input;
const { Option } = Select;

class Teams extends Component {
  state = {
    team: [],
    search: "",
    visible: false,
    username: "",
    email: "",
    password: "",
    avatar: "",
    image: "",
    quote: "",
    administrator: false,
    freelance: false,
    teamleader: false,
    role: ""
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
  refreshTeams = () => {
    api.getTeams().then(team => {
      this.setState({ team: team });
      this.setState({
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
      });
    });
  };

  componentDidMount() {
    this.refreshTeams();
  }

  deleteUser = keyId => {
    api.deleteUser(keyId).then(_ => {
      this.refreshTeams();
    });
  };

  handleChange(e) {
    let { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handleSelectChange = val => {
    this.setState({ role: val });
  };

  addNewUser = e => {
    api.addNewUser(this.state).then(res => this.setState({ redirect: true }));
    this.refreshTeams();
  };
  handleFreeChange = e => {
    this.setState({ freelance: e.target.checked });
  };
  handleAdminChange = e => {
    this.setState({ administrator: e.target.checked });
  };

  editUser(e) {
    api.editUser(e).then(res => this.refreshTeams());
  }

  render() {
    return (
      <div>
        <div className="subnavbar">
          <div className="subcontent">
            <Search
              className="searchBar"
              placeholder="Rechercher un babtou"
              id="search"
              value={this.state.search}
              onChange={e => this.handleChange(e)}
              enterButton
            />

            <div>
              <Button
                ghost
                type="primary"
                shape="round"
                onClick={this.showDrawer}
              >
                <Icon type="plus" /> Nouveau profil
              </Button>
              <div className="drawer">
                <Drawer
                  title="Créer un nouveau profil"
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
                            <Option value="Data Scientist">
                              Data Scientist
                            </Option>
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
                              id="freelance"
                              checked={this.state.freelance}
                              onChange={this.handleFreeChange}
                            >
                              Freelance
                            </Checkbox>
                          </div>
                          <div className="form-checkbox">
                            {" "}
                            <Checkbox
                              id="administrator"
                              checked={this.state.administrator}
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
                      Ajouter
                    </Button>
                  </div>
                </Drawer>
              </div>
            </div>
          </div>
        </div>

        <div className="team-container">
          {this.state.team
            .filter(e => !e.hidden)
            .filter(e => {
              return e.username
                .toUpperCase()
                .includes(this.state.search.toUpperCase());
            })
            .map((e, index) => (
              <TeamCard
                key={index}
                edit={e}
                title={e.username}
                description={e.role}
                deleteUser={this.deleteUser}
                getUser={this.getUser}
                keyId={e._id}
                image={e.image}
                editUser={this.editUser.bind(this)}
                afteredit={this.refreshTeams}
              />
            ))}{" "}
        </div>
      </div>
    );
  }
}

export default Teams;
