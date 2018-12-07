"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function prepareGQLQuery(query) {
    let preparedQuery;
    if (typeof query === 'string') {
        preparedQuery = JSON.parse(query);
    }
    else if (typeof query === 'object') {
        let temp = JSON.stringify(query);
        temp = temp.replace(/__/gi, '$');
        preparedQuery = JSON.parse(temp);
    }
    return preparedQuery;
}
exports.prepareGQLQuery = prepareGQLQuery;
