import PropTypes from "prop-types";
import { ListCardItemDTO } from "./card.dtos";
import { AttachmentBoardDTO, MemberItemDTO } from "./board.dtos";
import { ChatType } from "../library/enums";
const { string, shape, bool, number, oneOf } = PropTypes;
export const ChatMessageDTO = {
  attachment: string,
  boardAttachment: shape(AttachmentBoardDTO),
  boardId: string,
  cardAttachment: shape(ListCardItemDTO),
  createdAt: string,
  downVotes: number,
  hasPermission: bool,
  id: string,
  isPinned: bool,
  message: string,
  sender: shape(MemberItemDTO),
  senderId: string,
  teamId: string,
  type: oneOf(Object.values(ChatType)),
  upVotes: number
};
