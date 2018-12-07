"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../models/User");
const Jwt_1 = require("./utils/Jwt");
const messages_1 = require("../../config/app/messages");
const RequestError_1 = require("../../error-handler/RequestError");
exports.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        req.body.username = req.body.username.toLowerCase();
        const user = yield User_1.User.findOne({ email: req.body.username }).exec();
        if (!user) {
            return next(new RequestError_1.RequestError(RequestError_1.RequestErrorType.LOGIN_FAILED, messages_1.messages.noUser.ENG));
        }
        const compare = yield user.comparePassword(req.body.password);
        if (!compare) {
            return next(new RequestError_1.RequestError(RequestError_1.RequestErrorType.LOGIN_FAILED, messages_1.messages.noUser.ENG));
        }
        const accessToken = yield Jwt_1.Jwt.sign({
            userId: user._id,
            role: user.role,
            appliedRole: user.appliedRole,
        });
        return res.status(200).send({
            success: true,
            data: user,
            accessToken,
        });
    }
    catch (err) {
        return next(new RequestError_1.RequestError(RequestError_1.RequestErrorType.INTERNAL_SERVER_ERROR, err));
    }
});
