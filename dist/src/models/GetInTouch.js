"use strict";
/* tslint:disable:variable-name */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.description = 'Stores details of user info';
exports.definitions = {
    firstName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        unique: true,
    },
    mobile: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    message: {
        type: String,
    },
};
const getInTouchDataSchema = new mongoose_1.Schema(exports.definitions);
exports.getInTouchData = mongoose_1.model('getInTouchData', getInTouchDataSchema);
