"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * GraphQL err handler
 */
const graphql_1 = require("graphql");
const serializeError = require("serialize-error");
const RequestError_1 = require("./RequestError");
exports.GQLErrType = RequestError_1.RequestErrorType;
class GQLErr extends graphql_1.GraphQLError {
    constructor(errorType, details, statusCode, message) {
        super('The request is invalid.');
        // for accessing member functions
        this.errType = errorType;
        this.err = RequestError_1.RequestErrorType[errorType];
        this.statusCode = statusCode || this.getStatusCode();
        this.message = message || this.getMessage();
        this.details = serializeError(details);
    }
    getStatusCode() {
        return RequestError_1.ERROR_DEFINITIONS[this.errType].statusCode;
    }
    getMessage() {
        return RequestError_1.ERROR_DEFINITIONS[this.errType].message;
    }
}
exports.GQLErr = GQLErr;
