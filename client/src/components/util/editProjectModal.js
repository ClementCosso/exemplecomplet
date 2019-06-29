import {
  Modal,
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
import React, { Component } from "react";
import api from "../util/apis";
const { TextArea } = Input;

class ProjectModal extends Component {
  state = {
    visible: false,
    title: this.props.title,
    description: this.props.description,
    owner: this.props.owner
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
      description: nextProps.description,
      owner: nextProps.owner,
      id: nextProps.id,
      visible: nextProps.drawerOpen
    });
  }

  render() {
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={() => {
            this.props.changeOnClose();
            this.handleOk();
            this.props.editProject(this.state);
            this.props.refreshProjects();
          }}
          onCancel={() => {
            this.props.changeOnClose();
            this.handleCancel();
          }}
        >
          <Input
            id="title"
            name="title"
            value={this.state.title}
            prefix={<Icon type="bulb" style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={this.handleChange}
          />

          <TextArea
            name="description"
            value={this.state.description}
            autosize={{ minRows: 2, maxRows: 6 }}
            id="description"
            prefix={
              <Icon type="file-search" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            onChange={this.handleChange}
          />
          <Input
            name="owner"
            id="owner"
            prefix={<Icon type="crown" style={{ color: "rgba(0,0,0,.25)" }} />}
            value={this.state.owner}
            onChange={this.handleChange}
          />
        </Modal>
      </div>
    );
  }
}

export default ProjectModal;
