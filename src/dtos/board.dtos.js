import {
  BoardPermission,
  BoardStaticFields,
  CommentPermission,
  CustomFieldType,
  DueDateStatus,
  ReminderType,
  TaskState,
  Visibility,
  VoteNecessity
} from "../library/enums";
import PropTypes from "prop-types";
const { shape, string, number, bool, oneOf, arrayOf, object } = PropTypes;

export const MemberItemDTO = {
  id: string,
  avatar: string,
  fullName: string,
  username: string,
  initials: string,
  bio: string,
  boardPermission: oneOf([0, ...Object.values(BoardPermission)])
};
export const BoardTeamDTO = {
  id: string,
  title: string,
  logo: string,
  visibility: oneOf(Object.values(Visibility)),
  members: arrayOf(shape(MemberItemDTO))
};
export const BoardSettingsDTO = {
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
};
export const LabelDTO = {
  id: string,
  title: string,
  value: string,
  selected: bool
};
export const BoardListCardDTO = {
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
};
export const BoardListDTO = {
  id: string,
  title: string,
  cards: arrayOf(shape(BoardListCardDTO)),
  order: number,
  boardId: string,
  isOnlyAdmins: bool,
  colorId: string
};
export const CustomFieldItemDTO = {
  id: string,
  customFieldId: string,
  title: string,
  color: string,
  order: number
};
export const CustomFieldDTO = {
  id: string,
  type: oneOf(Object.values(CustomFieldType)),
  createdAt: string,
  showOnCard: bool,
  title: string,
  items: arrayOf(shape(CustomFieldItemDTO))
};
export const BoardListUserSettingDTO = {
  id: string,
  listId: string,
  showChart: bool
};
export const BoardUserSettingsDTO = {
  userId: string,
  boardId: string,
  showStatCountsOnLists: bool,
  lists: arrayOf(shape(BoardListUserSettingDTO))
};
export const TableSettingsColumnDTO = {
  title: string,
  type: oneOf(Object.values(BoardStaticFields)),
  fieldId: string,
  width: number
};
export const TableSettingsDTO = {
  columns: arrayOf(shape(TableSettingsColumnDTO)),
  disabledColumns: arrayOf(shape(TableSettingsColumnDTO))
};
export const AttachmentBoardDTO = {
  color: string,
  id: string,
  picture: string,
  structure: arrayOf(number),
  title: string
};

export const BoardDetailDTO = {
  id: string,
  title: string,
  picture: string,
  color: string,
  dark: bool,
  starred: bool,
  unseenChats: number,
  totalTasks: number,
  totalDoneTasks: number,
  visibility: Visibility,
  permission: oneOf([0, ...Object.values(BoardPermission)]),
  team: shape(BoardTeamDTO),
  isOnlyAdmin: bool,
  isCardCoverImage: bool,
  commentPermission: oneOf(Object.values(CommentPermission)),
  archive: bool,
  setting: shape(BoardSettingsDTO),
  organizationId: string,
  lists: arrayOf(shape(BoardListDTO)),
  members: arrayOf(shape(MemberItemDTO)),
  customFields: arrayOf(shape(CustomFieldDTO)),
  userSetting: shape(BoardUserSettingsDTO),
  tableSettings: shape(TableSettingsDTO)
};
