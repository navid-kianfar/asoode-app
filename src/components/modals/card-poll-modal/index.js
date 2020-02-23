import React, { Component } from "react";
import {
  FlatList,
  LayoutAnimation,
  Platform,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Modal from "../../elements/modal";
import ModalStyles from "../attachment-modal/styles";
import {
  Body,
  Right,
  Button,
  CardItem,
  Icon,
  Left,
  Text,
  View,
  ListItem
} from "native-base";
import Switch from "../../elements/switch";
import GS from "../../../themes/general-styles";
import I18n from "../../../i18n";
import Thumbnail from "../../elements/thumbnail";
import PropTypes from "prop-types";
import { MemberItemDTO } from "../../../dtos/board.dtos";
import { Metrics } from "../../../themes/variables";
import { PLATFORM } from "../../../../native-base-theme/variables/commonColor";
import Moment from "react-moment";
import { BoardPermission, VoteNecessity } from "../../../library/enums";
import Svg from "../../elements/svg";
import Styles from "./styles";
import Radio from "../../elements/radio";
import Alert from "../../../services/alert-service";

const MomentText = ({ children }) => {
  return (
    <Text style={Styles.gridDate} center>
      {children}
    </Text>
  );
};

class CardPollModal extends Component {
  state = {
    visible: false,
    isVoteResultsOnlyForAdmins: this.props.isVoteResultsOnlyForAdmins,
    isVotePaused: this.props.isVotePaused,
    voteNecessity: this.props.voteNecessity
  };

  data = [
    {
      id: "894c12dc-7aa1-4bc8-af55-fed17f86281b",
      createdAt: "2019-09-02T14:02:37.521902Z",
      flag: true,
      member: {
        id: "c2ce4b17-ebef-4c49-ba09-323197a67bd9",
        avatar: null,
        fullName: "Soroush Madani",
        username: "soroushmadani99@gmail.com",
        initials: "SR",
        bio: null,
        boardPermission: 2
      }
    },
    {
      id: "fdb4af23-f014-4b6b-b2e7-377f521d906d",
      createdAt: "2019-11-20T08:51:23.45522Z",
      flag: false,
      member: {
        id: "412b372d-a4d0-4232-a81a-81be51b2e960",
        avatar:
          "/storage/uploaded_images/783b6cc2-a097-46bc-9f34-7f4b38b7ab89.png",
        fullName: "نوید کیانفر ",
        username: "nvd@kianfar.me",
        initials: "NK",
        bio: null,
        boardPermission: 2
      }
    }
  ];
  close = () => {
    this.setState({ visible: false });
  };
  open = () => {
    this.setState({ visible: true });
  };
  saveChanges = () => {
    const {
      isVotePaused,
      isVoteResultsOnlyForAdmins,
      voteNecessity
    } = this.state;
    const model = {
      isVotePaused,
      isVoteResultsOnlyForAdmins,
      voteNecessity
    };
    //  '/user/cards/vote/update-settings/' + this.props.cardId, model
  };
  removeVotes = () => {
    Alert.confirm("REMOVE_VOTES_DESCRIPTION", undefined, [
      {
        text: I18n.t("CANCEL"),
        style: "cancel"
      },
      {
        text: I18n.t("REMOVE"),
        onPress: () => {
          //  '/user/cards/vote/remove-all/' + this.props.cardId
        },
        style: "destructive"
      }
    ]);
  };
  renderListHeader = () => {
    if (this.props.permission !== BoardPermission.Admin) {
      return null;
    }
    return (
      <View padder>
        <Radio
          enum="VoteNecessity"
          model={this.state.voteNecessity}
          modelChange={VoteNecessity => this.setState({ VoteNecessity })}
        />
        <Switch
          model={this.state.isVoteResultsOnlyForAdmins}
          modelChange={val =>
            this.setState({ isVoteResultsOnlyForAdmins: val })
          }
          label={I18n.t("POLL_HIDE_RESULTS")}
        />
        <Switch
          model={this.state.isVotePaused}
          modelChange={isVotePaused => this.setState({ isVotePaused })}
          label={I18n.t("POLL_PAUSE")}
        />
        <View style={[GS.rowDir, GS.mt3]}>
          <View style={GS.col6}>
            <Button onPress={this.removeVotes} danger block bordered>
              <Text>{I18n.t("REMOVE_VOTES")}</Text>
            </Button>
          </View>
          <View style={GS.col6}>
            <Button onPress={this.saveChanges} success block bordered>
              <Text>{I18n.t("SAVE_CHANGES")}</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  };
  renderItem = ({ item }) => {
    if (item.header) {
      return (
        <ListItem hasBackground dir>
          <Text style={GS.flex1} center>
            {I18n.t("MEMBER")}
          </Text>
          <Text style={Styles.gridVote} center>
            {I18n.t("VOTE")}
          </Text>
          <Text style={Styles.gridDate} center>
            {I18n.t("CORE_GENERAL_DATE")}
          </Text>
        </ListItem>
      );
    }
    return (
      <ListItem dir>
        <View style={[GS.flexRowDir, GS.flex1, GS.alignItemsCenter]}>
          <View style={GS.mx2}>
            <Thumbnail
              extraSmall={Platform.OS === PLATFORM.IOS}
              small={Platform.OS === PLATFORM.ANDROID}
              source={item.member.avatar}
              title={item.member.initials}
            />
          </View>
          <View>
            <Text>{item.member.fullName}</Text>
          </View>
        </View>
        <View style={Styles.gridVote}>
          <Svg name={`vote-${item.flag ? "up" : "down"}`} />
        </View>
        <Moment
          locale="fa"
          element={MomentText}
          local
          format="YYYY/MM/DD HH:mm"
        >
          {item.createdAt}
        </Moment>
      </ListItem>
    );
  };
  render() {
    return (
      <Modal
        style={ModalStyles.modal}
        isVisible={this.state.visible}
        onBackdropPress={this.close}
        onSwipeComplete={this.close}
        swipeDirection="down"
        propagateSwipe
      >
        <View bg1>
          <View bg2 style={[ModalStyles.header, GS.my3]}>
            <Text mute style={ModalStyles.headerTitle}>
              {I18n.t("POLL")}
            </Text>
          </View>
          <FlatList
            style={{ maxHeight: Metrics.HEIGHT - Metrics.modalHeader }}
            ListHeaderComponent={this.renderListHeader}
            data={[{ header: true, id: "h" }, ...this.data]}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            stickyHeaderIndices={[1]}
          />
        </View>
      </Modal>
    );
  }
}
const { string, arrayOf, bool, shape, oneOf } = PropTypes;
CardPollModal.propTypes = {
  isVotePaused: bool,
  isVoteResultsOnlyForAdmins: bool,
  voteNecessity: oneOf(Object.values(VoteNecessity)),
  permission: oneOf(Object.values(BoardPermission)),
  cardId: string
};

export default CardPollModal;
