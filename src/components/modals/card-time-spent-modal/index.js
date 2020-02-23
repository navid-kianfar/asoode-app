import React, { Component } from "react";
import {
  SectionList,
  LayoutAnimation,
  Platform,
  TouchableOpacity
} from "react-native";
import Modal from "../../elements/modal";
import Styles from "../attachment-modal/styles";
import {
  Body,
  Item,
  Label,
  Right,
  Button,
  Card,
  CardItem,
  Icon,
  Left,
  Text,
  View,
  ListItem,
  H3,
  List
} from "native-base";
import GS from "../../../themes/general-styles";
import I18n from "../../../i18n";
import Thumbnail from "../../elements/thumbnail";
import PropTypes from "prop-types";
import { MemberItemDTO } from "../../../dtos/board.dtos";
import { Metrics, Colors } from "../../../themes/variables";
import { PLATFORM } from "../../../../native-base-theme/variables/commonColor";
import Moment from "react-moment";
import { BoardPermission } from "../../../library/enums";
import IdentityService from "../../../services/identity-service";
import DropDown from "../../elements/drop-down";
import DatePickerModal from "../../elements/date-picker-modal";
import Svg from "../../elements/svg";

const ListText = ({ children }) => {
  return <Text style={[GS.flex1, GS.textCenter]}>{children}</Text>;
};

class CardTimeSpentModal extends Component {
  state = {
    visible: false,
    enterManually: false,
    sections: [],
    openSections: [],
    total: 0,
    selectedMember: IdentityService.userId
  };
  componentDidMount() {
    const sections = [];
    let total = 0;
    this.props.data.forEach(t => {
      let item = sections.find(s => s.member.id === t.member.id);
      if (!item) {
        item = {
          member: t.member,
          total: 0,
          data: []
        };
        sections.push(item);
      }
      item.data.push({
        beginTime: t.beginTime,
        endTime: t.endTime,
        totalTime: t.totalTime,
        id: t.id,
        totalMilliseconds: t.totalMilliseconds
      });
      item.total += t.totalMilliseconds;
      total += t.totalMilliseconds;
    });
    const openSections = sections.map(() => false);
    this.setState({ sections, total, openSections });
  }

