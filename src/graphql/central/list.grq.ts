// this is a sample grq file
import { Models } from '../../models';
import { Model, Document } from 'mongoose';
import { GQLErr, GQLErrType } from '../../error-handler/GQL-Error';

export const querySchema = `collection(name: String!): Collection`;
export const otherSchema = `
type Collection {
  collectionName: String
  fetch(query: Object, attachments:[String], limit:Int, skip:Int): Object
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

  public async fetch({
    query = {},
    attachments = [],
    limit = 50,
    skip = 0,
  }: {
    query: any;
    attachments: string[];
    limit: number;
    skip: number;
  }) {
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
      throw new GQLErr(GQLErrType.BAD_REQUEST, err);
    }
  }
}

function collection({ name }: { name: string }) {
  return new Collection(name);
}
