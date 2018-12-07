"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const config_1 = require("config");
const jsonwebtoken_1 = require("jsonwebtoken");
const SECRET_KEY = config_1.get('app.jwt.SecretKey');
const ACCESS_TOKEN_EXPIRY_TIME = config_1.get('app.jwt.accessTokenExpiryTime');
class Jwt {
    // function to make jwt
    static sign(payload) {
        return new bluebird_1.Promise((resolve, reject) => {
            jsonwebtoken_1.sign(payload, SECRET_KEY, {
                expiresIn: ACCESS_TOKEN_EXPIRY_TIME,
            }, (err, token) => {
                if (err) {
                    return reject(err);
                }
                resolve(token);
            });
        });
    }
    // function to verify jwt
    static verify(token) {
        return new bluebird_1.Promise((resolve, reject) => {
            jsonwebtoken_1.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded);
            });
        });
    }
}
exports.Jwt = Jwt;
