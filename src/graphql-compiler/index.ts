import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

import { getGRQAssets } from './get-gqr-files';

export function buildGraphQLRoutesGateway() {
  const { otherSchemaString, querySchemaString, resolvers } = getGRQAssets();

  // Construct a schema, using GraphQL schema language
  const schema = buildSchema(`
    ${otherSchemaString}

    type Query {
      sayHello: String
      ${querySchemaString}
    }
  `);

  const initialResolvers = {
    sayHello: () => 'hello',
  };

  // The root provides a resolver function for each API endpoint
  const root = Object.assign({}, initialResolvers, resolvers);

  const graphqlGateway = graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  });

  return graphqlGateway;
}
