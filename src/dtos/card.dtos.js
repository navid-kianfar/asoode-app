import {
  BoardPermission,
  ReminderType,
  TaskState,
  VoteNecessity
} from "../library/enums";
import PropTypes from "prop-types";
import { MemberItemDTO } from "./board.dtos";
const { shape, string, any, number, bool, oneOf, arrayOf, object } = PropTypes;

export const CardLabelItemDTO = {
  id: string,
  title: string,
  value: string,
  selected: bool
};
export const CalendarCardItemDTO = {
  id: string,
  title: string,
  description: string,
  dueDate: string,
  startDate: string,
  state: oneOf([0, ...Object.values(TaskState)]),
  members: arrayOf(shape(MemberItemDTO)),
  boardTitle: string
};
export const ListCardItemDTO = {
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
  upVotes: number,
  downVotes: number,
  alreadyVoted: bool,
  done: bool,
  underWayTimeSpent: bool,
  isBlocker: bool,
  isBlocked: bool,
  voteNecessity: oneOf([0, ...Object.values(VoteNecessity)]),
  createdAt: string,
  state: oneOf([0, ...Object.values(TaskState)]),
  boardId: string,
  isVotePaused: bool,
  isVoteResultsOnlyForAdmins: bool,
  mapLocation: string,
  estimatedTime: number,
  dueReminder: oneOf([0, ...Object.values(ReminderType)]),
  startReminder: oneOf([0, ...Object.values(ReminderType)]),
  archivedAt: string,
  customFields: object,
  labels: arrayOf(shape(CardLabelItemDTO)),
  members: arrayOf(shape(MemberItemDTO))
};
