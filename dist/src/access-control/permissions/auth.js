"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Roles_class_1 = require("../Roles.class");
exports.auth = {
    'GET:/auth/register': {
        allow: Roles_class_1.Roles.ALL,
    },
};
