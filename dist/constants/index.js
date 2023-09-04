"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNIQUE_TEXT_FIELD_USER = exports.SEARCH_TEXT_FIELD_ROLE = exports.SEARCH_TEXT_FIELD_PROJECT = exports.SEARCH_TEXT_FIELD_CLIENT = exports.SEARCH_TEXT_FIELD_USER = exports.REQUIRED_FIELD_LOGIN = exports.APP = exports.TOKEN_EXPIRE = void 0;
exports.TOKEN_EXPIRE = 8640000;
exports.APP = {
    VERSION: "1.0.0.0",
    RELASE_DATE: "2021-07-20T15:49:07.1350156+07:00",
};
//FIELD REQUIRED
exports.REQUIRED_FIELD_LOGIN = ["password", "userNameOrEmailAddress"];
exports.SEARCH_TEXT_FIELD_USER = [
    "userName",
    "name",
    "surname",
    "emailAddress",
];
exports.SEARCH_TEXT_FIELD_CLIENT = ["name", "address"];
exports.SEARCH_TEXT_FIELD_PROJECT = ["customerName", "projectName"];
exports.SEARCH_TEXT_FIELD_ROLE = ["name"];
exports.UNIQUE_TEXT_FIELD_USER = ["emailAddress", "userCode"];
//# sourceMappingURL=index.js.map