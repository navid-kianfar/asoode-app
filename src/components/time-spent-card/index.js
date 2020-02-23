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

const MomentText = props => {
  return <Text note>{props.children}</Text>;
};
export default class TimeSpentCard extends Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
    data: PropTypes.shape({
      beginTime: PropTypes.string,
      endTime: PropTypes.string,
      boardId: PropTypes.string,
      boardTitle: PropTypes.string,
      cardId: PropTypes.string,
      cardTitle: PropTypes.string,
      teamId: PropTypes.string,
      teamTitle: PropTypes.string,
      state: PropTypes.oneOf(Object.values(TaskState))
    })
  };
  state = {};
  goToCard = () => {
    const data = {
      id: this.props.data.cardId,
      title: this.props.data.cardTitle
    };
    this.props.navigation.navigate("Card", data);
  };
  componentDidMount() {
    this.setState({ color: this.getStateColor() });
  }

  getStateColor = () => {
    switch (this.props.data.state) {
      case TaskState.Blocked:
        return Colors.stateBlocked;
      case TaskState.Cancelled:
        return Colors.stateCancelled;
      case TaskState.Done:
        return Colors.stateDone;
      case TaskState.Duplicate:
        return Colors.stateDuplicate;
      case TaskState.InProgress:
        return Colors.stateInProgress;
      case TaskState.Paused:
        return Colors.statePaused;
      default:
        return Colors.stateTodo;
    }
  };

  render() {
    const end = new Date(this.props.data.endTime);

    return (
      <TouchableOpacity
        onPress={this.goToCard}
        activeOpacity={0.9}
        style={GS.mx2}
      >
        <Card style={GS.overflowHidden}>
          <View style={[GS.px3, GS.py3, GS.rowDir]}>
            <View style={Styles.timeContainer}>
              <Moment locale="fa" element={H3} local format="HH:mm">
                {this.props.data.beginTime}
              </Moment>
              <Moment locale="fa" element={MomentText} local format="HH:mm">
                {this.props.data.endTime}
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
              <Text style={GS.mb1}>{this.props.data.cardTitle}</Text>
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
