// this is a sample grq file
import { Models } from '../../models';
import { Model, Document } from 'mongoose';

export const querySchema = `collection(name: String!): Collection`;
export const otherSchema = `
type Collection {
  collectionName: String
  fetch(query: Object, limit:Int, skip:Int): Object
}
`;
export const resolver = { collection };

class Collection {
  public collectionName: string;
  private collection: Model<Document>;

  constructor(name: string) {
    this.collectionName = name;
    this.collection = Models[name];
  }

  public async fetch({
    query,
    limit = 50,
    skip = 0,
  }: {
    query: any;
    limit: number;
    skip: number;
  }) {
    const result = await this.collection
      .find(query)
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();
    return result;
  }
}

function collection({ name }: { name: string }) {
  return new Collection(name);
}