  //TODO: connect this to redux ******************
  // IdentityService.profile.underWayCardId !== this.props.cardId
  isPlaying = false;
  //**********************************************
  close = () => {
    this.setState({ visible: false });
  };
  open = () => {
    this.setState({ visible: true });
  };
  toggleManual = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ enterManually: !this.state.enterManually });
  };
  onToggleStart = () => {
    if (this.isPlaying) {
      // '/user/cards/time-spent/end/' + this.props.cardId
    }
    // '/user/cards/time-spent/begin/' + this.props.cardId
  };
  selectUser = selectedMember => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ selectedMember });
  };
  toggleOpen = index => {
    const openSections = [...this.state.openSections];
    openSections[index] = !openSections[index];
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({openSections});
  };
  renderListHeader = () => {
    return (
      <View padder>
        <Button
          onPress={this.toggleManual}
          bordered={!this.state.enterManually}
          block
        >
          <Text>{I18n.t("TIME_SPENT__ENTER_TIME_MANUALLY")}</Text>
        </Button>
        {this.state.enterManually ? (
          this.props.permission === BoardPermission.Admin ? (
            <View>
              <Label style={GS.mt2}>{I18n.t("CORE_GENERAL_USER")}</Label>
              <View style={GS.flexRowDir}>
                {this.props.boardMembers.map(member => {
                  return (
                    <Thumbnail
                      onPress={() => this.selectUser(member.id)}
                      style={[
                        GS.mx1,
                        GS.my1,
                        this.state.selectedMember === member.id
                          ? {
                              borderWidth: 2,
                              borderColor: Colors.primary
                            }
                          : null
                      ]}
                      key={member.id}
                      small
                      title={member.initials}
                      source={member.avatar}
                    />
                  );
                })}
              </View>
              <Label style={[GS.mt2, GS.mb1]}>{I18n.t("START_DATE")}</Label>
              <DatePickerModal
                time
                // update={this.onModelChange}
                model={this.state.startDate}
              >
                <View regularItem dir>
                  {this.state.startDate ? (
                    <Moment
                      style={[GS.px3, GS.meAuto]}
                      locale="fa"
                      element={Text}
                      local
                      format="YYYY/MM/DD, HH:MM"
                    >
                      {this.state.startDate}
                    </Moment>
                  ) : null}
                </View>
              </DatePickerModal>
              <Label style={[GS.mt2, GS.mb1]}>{I18n.t("END_DATE")}</Label>
              <DatePickerModal
                time
                // update={this.onModelChange}
                model={this.state.endDate}
              >
                <View regularItem dir>
                  {this.state.endDate ? (
                    <Moment
                      style={[GS.px3, GS.meAuto]}
                      locale="fa"
                      element={Text}
                      local
                      format="YYYY/MM/DD, HH:MM"
                    >
                      {this.state.endDate}
                    </Moment>
                  ) : null}
                </View>
              </DatePickerModal>
              <Button style={GS.mt2} block>
                <Text>{I18n.t("OK")}</Text>
              </Button>
            </View>
          ) : (
            <View>
              <Label style={[GS.mt2, GS.mb1]}>{I18n.t("BEGIN_TIME")}</Label>
              <DatePickerModal
                time
                // update={this.onModelChange}
                model={this.state.startDate}
              >
                <View regularItem dir>
                  {this.state.startDate ? (
                    <Moment
                      style={[GS.px3, GS.meAuto]}
                      locale="fa"
                      element={Text}
                      local
                      format="YYYY/MM/DD, HH:MM"
                    >
                      {this.state.startDate}
                    </Moment>
                  ) : null}
                </View>
              </DatePickerModal>
              <Label style={[GS.mt2, GS.mb1]}>{I18n.t("END_TIME")}</Label>
              <DatePickerModal
                time
                // update={this.onModelChange}
                model={this.state.endDate}
              >
                <View regularItem dir>
                  {this.state.endDate ? (
                    <Moment
                      style={[GS.px3, GS.meAuto]}
                      locale="fa"
                      element={Text}
                      local
                      format="YYYY/MM/DD, HH:MM"
                    >
                      {this.state.endDate}
                    </Moment>
                  ) : null}
                </View>
              </DatePickerModal>
              <Button style={GS.mt2} block>
                <Text>{I18n.t("OK")}</Text>
              </Button>
            </View>
          )
        ) : null}
        <Button
          onPress={this.onToggleStart}
          style={GS.my2}
          success={!this.isPlaying}
          danger={this.isPlaying}
          block
        >
          <Icon
            name={"controller-" + (this.isPlaying ? "stop" : "play")}
            type="Entypo"
          />
          <Text>
            {I18n.t(
              this.isPlaying
                ? "TIME_SPENT_STOP_RECORDING"
                : "TIME_SPENT_START_RECORDING"
            )}
          </Text>
        </Button>
        <Card>
          <CardItem dir>
            <Left>
              <Text style={GS.flex1}>{I18n.t("CORE_GENERAL_TOTAL")}</Text>
            </Left>
            <Right>
              <Text>{this.state.total}</Text>
            </Right>
          </CardItem>
        </Card>
      </View>
    );
  };
  renderHeader = ({ section }) => {
    const index = this.state.sections.findIndex(s => s.member.id === section.member.id);
    return (
      <>
        <ListItem onPress={() => this.toggleOpen(index)} hasBackground avatar dir>
          <Left>
            <Thumbnail
              extraSmall={Platform.OS === PLATFORM.IOS}
              small={Platform.OS === PLATFORM.ANDROID}
              source={section.member.avatar}
              title={section.member.initials}
            />
          </Left>
          <Body>
            <Text>{section.member.fullName}</Text>
          </Body>
          <Right>
            <Text>{section.total}</Text>
          </Right>
        </ListItem>
        {this.state.openSections[index] ? (
          <ListItem hasBackground dir>
            <ListText>{I18n.t("START_DATE")}</ListText>
            <ListText>{I18n.t("END_DATE")}</ListText>
            <ListText>{I18n.t("CORE_GENERAL_DURATION")}</ListText>
            {this.props.permission === BoardPermission.Admin ? (
              <ListText>{I18n.t("OPERATIONS")}</ListText>
            ) : null}
          </ListItem>
        ) : null}
      </>
    );
  };
  renderItem = ({ item, section }) => {
    const index = this.state.sections.findIndex(s => s.member.id === section.member.id);
    if (!this.state.openSections[index]) {return null;}
    return (
      <ListItem dir>
        <Moment locale="fa" element={ListText} local format="YY/MM/DD HH:mm">
          {item.beginTime}
        </Moment>
        {item.endTime ? (
          <Moment locale="fa" element={ListText} local format="YY/MM/DD HH:mm">
            {item.endTime}
          </Moment>
        ) : (
          <ListText>-</ListText>
        )}
        <ListText>{item.totalTime}</ListText>
        {this.props.permission === BoardPermission.Admin ? (
          <View style={[GS.flex1, GS.alignItemsCenter]}>
            {item.endTime ? (
              <TouchableOpacity>
                <Icon name="trash" type="EvilIcons" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Icon danger name="stop-circle" type="FontAwesome" />
              </TouchableOpacity>
            )}
          </View>
        ) : null}
      </ListItem>
    );
  };
  render() {
    return (
      <Modal
        style={Styles.modal}
        isVisible={this.state.visible}
        onBackdropPress={this.close}
        onSwipeComplete={this.close}
        swipeDirection="down"
        propagateSwipe
      >
        <View bg1>
          <View bg2 style={[Styles.header, GS.my3]}>
            <Text mute style={Styles.headerTitle}>
              {I18n.t("TIME_SPENT")}
            </Text>
          </View>
          <SectionList
            style={{ maxHeight: Metrics.HEIGHT - Metrics.modalHeader }}
            ListHeaderComponent={this.renderListHeader}
            sections={this.state.sections}
            renderItem={this.renderItem}
            renderSectionHeader={this.renderHeader}
            keyExtractor={item => item.id}
            stickySectionHeadersEnabled
          />
        </View>
      </Modal>
    );
  }
}
const { string, arrayOf, shape, number, oneOf } = PropTypes;
CardTimeSpentModal.propTypes = {
  data: arrayOf(
    shape({
      beginTime: string,
      endTime: string,
      id: string,
      member: shape(MemberItemDTO),
      totalMilliseconds: number,
      totalTime: string
    })
  ),
  // boardId: string,
  boardMembers: arrayOf(shape(MemberItemDTO)),
  permission: oneOf(Object.values(BoardPermission)),
  cardId: string
};

export default CardTimeSpentModal;
