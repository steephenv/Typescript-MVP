"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphqlHTTP = require("express-graphql");
const graphql_1 = require("graphql");
const GQL_JSONType = require("graphql-type-json");
const formatError_1 = require("./formatError");
// types
const Object_scalar_type_1 = require("./Object-scalar-type");
const get_gqr_files_1 = require("./get-gqr-files");
function buildGraphQLRoutesGateway() {
    const { otherSchemaString, querySchemaString, resolvers } = get_gqr_files_1.getGRQAssets();
    // Construct a schema, using GraphQL schema language
    const schema = graphql_1.buildSchema(`
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
    const root = Object.assign({
        Object: GQL_JSONType,
        Object2: Object_scalar_type_1.ObjectScalarType,
    }, initialResolvers, resolvers);
    const graphqlGateway = graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true,
        formatError: formatError_1.formatError,
    });
    return graphqlGateway;
}
exports.buildGraphQLRoutesGateway = buildGraphQLRoutesGateway;
