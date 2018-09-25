import * as makeMdTable from 'markdown-table';
import { isArray } from 'lodash';

export function definitionParser(
  table: string,
  definition: any,
  description: string,
) {
  const mdTable = [['**Field Name**', '**Type**', '**Description**']];

  Object.keys(definition).forEach(column => {
    const comment = definition[column].comment
      ? definition[column].comment.replace(/\n/g, '<br>').replace(/\|/g, '/')
      : 'N/A';

    let type: string;

    if (isArray(definition[column])) {
      type = definition[column][0].type
        ? definition[column][0].type.name
        : 'COMPLEX_TYPE';
    }

    mdTable.push([
      `\`${column}\``, // column name
      `\`${type ||
        (definition[column].type
          ? definition[column].type.name
          : 'COMPLEX_TYPE') ||
        definition[column].type.toString()}\``,
      comment,
    ]);
  });

  const content = `\n### Table \`${table}\`\n${description}\n\n${makeMdTable(
    mdTable,
  )}\n`;

  return content;
}
