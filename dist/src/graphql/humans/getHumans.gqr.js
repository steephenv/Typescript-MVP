"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GQL_Error_1 = require("../../error-handler/GQL-Error");
// this is a sample grq file
exports.querySchema = `getHumans: String`;
exports.resolver = { getHumans };
function getHumans() {
    try {
        return `We're humans :) (<5)`;
    }
    catch (err) {
        throw new GQL_Error_1.GQLErr(GQL_Error_1.GQLErrType.BAD_REQUEST, err);
    }
}
