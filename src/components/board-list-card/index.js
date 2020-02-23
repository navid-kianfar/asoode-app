import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Icon, connectStyle } from "native-base";
import PropTypes from "prop-types";
import Image from "../elements/image";
import Styles from "./styles";
import Alert from '../../services/alert-service';
import { LabelDTO, MemberItemDTO } from "../../dtos/board.dtos";
import I18n from "../../i18n";
import Svg from "../elements/svg";
import GS from "../../themes/general-styles";
import Moment from "react-moment";
import {
  CustomFieldType,
  DueDateStatus,
  ReminderType,
  TaskState,
  VoteNecessity
} from "../../library/enums";
import { getStateColor } from "../../library/general-helpers";
import MembersComponent from "../members";
import { Colors } from "../../themes/variables";

const MomentText = props => {
  return (
    <Text style={GS.mx2} note>
      {props.children}
    </Text>
  );
};

class BoardListCard extends Component {
  static defaultProps = {
    onLongPress: () => {},
  };
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }
  openCard = () => {
    if (this.props.openChange) {
      this.props.openChange();
    }
    if (this.props.hasPermission === false) {
      Alert.error(
        "CARD_NO_PERMISSION",
        null,
      );
      return;
    }
    this.props.navigation.navigate("Card", this.props.data);
  };
  getFieldBackground(field) {
    const option = field.items.find(
      item => item.title === this.props.data.customFields[field.id]
    );
    if (option) {
      return {
        backgroundColor: option.color,
        color: "#fff",
        borderRadius: 3
      };
    }
  }
  getCustomFieldValue(cf, value) {
    switch (cf.type) {
      case CustomFieldType.Checkbox:
        return I18n.t(value ? "HAS" : "DOES_NOT_HAVE");
      case CustomFieldType.Switch:
        return I18n.t(value ? "YES" : "NO");
      case CustomFieldType.DropDown:
      case CustomFieldType.Text:
      case CustomFieldType.TextArea:
      case CustomFieldType.Tags:
        return value;
      case CustomFieldType.Number:
        return String(value || 0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      default:
        return "";
    }
  }
  render() {
    const data = this.props.data;
    const setting = this.props.setting || {
      membersOnCard: true,
      timeSpentOnCard: true,
      blockingCardsOnCard: true,
      checkListsOnCard: true,
      commentsOnCard: true,
      attachmentOnCard: true,
      pollOnCard: true
    };
    const hasFooter =
      (setting.membersOnCard !== false && data.members.length) ||
      (setting.timeSpentOnCard !== false && data.underWayTimeSpent) ||
      (setting.blockingCardsOnCard !== false && data.blockingCount) ||
      (setting.checkListsOnCard !== false && data.checkListCount) ||
      (setting.commentsOnCard !== false && data.commentsCount) ||
      (setting.attachmentOnCard !== false && data.attachmentsCount) ||
      (setting.attachmentOnCard !== false && data.asoodeAttachmentsCount) ||
      (setting.pollOnCard !== false && data.upVotes) ||
      (setting.pollOnCard !== false && data.downVotes) ||
      data.hasDescription ||
      data.watched;
    return (
      <View style={[GS.px2, GS.pb2]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.openCard}
          onLongPress={this.props.onLongPress}
          style={[
            this.props.style.container,
            (data.isBlocked || data.isBlocker) ? {
              borderBottomWidth: 3,
              borderBottomColor: data.isBlocker ? '#ff2828' :'#ffff41'
            } : null
          ]}
        >
          {data.coverImage ? (
            <Image
              source={data.coverImage}
              style={Styles.coverImage}
              containerStyle={Styles.coverImageContainer}
            />
          ) : null}
          {data.dueDate ? (
            <View style={[GS.flexRowDir, GS.alignItemsCenter]}>
              <Icon name="clock" type="Feather" note />
              <Moment locale="fa" element={MomentText} local fromNow>
                {data.dueDate}
              </Moment>
            </View>
          ) : null}
          <Text>{data.title}</Text>
          {data.labels?.length ? (
            <View style={[GS.flexRowDir, GS.my2]}>
              {data.labels.map(label => (
                <View
                  key={label.id}
                  style={[Styles.label, { backgroundColor: label.value }]}
                />
              ))}
            </View>
          ) : null}
          {data.state && data.state !== TaskState.ToDo ? (
            <View style={GS.flexRowDir}>
              <View
                style={[
                  Styles.label,
                  { backgroundColor: getStateColor(data.state) }
                ]}
              >
                <Text small style={Styles.labelText}>
                  {I18n.enum("TaskState", data.state)}
                </Text>
              </View>
            </View>
          ) : null}
          {this.props.customFields?.length &&
          setting.customFieldOnCard !== false ? (
            <View style={[GS.flexRowDir, GS.flexWrap]}>
              {this.props.customFields.map(field => {
                if (
                  field.type !== CustomFieldType.Map &&
                  field.type !== CustomFieldType.File &&
                  field.showOnCard &&
                  data.customFields &&
                  data.customFields[field.id]
                ) {
                  return (
                    <Text
                      small
                      key={field.id}
                      style={[
                        GS.px2,
                        field.items?.length
                          ? this.getFieldBackground(field)
                          : null
                      ]}
                    >
                      <Text note>{field.title}: </Text>
                      {field.type === CustomFieldType.Date ? (
                        <Moment
                          locale="fa"
                          element={Text}
                          local
                          format="YY/MM/DD HH:mm"
                        >
                          {field.value}
                        </Moment>
                      ) : (
                        this.getCustomFieldValue(
                          field,
                          data.customFields[field.id]
                        )
                      )}
                    </Text>
                  );
                }
                return null;
              })}
            </View>
          ) : null}
          {hasFooter ? (
            <View style={this.props.style.footer}>
              <View style={GS.flexRowDir}>
                {setting.timeSpentOnCard !== false && data.underWayTimeSpent ? (
                  <View style={this.props.style.footerBadge}>
                    <Svg size={18} name="timer" color={Colors.success} note />
                  </View>
                ) : null}
                {data.watched ? (
                  <View style={this.props.style.footerBadge}>
                    <Svg size={18} name="eye" note />
                  </View>
                ) : null}
                {setting.blockingCardsOnCard !== false && data.blockingCount ? (
                  <View style={this.props.style.footerBadge}>
                    <Icon name="ios-lock" type="Ionicons" note />
                    <Text style={GS.ms1} note>
                      {data.blockingCount}
                    </Text>
                  </View>
                ) : null}
                {setting.checkListsOnCard !== false && data.checkListCount ? (
                  <View style={this.props.style.footerBadge}>
                    <Icon name="ios-checkbox-outline" type="Ionicons" note />
                    <Text style={GS.ms1} note>
                      {data.checkListDoneCount}/{data.checkListCount}
                    </Text>
                  </View>
                ) : null}
                {setting.commentsOnCard !== false && data.commentsCount ? (
                  <View style={this.props.style.footerBadge}>
                    <Icon
                      name="comment-outline"
                      type="MaterialCommunityIcons"
                      note
                    />
                    <Text style={GS.ms1} note>
                      {data.commentsCount}
                    </Text>
                  </View>
                ) : null}
                {data.hasDescription ? (
                  <View style={this.props.style.footerBadge}>
                    <Icon
                      name={"align-" + (I18n.isRtl ? "right" : "left")}
                      type="Feather"
                      note
                    />
                  </View>
                ) : null}
                {setting.attachmentOnCard !== false && data.attachmentsCount ? (
                  <View style={this.props.style.footerBadge}>
                    <Icon name="paperclip" type="FontAwesome" note />
                    <Text style={GS.ms1} note>
                      {data.attachmentsCount}
                    </Text>
                  </View>
                ) : null}
                {setting.attachmentOnCard !== false &&
                data.asoodeAttachmentsCount ? (
                  <View style={this.props.style.footerBadge}>
                    <Svg size={18} name="logo" note />
                    <Text style={GS.ms1} note>
                      {data.asoodeAttachmentsCount}
                    </Text>
                  </View>
                ) : null}
                {setting.pollOnCard !== false && data.upVotes ? (
                  <View style={this.props.style.footerBadge}>
                    <Svg size={18} name="vote-up" note />
                    <Text style={GS.ms1} note>
                      {data.upVotes}
                    </Text>
                  </View>
                ) : null}
                {setting.pollOnCard !== false && data.downVotes ? (
                  <View style={this.props.style.footerBadge}>
                    <Svg size={18} name="vote-down" note />
                    <Text style={GS.ms1} note>
                      {data.downVotes}
                    </Text>
                  </View>
                ) : null}
              </View>
              {setting.membersOnCard !== false && data.members.length ? (
                <MembersComponent
                  itemsStyle={Styles.memberItem}
                  style={GS.meAuto}
                  maxShown={7}
                  items={data.members}
                />
              ) : null}
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
}

const {
  shape,
  func,
  string,
  number,
  bool,
  arrayOf,
  object,
  any,
  oneOf,
  array
} = PropTypes;
BoardListCard.propTypes = {
  // data: PropTypes.shape(BoardListCardDTO),
  // setting: PropTypes.shape(BoardSettingsDTO),
  data: shape({
    id: string,
    index: number,
    title: string,
    checkListCount: number,
    checkListDoneCount: number,
    attachmentsCount: number,
    asoodeAttachmentsCount: number,
    commentsCount: number,
    alertsCount: number,
    order: number,
    watched: bool,
    hasDescription: bool,
    coverImage: string,
    dueDate: string,
    startDate: string,
    estimatedTime: number,
    upVotes: number,
    downVotes: number,
    alreadyVoted: bool,
    dueDateStatus: oneOf(Object.values(DueDateStatus)),
    done: bool,
    mapLocation: string,
    underWayTimeSpent: bool,
    isBlocker: bool,
    isBlocked: bool,
    voteNecessity: oneOf([0, ...Object.values(VoteNecessity)]),
    labels: arrayOf(shape(LabelDTO)),
    members: arrayOf(shape(MemberItemDTO)),
    customFields: object,
    dueReminder: oneOf([0, ...Object.values(ReminderType)]),
    startReminder: oneOf([0, ...Object.values(ReminderType)]),
    createdAt: string,
    archivedAt: string,
    state: oneOf([0, ...Object.values(TaskState)]),
    boardId: string,
    isVotePaused: bool,
    isVoteResultsOnlyForAdmins: bool,
    boardTitle: string,
    description: string
  }),
  setting: shape({
    id: string,
    boardId: string,
    membersOnCard: bool,
    labelsOnCard: bool,
    dueDateOnCard: bool,
    timeSpentOnCard: bool,
    geoLocationOnCard: bool,
    checkListsOnCard: bool,
    blockingCardsOnCard: bool,
    pollOnCard: bool,
    customFieldOnCard: bool,
    commentsOnCard: bool,
    attachmentOnCard: bool,
    stateOnCard: bool,
    estimatedTimeOnCard: bool
  }),
  navigation: any,
  openChange: func,
  onLongPress: func,
  customFields: arrayOf(shape({
    createdAt: string,
    id: string,
    items: array,
    showOnCard: bool,
    title: string,
    type: oneOf(Object.values(CustomFieldType))
  }))
};
export default connectStyle("Custom.BoardListCard")(BoardListCard);
