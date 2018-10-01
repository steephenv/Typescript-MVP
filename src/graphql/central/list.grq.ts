/* tslint:disable:no-console */
import { Models } from '../../models';
import { Model, Document } from 'mongoose';
import {
  GQLErr,
  GQLErrType,
  prepareGQLQuery,
} from '../../graphql-compiler/tools';
import { Promise as BluePromise } from 'bluebird';

export const querySchema = `collection(name: String!): Collection`;
export const otherSchema = `
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
export const resolver = { collection };

class Collection {
  public collectionName: string;
  private collection: Model<Document>;

  constructor(name: string) {
    this.collectionName = name;
    this.collection = Models[name];
    if (!this.collection) {
      throw new GQLErr(GQLErrType.BAD_REQUEST, 'No such collections found');
    }
  }

  public async create({ content }: { content: any[] }, { res }: any) {
    try {
      const resp = await BluePromise.map(content, async item => {
        // attach userId if not present
        if (!item.userId) {
          item.userId = res.locals.user ? res.locals.user.userId : null;
        }

        const { _options } = item;
        delete item._options;

        if (
          _options &&
          _options.skipIfExistingOnCondition &&
          Object.keys(_options.skipIfExistingOnCondition).length
        ) {
          const isExisting = await this.collection
            .count(_options.skipIfExistingOnCondition)
            .exec();
          if (isExisting) {
            const isExistingResp = Object.assign(
              {
                _IS_EXISTING: true,
                _DESCRIPTION:
                  'create skipped due to _options.skipIfExistingOnCondition',
              },
              item,
            );
            return isExistingResp;
          }
        }
        const createResp = await this.collection.create(item);
        return createResp;
      });
      return resp;
    } catch (err) {
      throw new GQLErr(GQLErrType.BAD_REQUEST, err);
    }
  }

  public async update({
    condition,
    content,
    options = {},
  }: {
    content: any;
    condition: any;
    options: any;
  }) {
    let preparedCondition: any;
    let preparedContent: any;
    let preparedOptions: any;
    try {
      preparedCondition = prepareGQLQuery(condition);
      preparedContent = prepareGQLQuery(content);
      preparedOptions = prepareGQLQuery(options);
    } catch (err) {
      throw new GQLErr(GQLErrType.BAD_REQUEST, err);
    }
    try {
      const resp = await this.collection
        .update(preparedCondition, preparedContent, preparedOptions)
        .exec();
      return resp;
    } catch (err) {
      throw new GQLErr(GQLErrType.INTERNAL_SERVER_ERROR, err);
    }
  }

  public async count({
    query = {},
    distinct = '',
  }: {
    query: string | { [key: string]: any };
    distinct: string;
  }) {
    let preparedQuery: any;
    try {
      preparedQuery = prepareGQLQuery(query);
    } catch (err) {
      throw new GQLErr(GQLErrType.BAD_REQUEST, err);
    }

    try {
      const count = await this.collection.count(preparedQuery).exec();
      return count;
    } catch (err) {
      throw new GQLErr(GQLErrType.INTERNAL_SERVER_ERROR, err);
    }
  }

  public async fetch({
    query = {},
    attachments = [],
    populate = {},
    fields = '',
    limit = 50,
    skip = 0,
    selectingFields = '',
    distinct = '',
    sort = null,
  }: {
    query: string | { [key: string]: any };
    attachments: string[];
    fields: string;
    populate: any;
    limit: number;
    skip: number;
    selectingFields: string;
    distinct: string;
    sort: string | { [key: string]: number };
  }) {
    let preparedQuery: any;
    try {
      preparedQuery = prepareGQLQuery(query);
    } catch (err) {
      throw new GQLErr(GQLErrType.BAD_REQUEST, err);
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
      } else {
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

      const result = await prepareResult.exec();
      return result;
    } catch (err) {
      throw new GQLErr(GQLErrType.INTERNAL_SERVER_ERROR, err);
    }
  }

  public async remove({ condition }: { condition: any }) {
    let preparedQuery: any;
    try {
      preparedQuery = prepareGQLQuery(condition);
    } catch (err) {
      throw new GQLErr(GQLErrType.BAD_REQUEST, err);
    }
    try {
      const resp = await this.collection.remove(preparedQuery).exec();
      return resp;
    } catch (err) {
      throw new GQLErr(GQLErrType.INTERNAL_SERVER_ERROR, err);
    }
  }

  public async aggregate({ query }: { query: any[] }) {
    let preparedQuery: any;
    try {
      preparedQuery = prepareGQLQuery(query);
    } catch (err) {
      throw new GQLErr(GQLErrType.BAD_REQUEST, err);
    }
    try {
      const resp = await this.collection.aggregate(preparedQuery).exec();
      return resp;
    } catch (err) {
      throw new GQLErr(GQLErrType.INTERNAL_SERVER_ERROR, err);
    }
  }
}

function collection({ name }: { name: string }) {
  return new Collection(name);
}
