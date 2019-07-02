import React, { Component } from "react";
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
import ProjectModal from "../util/editProjectModal";
import { Link } from "react-router-dom";
import api from "../util/apis";
const { Search } = Input;
const { Option } = Select;

class TableofProjects extends Component {
  state = {
    // drawerOpen: false,
    visible: false,
    title: "",
    description: "",
    owner: "",
    id: ""
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
    console.log(this.state);
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  handleChange(e) {
    let { id, value } = e.target;
    this.setState({ [id]: value });
  }

  refreshProjects = () => {
    this.props.refreshProjects();
  };

  render() {
    return (
      <div>
        <Table
          columns={[
            {
              title: "Nom du projet",
              dataIndex: "name",
              key: "name",
              width: 200
            },
            {
              title: "Description du projet",
              dataIndex: "description",
              key: "description",
              width: 650
            },

            {
              title: "Owner",
              width: 200,
              key: "owner",
              dataIndex: "owner",
              render: tag => (
                <span>
                  <Tag color="geekblue" key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                </span>
              )
            },
            {
              title: "Actions",
              key: "action",
              render: (text, record) => (
                <span>
                  <Link>
                    <Icon
                      color="black"
                      onClick={() => {
                        // this.toggleChildMenu();
                        this.setState({
                          title: record.name,
                          description: record.description,
                          owner: record.owner,
                          id: record.key
                        });
                        this.showDrawer();
                      }}
                      type="edit"
                    />
                  </Link>

                  <Divider type="vertical" />
                  <Link>
                    <Icon
                      onClick={() => this.props.deleteProject(record.key)}
                      type="delete"
                    />
                  </Link>
                </span>
              )
            }
          ]}
          dataSource={this.props.dataSource.map(e => ({
            name: e.title,
            description: e.description,
            owner: e.owner,
            key: e._id
          }))}
        />

        <div>
          <Drawer
            title={`Editer le projet ${this.state.title}`}
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
                  this.props.editProject(this.state);
                  this.refreshProjects();
                }}
                type="primary"
              >
                Editer
              </Button>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default TableofProjects;
