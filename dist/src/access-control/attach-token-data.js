"use strict";
/**
 * A middleware that verifies JWT token if available
 * and attach it to res.locals.user.
 *
 * This middleware DOES NOT return any error.
 */
// import { RequestError, RequestErrorType } from '../error-handler/RequestError';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Jwt_1 = require("../routes/auth/utils/Jwt");
exports.attachTokenData = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const token = (req.get('Authorization') || '').split(' ');
        // check for Bearer token
        if (token[0] === 'Bearer') {
            const decodedToken = yield Jwt_1.Jwt.verify(token[1]);
            // Attach token to res
            res.locals.user = decodedToken;
        }
        return next();
    }
    catch (error) {
        // return next(
        //   new RequestError(RequestErrorType.LOGIN_FAILED, 'login failed' + error),
        // );
        next();
    }
});
