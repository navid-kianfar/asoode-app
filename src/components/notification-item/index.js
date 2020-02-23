import React, { Component } from "react";
import { View, Text, Card, CardItem, Left, Body } from "native-base";
import PropTypes from "prop-types";
import Styles from "./styles";
import Thumbnail from "../elements/thumbnail";
import Moment from "react-moment";
import { NotificationDTO } from "../../dtos/notification.dtos";

const MomentText = props => {
  return <Text note>{props.children}</Text>;
};
export default class NotificationItem extends Component {
  static propTypes = {
    data: PropTypes.shape(NotificationDTO)
  };
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  render() {
    const member = this.props.data.user || this.props.data.member;
    return (
      <Card noBorder noShadow>
        <CardItem dir thumbnail>
          <Left>
            <Thumbnail small source={member.avatar} title={member.initials} />
          </Left>
          <Body>
            <Text bold>{this.props.data.title}</Text>
            <Text>{this.props.data.description}</Text>
            <Moment locale="fa" element={MomentText} local fromNow>
              {this.props.data.createdAt}
            </Moment>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
