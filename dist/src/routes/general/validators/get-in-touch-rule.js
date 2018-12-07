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
const Joi = require("joi");
// import { messages } from '../../../config/app/messages';
// tslint:disable-next-line
const getInTouchSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
        .email()
        .required(),
    mobile: Joi.number().required(),
    message: Joi.string()
        .optional()
        .allow(''),
});
exports.getInTouchValidation = (req, res, next) => {
    Joi.validate(req.body, getInTouchSchema, { stripUnknown: true }, (err, value) => __awaiter(this, void 0, void 0, function* () {
        // lme.e(err);
        if (err) {
            return res.status(422).send({
                success: false,
                msg: err,
            });
        }
        req.body.createdAt = new Date();
        next();
    }));
};
