/**
 * GQR stands for Graphql Query and Resolver files
 */
/* tslint:disable:no-console */

import { join as pathJoin } from 'path';
import * as glob from 'glob';

const GRQ_PATTERN = 'graphql/**/*.{grq,gqr}.{js,ts}';

export function getGRQAssets() {
  console.log('**** Stitching GRQ files ****');
  const path = pathJoin(__dirname, '../', GRQ_PATTERN);
  const grqFiles = glob.sync(path);

  const querySchemaStore: string[] = [];
  const otherSchemaStore: string[] = [];
  const resolverStore: any[] = []; // comeback here later rot type correction

  for (const file of grqFiles) {
    console.log('> applying magic on ' + file.split('graphql/')[1]);
    const { querySchema, otherSchema, resolver } = require(file);
    if (querySchema) {
      querySchemaStore.push(querySchema);
    }
    if (resolver) {
      resolverStore.push(resolver);
    }
    if (otherSchema) {
      otherSchemaStore.push(otherSchema);
    }
  }

  const otherSchemaString = otherSchemaStore.join('\n');
  const querySchemaString = querySchemaStore.join('\n');
  const resolvers = Object.assign({}, ...resolverStore);
  console.log(
    '----------------> grq > this log will be removed in near future',
  );
  return { querySchemaString, otherSchemaString, resolvers };
}
