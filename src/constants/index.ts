export const TOKEN_EXPIRE = 8640000;

export const APP = {
  VERSION: "1.0.0.0",
  RELASE_DATE: "2021-07-20T15:49:07.1350156+07:00",
};

//FIELD REQUIRED
export const REQUIRED_FIELD_LOGIN = ["password", "userNameOrEmailAddress"];
export const SEARCH_TEXT_FIELD_USER = [
  "userName",
  "name",
  "surname",
  "emailAddress",
];

export const SEARCH_TEXT_FIELD_CLIENT = ["name", "address"];
export const SEARCH_TEXT_FIELD_PROJECT = ["customerName", "projectName"];
export const SEARCH_TEXT_FIELD_ROLE = ["name"];

export const UNIQUE_TEXT_FIELD_USER = ["emailAddress", "userCode"];
