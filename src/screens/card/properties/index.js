import React, { Component } from "react";
import "moment/locale/fa";
import {
  List,
  ListItem,
  Input,
  Item,
  Label,
  View,
  Button,
  Text, Icon
} from "native-base";
import I18n from "../../../i18n";
import DropDown from "../../../components/elements/drop-down";
import Svg from "../../../components/elements/svg";
import GS from "../../../themes/general-styles";
import { ActivityIndicator } from "react-native";
import Styles from "./styles";
import Members from "../../../components/members";
import DatePickerModal from "../../../components/elements/date-picker-modal";
import TimeSpanPickerModal from "../../../components/elements/time-span-picker-modal";
import ChecklistComponent from "../../../components/checklist";
import Moment from "react-moment";
import CardMembersModal from "../../../components/modals/card-members-modal";
import CardLabelsModal from "../../../components/modals/card-labels-modal";
import CardTimeSpentModal from "../../../components/modals/card-time-spent-modal";
import CardPollModal from "../../../components/modals/card-poll-modal";
import CardCustomField from "../../../components/card-custom-field";
import AttachmentModal from "../../../components/modals/attachment-modal";
import CustomFieldModal from "../../../components/modals/custom-field-modal";
import AttachmentItem from "../../../components/attachment-item";
import {AttachmentType} from "../../../library/enums";

