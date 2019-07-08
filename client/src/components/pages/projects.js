import React, { Component } from "react";
import api from "../util/apis";
import TableofProjects from "../util/tableofProjects";
import ActionProject from "../util/actionProject";
import {
  Icon,
  Button,
  Input,
  Drawer,
  Form,
  Col,
  Row,
  Select,
  Checkbox,
  DatePicker,
  Table,
  Divider,
  Tag
} from "antd";
import { Link } from "react-router-dom";
import ProjectModal from "../util/editProjectModal";
import SubNavbar from "../util/subNavbar";
const { Search } = Input;
const { Option } = Select;
class Projects extends Component {
  state = {
    Action: "Ajouter",
    projects: [],
    search: "",
    visible: false,
    title: "",
    description: "",
    owner: ""
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

  refreshProjects = () => {
    api.getProjects().then(projects => {
      this.setState({ projects: projects });
      this.setState({
        title: "",
        owner: "",
        description: ""
      });
    });
  };

  componentDidMount() {
    this.refreshProjects();
  }

  deleteProject = key => {
    api.deleteProject(key).then(_ => {
      this.refreshProjects();
    });
  };

  addNewProject = e => {
    const project = {
      title: this.state.title,
      description: this.state.description,
      owner: this.state.owner
    };
    api.addNewProject(project).then(_ => {
      this.refreshProjects();
    });
  };

  handleChange(e) {
    let { id, value } = e.target;
    this.setState({ [id]: value });
  }

  editProject(e) {
    api.editProject(e).then(res => this.refreshProjects());
  }

  render() {
    return (
      <div>
        <div className="subnavbar">
          <div className="subcontent">
            <Search
              className="searchBar"
              placeholder="Rechercher un projet"
              id="search"
              value={this.state.search}
              onChange={e => this.handleChange(e)}
              enterButton
            />

            <div>
              <Button
                ghost
                shape="round"
                type="primary"
                onClick={this.showDrawer}
              >
                <Icon type="plus" /> Nouveau projet
              </Button>
              <Drawer
                title="Créer un nouveau projet"
                width={720}
                onClose={this.onClose}
                visible={this.state.visible}
              >
                {}
                <Form layout="vertical" hideRequiredMark>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="Nom">
                        <Input
                          id="title"
                          placeholder="Nom du projet"
                          prefix={
                            <Icon
                              type="bulb"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          value={this.state.title}
                          onChange={e => this.handleChange(e)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="Owner">
                        <Input
                          id="owner"
                          placeholder="Owner"
                          prefix={
                            <Icon
                              type="crown"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          value={this.state.owner}
                          onChange={e => this.handleChange(e)}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="Description">
                        <Input
                          id="description"
                          placeholder="Description du projet"
                          prefix={
                            <Icon
                              type="experiment"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          value={this.state.description}
                          onChange={e => this.handleChange(e)}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
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
                      this.addNewProject();
                      this.refreshProjects();
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

        <div className="projectPage">
          <div className="projectsTableContainer">
            <TableofProjects
              deleteProject={this.deleteProject}
              dataSource={this.state.projects.filter(e => {
                return e.title
                  .toUpperCase()
                  .includes(this.state.search.toUpperCase());
              })}
              refreshProjects={this.refreshProjects}
              editProject={this.editProject}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
