// this is a sample grq file
import { Models } from '../../models';
import { Model, Document } from 'mongoose';
import { GQLErr, GQLErrType } from '../../error-handler/GQL-Error';
import { Promise as BluePromise } from 'bluebird';

export const querySchema = `collection(name: String!): Collection`;
export const otherSchema = `
type Collection {
  collectionName: String
  fetch(query: Object, attachments:[String], limit:Int, skip:Int): Object
  create(content: Object!): Object
  update(condition: Object!, content: Object!): Object
  remove(condition: Object!): Object
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

  public async create({ content }: { content: any[] }) {
    try {
      const resp = await BluePromise.map(content, async item => {
        await this.collection.create(item);
      });
      return resp;
    } catch (err) {
      throw new GQLErr(GQLErrType.BAD_REQUEST, err);
    }
  }

  public async update({
    condition,
    content,
  }: {
    content: any;
    condition: any;
  }) {
    try {
      const resp = await this.collection.update(condition, content).exec();
      return resp;
    } catch (err) {
      throw new GQLErr(GQLErrType.INTERNAL_SERVER_ERROR, err);
    }
  }

  public async fetch({
    query = {},
    attachments = [],
    limit = 50,
    skip = 0,
  }: {
    query: string | { [key: string]: any };
    attachments: string[];
    limit: number;
    skip: number;
  }) {
    try {
      if (typeof query === 'string') {
        query = JSON.parse(query);
      }
    } catch (err) {
      throw new GQLErr(GQLErrType.BAD_REQUEST, err);
    }

    try {
      let prepareResult = this.collection.find(query);

      if (attachments) {
        attachments.forEach(attachment => {
          prepareResult.populate(attachment);
        });
      }

      prepareResult = prepareResult
        .limit(limit)
        .skip(skip)
        .lean();

      const result = await prepareResult.exec();
      return result;
    } catch (err) {
      throw new GQLErr(GQLErrType.INTERNAL_SERVER_ERROR, err);
    }
  }

  public async remove({ condition }: { condition: any }) {
    try {
      const resp = await this.collection.remove(condition).exec();
      return resp;
    } catch (err) {
      throw new GQLErr(GQLErrType.INTERNAL_SERVER_ERROR, err);
    }
  }
}

function collection({ name }: { name: string }) {
  return new Collection(name);
}
