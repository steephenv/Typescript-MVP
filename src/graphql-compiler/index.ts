import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import * as GQL_JSONType from 'graphql-type-json';

import { formatError } from './formatError';

// types
import { ObjectScalarType } from './Object-scalar-type';

import { getGRQAssets } from './get-gqr-files';

export function buildGraphQLRoutesGateway() {
  const { otherSchemaString, querySchemaString, resolvers } = getGRQAssets();

  // Construct a schema, using GraphQL schema language
  const schema = buildSchema(`
    scalar Object
    scalar Object2

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
  const root = Object.assign(
    {
      Object: GQL_JSONType,
      Object2: ObjectScalarType,
    },
    initialResolvers,
    resolvers,
  );

  const graphqlGateway = graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
    formatError,
  });

  return graphqlGateway;
}
