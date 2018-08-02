import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

// types
import { ObjectScalarType } from './Object-scalar-type';

import { getGRQAssets } from './get-gqr-files';

export function buildGraphQLRoutesGateway() {
  const { otherSchemaString, querySchemaString, resolvers } = getGRQAssets();

  // Construct a schema, using GraphQL schema language
  const schema = buildSchema(`
    scalar Object

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
      Object: ObjectScalarType,
    },
    initialResolvers,
    resolvers,
  );

  const graphqlGateway = graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  });

  return graphqlGateway;
}
