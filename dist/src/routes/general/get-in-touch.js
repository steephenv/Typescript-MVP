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
// import { User } from '../../models/User';
const GetInTouch_1 = require("../../models/GetInTouch");
const RequestError_1 = require("../../error-handler/RequestError");
exports.getInTouch = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const getData = new GetInTouch_1.getInTouchData(req.body);
        yield getData.save();
        return res.status(201).send({
            success: true,
        });
    }
    catch (err) {
        return next(new RequestError_1.RequestError(RequestError_1.RequestErrorType.INTERNAL_SERVER_ERROR));
    }
});