export default class CardPropertiesTab extends Component {
  state = {
    canEdit: true
  };
  calcTimeSpents = timeSpents => {
    if (!(timeSpents || []).length) {
      return;
    }
    let milliSeconds = 0;
    timeSpents.forEach(t => {
      milliSeconds += t.totalMilliseconds;
    });
    const hours = Math.floor(milliSeconds / 1000 / 60 / 60);
    const minutes = Math.floor(milliSeconds / 1000 / 60 - hours * 60);
    const seconds = Math.floor(
      milliSeconds / 1000 - hours * 60 * 60 - minutes * 60
    );
    return `${hours ? hours + ":" : ""}${
      hours || minutes ? minutes + ":" : ""
    }${seconds}`;
  };
  openModal = ref => {
    this.refs[ref].open();
  };
  render() {
    const card = this.props.card;
    if (!card) {
      return (
        <View style={GS.waitingContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <List>
        <ListItem itemDivider first />
        <Item dir>
          <Input
            multiline
            value={card.description}
            placeholder={I18n.t("CARD__ADD_DETAILED_DESCRIPTION")}
          />
        </Item>
        <ListItem itemDivider />
        {card.setting.stateOnCard ? (
          <Item dir first>
            <Svg name="state" />
            <Label>{I18n.t("ENUMS__BOARDSTATICFIELDS_STATE")}</Label>
            <DropDown
              enum="TaskState"
              selectedValue={card.state}
              // onValueChange={val => this.onModelChange('status', val)}
              enabled={this.state.canEdit}
              nullable
            />
          </Item>
        ) : null}
        {card.setting.membersOnCard ? (
          <Item onPress={() => this.openModal("memberModal")} dir>
            <Svg name="users" />
            <Label>{I18n.t("ENUMS__BOARDSTATICFIELDS_MEMBERS")}</Label>
            <Members
              style={[GS.px3, GS.flexWrap, GS.flex1]}
              itemsStyle={[GS.mx1, GS.my1]}
              items={card.cardMembers}
              maxShown={20}
            />
          </Item>
        ) : null}
        {card.setting.labelsOnCard ? (
          <Item onPress={() => this.openModal("labelsModal")} dir>
            <Svg name="labels" />
            <Label>{I18n.t("ENUMS__BOARDSTATICFIELDS_LABELS")}</Label>
            <View
              style={[GS.px3, GS.flexWrap, GS.flex1, GS.flexRowDir]}
              itemsStyle={[GS.mx1, GS.my1]}
            >
              {card.labels.map(label => (
                <View
                  key={label.id}
                  style={[Styles.label, { backgroundColor: label.value }]}
                >
                  <Text style={Styles.labelText}>{label.title}</Text>
                </View>
              ))}
            </View>
          </Item>
        ) : null}
        {card.setting.dueDateOnCard ? (
          <>
            <DatePickerModal
              time
              // update={this.onModelChange}
              model={card.startDate}
              disabled={!this.state.canEdit}
            >
              <View item dir>
                <Svg name="calendar-check" />
                <Label>{I18n.t("ENUMS__BOARDSTATICFIELDS_STARTDATE")}</Label>
                {card.startDate ? (
                  <Moment
                    style={[GS.px3, GS.meAuto]}
                    locale="fa"
                    element={Text}
                    local
                    format="YYYY/MM/DD, HH:MM"
                  >
                    {card.startDate}
                  </Moment>
                ) : null}
              </View>
            </DatePickerModal>
            <DatePickerModal
              time
              // update={this.onModelChange}
              model={card.dueDate}
              disabled={!this.state.canEdit}
            >
              <View item dir>
                <Svg name="calendar-check" />
                <Label>{I18n.t("ENUMS__BOARDSTATICFIELDS_DUEDATE")}</Label>
                {card.dueDate ? (
                  <Moment
                    style={[GS.px3, GS.meAuto]}
                    locale="fa"
                    element={Text}
                    local
                    format="YYYY/MM/DD, HH:MM"
                  >
                    {card.dueDate}
                  </Moment>
                ) : null}
              </View>
            </DatePickerModal>
          </>
        ) : null}
        {card.setting.estimatedTimeOnCard ? (
          <TimeSpanPickerModal
            // update={this.onModelChange}
            model={card.estimatedTime}
            disabled={!this.state.canEdit}
          >
            <View item dir>
              <Svg name="estimated-time" />
              <Label>{I18n.t("ENUMS__BOARDSTATICFIELDS_ESTIMATEDTIME")}</Label>
              <Text style={[GS.px3, GS.meAuto]}>
                {this.calcTimeSpents(card.estimatedTime)}
              </Text>
            </View>
          </TimeSpanPickerModal>
        ) : null}
        {card.setting.timeSpentOnCard ? (
          <Item onPress={() => this.openModal("timeSpentModal")} dir>
            <Svg name="time-spent" />
            <Label>{I18n.t("ENUMS__BOARDSTATICFIELDS_TIMESPENT")}</Label>
            <Text style={[GS.px3, GS.meAuto]}>
              {this.calcTimeSpents(card.timeSpents)}
            </Text>
          </Item>
        ) : null}
        {card.setting.checkListsOnCard ? (
          <Item
            onPress={() =>
              alert("add a Checklist list at the top of checklists")
            }
            dir
          >
            <Svg name="checklist" />
            <Label>{I18n.t("ENUMS__BOARDSTATICFIELDS_CHECKLISTS")}</Label>
          </Item>
        ) : null}
        {card.setting.blockingCardsOnCard ? (
          <AttachmentModal blockingCard>
            <View item dir>
              <Svg name="block" />
              <Label>{I18n.t("ENUMS__BOARDSTATICFIELDS_BLOCKINGCARDS")}</Label>
            </View>
          </AttachmentModal>
        ) : null}
        {card.setting.pollOnCard ? (
          <Item dir>
            <Svg name="poll" />
            <Label>{I18n.t("ENUMS__BOARDSTATICFIELDS_POLL")}</Label>
            <Button
              style={GS.meAuto}
              onPress={() => alert("vote up")}
              transparent
            >
              <Svg wrapperStyle={GS.ms0} name="vote-up" />
              <Text>{card.upVotes}</Text>
            </Button>
            <Button onPress={() => alert("vote down")} danger transparent>
              <Svg wrapperStyle={GS.ms0} name="vote-down" />
              <Text>{card.downVotes}</Text>
            </Button>
            <Button
              onPress={() => this.openModal("cardPollModal")}
              transparent
              dark
            >
              <Svg name="pie-chart" />
            </Button>
          </Item>
        ) : null}
        {card.setting.customFieldOnCard ? (
          <>
            <Item onPress={() => this.openModal("customFieldModal")} dir>
              <Svg name="custom-field" />
              <Label>{I18n.t("ENUMS__BOARDSTATICFIELDS_CUSTOMFIELD")}</Label>
            </Item>
            {card.customFields.map(field => {
              return (
                <CardCustomField
                  key={field.id}
                  data={field}
                  value={card.customFieldValues[field.id]}
                  cardId={card.id}
                />
              );
            })}
          </>
        ) : null}
        <ListItem itemDivider />
        {card.setting.blockingCardsOnCard && card.blockingCards.length ? (
          <>
            <Item dir>
              <Svg name="block" />
              <Text>{I18n.t('BLOCKING_CARDS')}</Text>
            </Item>
            <View padder>
              {card.blockingCards.map(blockingCard => {
                blockingCard.attachmentType = AttachmentType.Card;
                return (
                  <AttachmentItem
                    key={blockingCard.id}
                    data={blockingCard}
                    navigation={this.props.navigation}
                    appAttachment
                  />
                );
              })}
            </View>
            <ListItem itemDivider />
          </>
        ) : null}
        {card.setting.checkListsOnCard && card.lists.length ? (
          card.lists.map(checklist => (
            <ChecklistComponent key={checklist.id} model={checklist} />
          ))
        ) : null}
        <CardMembersModal
          cardId={card.id}
          cardMembers={card.cardMembers}
          boardMembers={card.boardMembers}
          permission={card.permission}
          ref="memberModal"
        />
        <CardLabelsModal
          cardId={card.id}
          boardId={card.boardId}
          labels={card.labels}
          ref="labelsModal"
        />
        <CardTimeSpentModal
          cardId={card.id}
          permission={card.permission}
          data={card.timeSpents}
          boardMembers={card.boardMembers}
          ref="timeSpentModal"
        />
        <CardPollModal
          cardId={card.id}
          permission={card.permission}
          isVotePaused={card.isVotePaused}
          isVoteResultsOnlyForAdmins={card.isVoteResultsOnlyForAdmins}
          voteNecessity={card.voteNecessity}
          ref="cardPollModal"
        />
        <CustomFieldModal
          boardId={card.boardId}
          customFields={card.customFields}
          ref="customFieldModal"
        />
      </List>
    );
  }
}
