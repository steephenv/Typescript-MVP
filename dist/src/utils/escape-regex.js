"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
exports.escapeRegex = escapeRegex;
