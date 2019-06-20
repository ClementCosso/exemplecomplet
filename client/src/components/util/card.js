import React, { Component } from "react";
import { Card, Icon, Avatar } from "antd";
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
            <Icon type="edit" />,
            <Icon type="snippets" />,
            <Icon type="delete" />
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
        ,
      </div>
    );
  }
}

export default TeamCard;
