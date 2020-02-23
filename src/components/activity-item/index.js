import React, { Component } from "react";
import { Card, CardItem, Left, Body, Text, View } from "native-base";
import PropTypes from "prop-types";
import Styles from "./styles";
import Thumbnail from "../elements/thumbnail";
import { ActivityDTO } from "../../dtos/notification.dtos";
import Moment from "react-moment";

const MomentText = props => {
  return <Text note>{props.children}</Text>;
};
export default class ActivityItem extends Component {
  static propTypes = {
    data: PropTypes.shape(ActivityDTO)
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
            <Text>
              <Text bold>{member.fullName}</Text>
              <Text>{this.props.data.description}</Text>
            </Text>
            <Moment locale="fa" element={MomentText} local fromNow>
              {this.props.data.date}
            </Moment>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
