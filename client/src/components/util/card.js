import React, { Component } from "react";
import { Card, Icon, Avatar } from "antd";
import api from "../util/apis";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
const { Meta } = Card;

class TeamCard extends Component {
  render() {
    return (
      <div>
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
            <Link to={`/teams/edit/${this.props.keyId}`}>
              <Icon type="edit" />
            </Link>,
            <Icon
              onClick={() => this.props.deleteUser(this.props.keyId)}
              type="delete"
            />
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={this.props.title}
            description={this.props.description}
          />
        </Card>
      </div>
    );
  }
}

export default TeamCard;
