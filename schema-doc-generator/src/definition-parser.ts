import * as makeMdTable from 'markdown-table';
import { isArray } from 'lodash';

export function definitionParser(
  table: string,
  definition: any,
  description: string,
) {
  const mdTable = [['**Field Name**', '**Type**', '**Description**']];

  if (isArray(definition)) {
    definition = definition[0];
  }

  Object.keys(definition).forEach(column => {
    const comment = definition[column].comment
      ? definition[column].comment.replace(/\n/g, '<br>').replace(/\|/g, '/')
      : 'N/A';

    mdTable.push([
      `\`${column}\``, // column name
      `\`${definition[column].type.name ||
        definition[column].type.toString()}\``,
      comment,
    ]);
  });

  const content = `\n### Table \`${table}\`\n${description}\n\n${makeMdTable(
    mdTable,
  )}\n`;

  return content;
}
