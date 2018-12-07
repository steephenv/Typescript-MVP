"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UrlPattern = require("url-pattern");
exports.getRoute = (req) => {
    const pattern = new UrlPattern(`*(${req.route.path})`);
    const route = pattern.match(req.path);
    return route._;
};
