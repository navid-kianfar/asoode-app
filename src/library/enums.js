export const BoardFilterDueDateTypes = {
  NextDay: 1,
  NextWeek: 2,
  NextMonth: 3,
  OverDue: 4,
  NoDue: 5,
  DueComplete: 6,
  DueUnComplete: 7,
};
export const SearchSections = {
  Cards: 1,
  Boards: 2,
  Teams: 3,
  Members: 4
};
export const ChatCategory = {
  Organ: 1,
  Team: 2,
  Board: 3,
  Personal: 4
};

export const TimeSpentType = {
  Task: 1,
  Off: 2
};

export const ChatType = {
  Text: 1,
  File: 2,
  Card: 3,
  Board: 4
};

export const AttachmentType = {
  Link: 1,
  File: 2,
  Card: 3,
  Board: 4
};
export const BoardState = {
  UnArchived: 1,
  Archived: 2,
  All: 3,
  ArchivedBoard: 4
};
export const VoteNecessity = {
  None: 1,
  CardMembers: 2,
  BoardMembers: 3
};
export const BoardStaticFields = {
  Members: 1,
  Labels: 2,
  DueDate: 3,
  TimeSpent: 4,
  GeoLocation: 5,
  CheckLists: 6,
  BlockingCards: 7,
  Poll: 8,
  CustomField: 9,
  Comments: 10,
  Attachment: 11,
  State: 12,
  EstimatedTime: 13
};
export const CustomFieldType = {
  Checkbox: 1,
  Date: 2,
  DropDown: 3,
  Number: 4,
  Text: 5,
  Switch: 6,
  TextArea: 7,
  Tags: 8,
  Map: 9,
  File: 10
};
export const TaskState = {
  ToDo: 1,
  InProgress: 2,
  Done: 3,
  Paused: 4,
  Blocked: 5,
  Cancelled: 6,
  Duplicate: 7,
  Incomplete: 8
};

export const ReminderType = {
  None: 1,
  AtTheTime: 2,
  FiveMinutesBefore: 3,
  TenMinutesBefore: 4,
  FifteenMinutesBefore: 5,
  OneHourBefore: 6,
  TwoHoursBefore: 7,
  OneDayBefore: 8,
  TwoDaysBefore: 9
};

export const SupportType = {
  Learning: 1,
  BugReport: 2,
  RequestFeature: 3,
  Other: 4
};

export const CommentPermission = {
  Disabled: 1,
  Members: 2,
  MembersAndObservers: 3
};

export const BoardPermission = {
  Admin: 1,
  Normal: 2,
  Virtual: 3,
  Viewer: 4,
  Ghost: 5
};

export const TeamVisibility = {
  Private: 1,
  Public: 2
};
export const Visibility = {
  Private: 1,
  Team: 2,
  Public: 3,
  Organization: 4
};

export const BoardTemplate = {
  Blank: 1,
  WeekDay: 2,
  SingleTeam: 3,
  Departments: 4,
  Kanban: 5
};
export const AuthPages = {
  Login: 1,
  Register: 2,
  Forget: 3
};

export const DropdownKnownList = {
  Countries: 1,
  Zones: 2
};
export const FileType = {
  Any: 1,
  Image: 2,
  Audio: 3,
  Video: 4,
  Excel: 5,
  Word: 6,
  Pdf: 7,
  Specific: 8
};
export const Language = {
  Persian: 1,
  English: 2,
  Arabic: 3
};

export const ErrorPriority = {
  Normal: 1,
  High: 2,
  VeryHigh: 3
};
export const ErrorType = {
  Exeptional: 1,
  Accounting: 2,
  BankGateway: 3,
  Server: 4
};
export const ErrorStatus = {
  WaitForCheck: 1,
  Duplicate: 2,
  Checking: 3,
  Solved: 4
};

export const DueDateStatus = {
  None: 1,
  Passed: 2,
  RecentlyPassed: 3,
  Soon: 4,
  Later: 5
};
export const OperationResultStatus = {
  Pending: 0,
  Success: 1,
  NotAcceptable: 2,
  NotFound: 3,
  Duplicate: 4,
  Rejected: 5,
  UnAuthorized: 6,
  Validation: 7,
  Failed: 8,
  LockedOut: 9,
  NotConfirmed: 10,
  Captcha: 11,
  OverCapacity: 12,
  Expire: 13
};

export const WeekDay = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
};

export const VerificationSection = {
  Registration: 1,
  ForgetPassword: 2
};

export const Gender = {
  UnKnown: 0,
  Male: 1,
  Female: 2
};

export const UserType = {
  Anonymous: 1,
  Admin: 2,
  Marketer: 3,
  User: 4
};

export const FormElementType = {
  CheckboxList: 1,
  Rating: 2,
  IconPicker: 3,
  FilePickerServer: 4,
  AutoComplete: 5,
  Image: 6,
  TextLabel: 7,
  Captcha: 8,
  Checkbox: 9,
  DatePicker: 10,
  Dropdown: 11,
  Editor: 12,
  FilePicker: 13,
  Input: 14,
  MultiSelect: 15,
  Number: 16,
  Radio: 17,
  Switch: 18,
  Tags: 19,
  CountryPicker: 20,
  Phone: 21,
  StateButton: 22,
  Link: 23,
  TimeSpan: 24,
  TimePicker: 25,
  Button: 26,
  GeoLocation: 27
};

export const PaymentStatus = {
  WaitForApprove: 1,
  Approved: 2,
  Canceled: 3
};

export const RequestStatus = {
  WaitForApprove: 1,
  Approved: 2,
  Canceled: 3
};

export const PaymentType = {
  Online: 1,
  Manual: 2
};

export const Banks = {
  PingPay: 1
};
