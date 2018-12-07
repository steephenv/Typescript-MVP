"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const RequestError_1 = require("./RequestError");
exports.errValidator = (req, res, next) => {
    const err = check_1.validationResult(req);
    if (!err.isEmpty()) {
        return next(new RequestError_1.RequestError(RequestError_1.RequestErrorType.UNPROCESSABLE_ENTITY, err.mapped()));
    }
    return next();
};
