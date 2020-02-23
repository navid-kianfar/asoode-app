import React, { Component } from "react";
import { View, Text, Button, Segment, Icon, Item } from "native-base";
import GS from "../../../themes/general-styles";
import { LayoutAnimation } from "react-native";
import I18n from "../../../i18n";
import AttachmentItem from "../../../components/attachment-item";
import AttachmentModal from "../../../components/modals/attachment-modal";

export default class CardAttachmentsTab extends Component {
  data = {
    asoodeAttachments: [
      {
        attachmentType: 3,
        listName: "list",
        board: {
          id: "6ebaca23-4b40-4658-b4eb-444760860ff4",
          title: "دورهمی",
          picture: null,
          color: "#344563",
          structure: []
        },
        card: {
          id: "792eccf8-0305-481c-ad40-9ba9022497b3",
          index: 0,
          title: "card",
          checkListCount: 0,
          checkListDoneCount: 0,
          attachmentsCount: 0,
          asoodeAttachmentsCount: 0,
          commentsCount: 0,
          alertsCount: 0,
          order: 1,
          watched: false,
          hasDescription: false,
          coverImage: null,
          dueDate: null,
          startDate: null,
          estimatedTime: null,
          upVotes: 0,
          downVotes: 0,
          alreadyVoted: false,
          dueDateStatus: 1,
          done: false,
          mapLocation: null,
          underWayTimeSpent: false,
          isBlocker: false,
          isBlocked: false,
          voteNecessity: 1,
          labels: [],
          members: [],
          customFields: {},
          dueReminder: 0,
          startReminder: 0,
          createdAt: "2019-09-04T09:24:00.452418Z",
          archivedAt: null,
          state: 0,
          boardId: "00000000-0000-0000-0000-000000000000",
          isVotePaused: false,
          isVoteResultsOnlyForAdmins: false,
          boardTitle: null,
          description: null
        },
        id: "826d88a1-4511-4807-b6d2-9837d2e6caec",
        hasPermission: true
      },
      {
        attachmentType: 4,
        listName: "",
        board: {
          id: "a696ad01-1433-400a-a9af-cd4fa43a9839",
          title: "organBoardTest",
          picture:
            "/storage/uploaded_images/14555997-a5e7-43c1-b8a9-81d959595689.jpg",
          color: null,
          structure: []
        },
        card: null,
        id: "803edd26-8e2e-4025-a2a8-f8db42c3ccb1",
        hasPermission: true
      }
    ],
    attachments: [
      {
        attachmentType: 2,
        index: 0,
        id: "82c3bd85-1e4a-4489-bfc0-320994f07a4f",
        cardId: "db675157-dfde-4ce8-868b-d83356f778f4",
        listId: "a1aef0df-72c5-4e31-8ee2-f85deaca74d5",
        boardId: "46ceb536-b206-47af-978a-1a660eae0775",
        userId: "c2ce4b17-ebef-4c49-ba09-323197a67bd9",
        recordId: null,
        path:
          "/storage/uploaded_images/7e39b63f-95d2-45b1-a620-3adef790298c.jpg",
        extension: ".JPG",
        image:
          "/storage/uploaded_images/7e39b63f-95d2-45b1-a620-3adef790298c.jpg",
        linkName: "images.jpg",
        fileName: "images.jpg",
        title: "images.jpg",
        isCover: true,
        card: null,
        board: null,
        hasPermission: false,
        createdAt: "2019-09-02T14:10:08.653186Z"
      },
      {
        attachmentType: 2,
        index: 0,
        id: "c7deffb9-8feb-47f9-84bc-03ae2674a5db",
        cardId: "db675157-dfde-4ce8-868b-d83356f778f4",
        listId: "a1aef0df-72c5-4e31-8ee2-f85deaca74d5",
        boardId: "46ceb536-b206-47af-978a-1a660eae0775",
        userId: "c2ce4b17-ebef-4c49-ba09-323197a67bd9",
        recordId: null,
        path:
          "/storage/uploaded_images/8a78da89-5467-4802-9fab-46aaabb9e776.png",
        extension: ".PNG",
        image:
          "/storage/uploaded_images/8a78da89-5467-4802-9fab-46aaabb9e776.png",
        linkName: "2368691.png",
        fileName: "2368691.png",
        title: "2368691.png",
        isCover: false,
        card: null,
        board: null,
        hasPermission: false,
        createdAt: "2019-09-02T14:09:39.144768Z"
      },
      {
        attachmentType: 2,
        index: 0,
        id: "f84bd657-02f4-4217-84f2-5b5398ce5f8c",
        cardId: "db675157-dfde-4ce8-868b-d83356f778f4",
        listId: "a1aef0df-72c5-4e31-8ee2-f85deaca74d5",
        boardId: "46ceb536-b206-47af-978a-1a660eae0775",
        userId: "c2ce4b17-ebef-4c49-ba09-323197a67bd9",
        recordId: null,
        path:
          "/storage/uploaded_images/17f9e628-b5f7-4a0b-b3f8-f17fae670c3d.png",
        extension: ".PNG",
        image:
          "/storage/uploaded_images/17f9e628-b5f7-4a0b-b3f8-f17fae670c3d.png",
        linkName: "2354329.png",
        fileName: "2354329.png",
        title: "2354329.png",
        isCover: false,
        card: null,
        board: null,
        hasPermission: false,
        createdAt: "2019-09-02T14:09:35.19315Z"
      },
      {
        attachmentType: 2,
        index: 0,
        id: "3336b3b1-2154-4f4a-aefe-a1c315de4e90",
        cardId: "db675157-dfde-4ce8-868b-d83356f778f4",
        listId: "a1aef0df-72c5-4e31-8ee2-f85deaca74d5",
        boardId: "46ceb536-b206-47af-978a-1a660eae0775",
        userId: "c2ce4b17-ebef-4c49-ba09-323197a67bd9",
        recordId: null,
        path:
          "/storage/uploaded_images/e26f869f-b611-4cbd-8e51-efbabffc2534.jpg",
        extension: ".JPG",
        image:
          "/storage/uploaded_images/e26f869f-b611-4cbd-8e51-efbabffc2534.jpg",
        linkName: "images.jpg",
        fileName: "images.jpg",
        title: "images.jpg",
        isCover: false,
        card: null,
        board: null,
        hasPermission: false,
        createdAt: "2019-09-02T14:06:55.561224Z"
      }
    ]
  };
  state = {
    appAttachments: false
  };
  changePage = appAttachments => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ appAttachments });
  };
  openAddAttachment = () => {
    this.refs.attachmentModal.open();
  };
  render() {
    return (
      <View style={GS.px2}>
        <AttachmentModal ref="attachmentModal">
          <Button
            onPress={this.openAddAttachment}
            style={GS.my2}
            block
            bordered
          >
            <Text>{I18n.t("ADD_ATTACHMENT")}</Text>
          </Button>
        </AttachmentModal>
        <Segment transparent>
          <Button
            onPress={() => this.changePage(false)}
            active={!this.state.appAttachments}
            first
          >
            <Text>{I18n.t("ATTACHMENTS")}</Text>
          </Button>
          <Button
            onPress={() => this.changePage(true)}
            active={this.state.appAttachments}
            last
          >
            <Text>{I18n.t("BOARDS_AND_CARDS")}</Text>
          </Button>
        </Segment>
        <View>
          {this.state.appAttachments
            ? this.data.asoodeAttachments.map(data => {
                return (
                  <AttachmentItem
                    key={data.id}
                    data={data}
                    navigation={this.props.navigation}
                    appAttachment
                  />
                );
              })
            : this.data.attachments.map(data => {
                return <AttachmentItem key={data.id} data={data} />;
              })}
        </View>
      </View>
    );
  }
}
