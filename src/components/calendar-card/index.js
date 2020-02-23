import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Body, Left, H3, Text, View, Card } from "native-base";
import { Colors } from "../../themes/variables";
import Styles from "./styles";
import GS from "../../themes/general-styles";
import Members from "../members";
import PropTypes from "prop-types";
import { CalendarCardItemDTO } from "../../dtos/card.dtos";
import { TaskState } from "../../library/enums";
import Moment from "react-moment";
import { getStateColor } from "../../library/general-helpers";

const MomentText = props => {
  return <Text note>{props.children}</Text>;
};
export default class CalendarCard extends Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
    data: PropTypes.shape(CalendarCardItemDTO)
  };
  state = {};
  goToCard = () => {
    this.props.navigation.navigate("Card", this.props.data);
  };
  componentDidMount() {
    this.setState({ color: getStateColor(this.props.data.state) });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.goToCard}
        activeOpacity={0.9}
        key={this.props.data.id}
        style={GS.mx2}
      >
        <Card style={GS.overflowHidden}>
          <View style={[GS.px3, GS.py3, GS.rowDir]}>
            <View style={Styles.timeContainer}>
              {this.props.data.startDate ? (
                <Moment locale="fa" element={H3} local format="HH:mm">
                  {this.props.data.startDate}
                </Moment>
              ) : null}
              <Moment locale="fa" element={MomentText} local format="HH:mm">
                {this.props.data.dueDate}
              </Moment>
            </View>
            <Body
              style={[
                GS.alignItemsStartDir,
                GS.ps2,
                Styles.calendarCardBody,
                { borderColor: this.state.color }
              ]}
            >
              <Text style={[GS.mb2, { color: this.state.color }]}>
                {this.props.data.boardTitle}
              </Text>
              <Text style={GS.mb1}>{this.props.data.title}</Text>
              {this.props.data.description ? (
                <Text note>{this.props.data.description}</Text>
              ) : null}
              <Members style={GS.mt3} items={this.props.data.members} />
            </Body>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}
