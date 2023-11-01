"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessages = void 0;
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["SUP_NOT_FOUND"] = "The supplier doesn't exist in the database";
    ErrorMessages["SUP_EXIST"] = "The supplier already exist on the database";
    ErrorMessages["CAT_NOT_FOUND"] = "The category doesn't exist in the database";
    ErrorMessages["CAT_EXIST"] = "The category already exist on the database";
    ErrorMessages["PRO_NOT_FOUND"] = "The product doesn't exist in the database";
    ErrorMessages["PRO_EXIST"] = "The product already exist on the database";
    ErrorMessages["USER_EXIST"] = "The user already exist with that dni";
    ErrorMessages["SERVER_ERROR"] = "An error has ocurred with the server";
    ErrorMessages["UNAUTHORIZED"] = "you don't have permiss to access to this apart";
    ErrorMessages["WRONG_PASS"] = "Wrong password";
})(ErrorMessages || (exports.ErrorMessages = ErrorMessages = {}));
