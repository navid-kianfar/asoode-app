import { PaymentStatus, Banks } from "../library/enums";
import PropTypes from "prop-types";
const { shape, string, any, number, bool, oneOf, arrayOf, object } = PropTypes;

export const OrderDTO = {
  id: string,
  days: number,
  paidMembers: number,
  planTitle: string,
  createdAt: string,
  userId: string,
  planId: string,
  expireAt: string,
  amount: number,
  status: oneOf(Object.values(PaymentStatus)),
  costPerUser: number,
  costPerPlan: number,
  discount: number,
  isTrial: bool,
  isUpgrade: bool,
  maxAttachmentMb: number,
  maxOrganizations: number,
  maxOrganizationTeams: number,
  maxOrganizationMembers: number,
  maxOrganizationBoards: number,
  maxTeams: number,
  maxTeamMembers: number,
  maxTeamBoards: number,
  maxPrivateBoards: number,
  maxBoardMembers: number,
  approveDate: string,
  level: number,
  plan: any
};
export const PanelTransactionDTO = {
  index: number,
  id: string,
  orderId: string,
  bank: oneOf(Object.values(Banks)),
  amount: number,
  status: oneOf(Object.values(PaymentStatus)),
  createDate: string,
  trackingCode: string,
  referenceNumber: string,
  externalId: string,
  detail: string,
  order: shape(OrderDTO),
  planTitle: string,
  paidMembers: number,
  approveDate: string,
  costPerUser: number
};
