"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-console */
const models_1 = require("../../models");
const tools_1 = require("../../graphql-compiler/tools");
const bluebird_1 = require("bluebird");
exports.querySchema = `collection(name: String!): Collection`;
exports.otherSchema = `
type Collection {
  collectionName: String
  fetch(query: Object, selectingFields: String, distinct: String, attachments:[String],
     fields: String, populate: Object, limit:Int, skip:Int, sort: Object): Object,
  count(query: Object, distinct: String): Int
  create(content: Object!): Object
  update(condition: Object!, content: Object!, options: Object): Object
  remove(condition: Object!): Object
  aggregate(query: Object!): Object
}
`;
exports.resolver = { collection };
class Collection {
    constructor(name) {
        this.collectionName = name;
        this.collection = models_1.Models[name];
        if (!this.collection) {
            throw new tools_1.GQLErr(tools_1.GQLErrType.BAD_REQUEST, 'No such collections found');
        }
    }
    create({ content }, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield bluebird_1.Promise.map(content, (item) => __awaiter(this, void 0, void 0, function* () {
                    // attach userId if not present
                    if (!item.userId) {
                        item.userId = res.locals.user ? res.locals.user.userId : null;
                    }
                    const { _options } = item;
                    delete item._options;
                    if (_options &&
                        _options.skipIfExistingOnCondition &&
                        Object.keys(_options.skipIfExistingOnCondition).length) {
                        const isExisting = yield this.collection
                            .count(_options.skipIfExistingOnCondition)
                            .exec();
                        if (isExisting) {
                            const isExistingResp = Object.assign({
                                _IS_EXISTING: true,
                                _DESCRIPTION: 'create skipped due to _options.skipIfExistingOnCondition',
                            }, item);
                            return isExistingResp;
                        }
                    }
                    const createResp = yield this.collection.create(item);
                    return createResp;
                }));
                return resp;
            }
            catch (err) {
                throw new tools_1.GQLErr(tools_1.GQLErrType.BAD_REQUEST, err);
            }
        });
    }
    update({ condition, content, options = {}, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let preparedCondition;
            let preparedContent;
            let preparedOptions;
            try {
                preparedCondition = tools_1.prepareGQLQuery(condition);
                preparedContent = tools_1.prepareGQLQuery(content);
                preparedOptions = tools_1.prepareGQLQuery(options);
            }
            catch (err) {
                throw new tools_1.GQLErr(tools_1.GQLErrType.BAD_REQUEST, err);
            }
            try {
                const resp = yield this.collection
                    .update(preparedCondition, preparedContent, preparedOptions)
                    .exec();
                const updatedData = yield this.collection.findOne(preparedCondition);
                return [resp, updatedData];
            }
            catch (err) {
                throw new tools_1.GQLErr(tools_1.GQLErrType.INTERNAL_SERVER_ERROR, err);
            }
        });
    }
    count({ query = {}, distinct = '', }) {
        return __awaiter(this, void 0, void 0, function* () {
            let preparedQuery;
            try {
                preparedQuery = tools_1.prepareGQLQuery(query);
            }
            catch (err) {
                throw new tools_1.GQLErr(tools_1.GQLErrType.BAD_REQUEST, err);
            }
            try {
                const count = yield this.collection.count(preparedQuery).exec();
                return count;
            }
            catch (err) {
                throw new tools_1.GQLErr(tools_1.GQLErrType.INTERNAL_SERVER_ERROR, err);
            }
        });
    }
    fetch({ query = {}, attachments = [], populate = {}, fields = '', limit = 50, skip = 0, selectingFields = '', distinct = '', sort = null, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let preparedQuery;
            try {
                preparedQuery = tools_1.prepareGQLQuery(query);
            }
            catch (err) {
                throw new tools_1.GQLErr(tools_1.GQLErrType.BAD_REQUEST, err);
            }
            try {
                let prepareResult = this.collection.find(preparedQuery);
                if (attachments) {
                    attachments.forEach(attachment => {
                        prepareResult.populate(attachment, fields);
                    });
                }
                if (Object.keys(populate).length) {
                    prepareResult.populate(populate);
                }
                // console.log(',,,,,,,,,,,,,,,,,,,,', typeof fields, fields);
                if (distinct) {
                    prepareResult = prepareResult
                        .select(selectingFields)
                        .distinct(distinct);
                }
                else {
                    prepareResult = prepareResult
                        .limit(limit)
                        .skip(skip)
                        .select(selectingFields);
                }
                if (sort) {
                    prepareResult.sort(sort);
                }
                // lean last
                prepareResult.lean();
                const result = yield prepareResult.exec();
                return result;
            }
            catch (err) {
                throw new tools_1.GQLErr(tools_1.GQLErrType.INTERNAL_SERVER_ERROR, err);
            }
        });
    }
    remove({ condition }) {
        return __awaiter(this, void 0, void 0, function* () {
            let preparedQuery;
            try {
                preparedQuery = tools_1.prepareGQLQuery(condition);
            }
            catch (err) {
                throw new tools_1.GQLErr(tools_1.GQLErrType.BAD_REQUEST, err);
            }
            try {
                const resp = yield this.collection.remove(preparedQuery).exec();
                return resp;
            }
            catch (err) {
                throw new tools_1.GQLErr(tools_1.GQLErrType.INTERNAL_SERVER_ERROR, err);
            }
        });
    }
    aggregate({ query }) {
        return __awaiter(this, void 0, void 0, function* () {
            let preparedQuery;
            try {
                preparedQuery = tools_1.prepareGQLQuery(query);
            }
            catch (err) {
                throw new tools_1.GQLErr(tools_1.GQLErrType.BAD_REQUEST, err);
            }
            try {
                const resp = yield this.collection.aggregate(preparedQuery).exec();
                return resp;
            }
            catch (err) {
                throw new tools_1.GQLErr(tools_1.GQLErrType.INTERNAL_SERVER_ERROR, err);
            }
        });
    }
}
function collection({ name }) {
    return new Collection(name);
}
