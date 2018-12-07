"use strict";
/**
 * Only access for devs
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ROOTUNAME = 'urfunny';
const ROOTPSW = 'urfunny';
const login = (auth) => {
    const encodedCredentials = auth.split(' ');
    const decodedCredentials = new Buffer(encodedCredentials[1], 'base64').toString();
    // credentials[0] : username, credentials[1] : pwd
    const credentials = decodedCredentials.split(':');
    if (credentials[0] === ROOTUNAME && credentials[0] === ROOTPSW) {
        return true;
    }
    return false;
};
exports.rootAccess = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const auth = req.get('authorization') || req.get('Authorization');
    if (!auth || !login(auth)) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        res.end('<html><body>Invalid credentials</body></html>');
    }
    else {
        return next();
    }
});
