import PropTypes from "prop-types";
import { MemberItemDTO } from "./board.dtos";
const { string, shape, number, bool } = PropTypes;
export const NotificationDTO = {
  createdAt: string,
  description: string,
  id: string,
  index: number,
  member: shape(MemberItemDTO),
  seen: bool,
  title: string
};
export const ActivityDTO = {
  boardId: string,
  boardTitle: string,
  cardId: string,
  commentId: string,
  date: string,
  description: string,
  destinationBoardId: string,
  destinationListId: string,
  id: string,
  index: number,
  listId: string,
  teamId: string,
  user: shape(MemberItemDTO)
};
