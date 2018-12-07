"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatError(error) {
    const origErr = error.originalError;
    const errToDisplay = {
        message: error.message,
        locations: error.locations,
        path: error.path,
    };
    if (error.extensions) {
        errToDisplay.extensions = error.extensions;
    }
    if (origErr) {
        if (error.message === origErr.message) {
            errToDisplay.message = error.message;
        }
        else {
            errToDisplay.message = error.message;
            errToDisplay.moreMessage = origErr.message;
        }
        if (origErr.err) {
            errToDisplay.errCode = origErr.err;
        }
        if (origErr.details) {
            errToDisplay.details = origErr.details;
        }
        if (origErr.statusCode) {
            errToDisplay.statusCode = origErr.statusCode;
            if (origErr.statusCode >= 500) {
                console.error(errToDisplay); // tslint:disable-line:no-console
            }
        }
    }
    return errToDisplay;
}
exports.formatError = formatError;
