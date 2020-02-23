import {
  BoardPermission,
  ReminderType,
  TaskState,
  VoteNecessity
} from "../library/enums";
import PropTypes from "prop-types";
import { MemberItemDTO } from "./board.dtos";
const { shape, string, any, number, bool, oneOf, arrayOf, object } = PropTypes;

export const FolderItemDTO = {
  createdAt: string,
  icon: string,
  image: string,
  lastModified: string,
  name: string,
  path: string
};

export const FileItemDTO = {
  createdAt: string,
  extention: string,
  icon: string,
  image: string,
  isArchive: bool,
  isAudio: bool,
  isExcel: bool,
  isGeneral: bool,
  isImage: bool,
  isPdf: bool,
  isVideo: bool,
  isWord: bool,
  lastModified: string,
  name: string,
  path: string,
  size: number
};
