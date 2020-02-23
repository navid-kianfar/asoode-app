import React, { Component } from "react";
import "moment/locale/fa";
import { ListItem, Text, View } from "native-base";
import { ListCardItemDTO } from "../../../../dtos/card.dtos";
import PropTypes from "prop-types";
import { TaskState, TimeSpentType } from "../../../../library/enums";
import Moment from "react-moment";
import TimeSpentCard from "../../../../components/time-spent-card";
import I18n from "../../../../i18n";
import GS from "../../../../themes/general-styles";
const { shape, arrayOf, string, oneOf, any } = PropTypes;
const MomentText = props => {
  return <Text note>{props.children}</Text>;
};
class TimeSpentMemberItem extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }
  render() {
    if (this.props.data.timeSpentType === TimeSpentType.Off) {
      return (
        <ListItem noBorder dir>
          <View
            style={[GS.flexRowDir, GS.justifyContentBetween, GS.flex1, GS.px3]}
          >
            <Text>{I18n.t("DAY_OFF")}</Text>
            <View style={GS.flexRow}>
              <Moment locale="fa" element={MomentText} local format="HH:mm">
                {this.props.data.beginTime}
              </Moment>
              <Text> - </Text>
              <Moment locale="fa" element={MomentText} local format="HH:mm">
                {this.props.data.endTime}
              </Moment>
            </View>
          </View>
        </ListItem>
      );
    }
    return (
      <>
        <ListItem noBorder dir>
          <View
            style={[GS.flexRowDir, GS.justifyContentBetween, GS.flex1, GS.px3]}
          >
            <Text>{I18n.t("START_OF_WORK_TIME")}</Text>
            <Moment locale="fa" element={MomentText} local format="HH:mm">
              {this.props.data.beginTime}
            </Moment>
          </View>
        </ListItem>
        {this.props.data.cards.map((card, idx) => {
          return (
            <TimeSpentCard
              key={card.cardId + idx}
              navigation={this.props.navigation}
              data={card}
            />
          );
        })}
        <ListItem noBorder dir>
          <View
            style={[GS.flexRowDir, GS.justifyContentBetween, GS.flex1, GS.px3]}
          >
            <Text>{I18n.t("END_OF_WORK_TIME")}</Text>
            <Moment locale="fa" element={MomentText} local format="HH:mm">
              {this.props.data.endTime}
            </Moment>
          </View>
        </ListItem>
      </>
    );
  }
}
TimeSpentMemberItem.propTypes = {
  data: shape({
    beginTime: string,
    endTime: string,
    cards: arrayOf(
      shape({
        beginTime: string,
        endTime: string,
        boardId: string,
        boardTitle: string,
        cardId: string,
        cardTitle: string,
        teamId: string,
        teamTitle: string,
        state: oneOf(Object.values(TaskState))
      })
    ),
    timeSpentType: oneOf(Object.values(TimeSpentType))
  }),
  navigation: any
};

export default TimeSpentMemberItem;
