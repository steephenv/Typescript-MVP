/**
 * file to generate schema docs from each model
 * execution of this file would be like this
 * > ts-node schema-doc <schema-file>
 */
import { promisify } from 'bluebird';
import * as log from 'fancy-log';
import { appendFile as appendFileCb, stat as fsStatCb } from 'fs';
import { join as pathJoin } from 'path';

import { definitionParser } from './definition-parser';
import { getInitDocContent } from './init-doc-content';

// file name is the table name
const table = process.argv[2].split('schema-dist/')[1].split('.js')[0];

// do not crunch index file
if (table === 'index') {
  log('......... ✓ skipping index file');
  process.exit(0);
}

const appendFile: any = promisify(appendFileCb);

const file = process.argv[2];

const DOC_FILE = pathJoin(__dirname, '../schema-doc.md');

async function generateDocs() {
  try {
    // import the file
    const {
      definitions,
      description = '_description not provided_',
    } = await import(file);

    if (!definitions) {
      throw new Error(`no definition export found on file ${file}`);
    }

    // initialize doc file
    await initDocFile();

    // parse definition
    const content = definitionParser(table, definitions, description);

    // append to file
    log(`......... ✓ docing '${table}' table`); // tslint:disable-line
    await appendFile(DOC_FILE, content);

    return;
  } catch (err) {
    console.error(err); // tslint:disable-line
  }
}

async function initDocFile() {
  try {
    const fsStat = promisify(fsStatCb);
    // check if the file exists
    await fsStat(DOC_FILE);

    return;
  } catch (err) {
    // fail for all other errs except
    if (err.code !== 'ENOENT') {
      console.error(err); // tslint:disable-line
      return;
    }

    const docContent = await getInitDocContent();

    await appendFile(DOC_FILE, docContent);

    log('......... ✓ doc file init'); // tslint:disable-line

    return;
  }
}

generateDocs();
