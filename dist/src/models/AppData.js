"use strict";
/* tslint:disable:variable-name */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.description = `app-specific data. stored as key-val pair. helps server to boot`;
exports.definitions = {
    name: {
        type: String,
        unique: true,
        required: true,
        comment: 'key',
    },
    content: {
        type: mongoose_1.Schema.Types.Mixed,
        comment: 'value',
    },
};
const appDataSchema = new mongoose_1.Schema(exports.definitions);
exports.AppData = mongoose_1.model('AppData', appDataSchema);
