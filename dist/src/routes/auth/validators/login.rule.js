"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
exports.loginRule = [
    check_1.body('username')
        .exists()
        .withMessage('Invalid username'),
    check_1.body('password')
        .exists()
        .withMessage('Invalid password'),
];
