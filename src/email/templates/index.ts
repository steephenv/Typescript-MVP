import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';

export class EmailTemplates {
  public static SAMPLE = readFileSync(
    pathJoin(__dirname, 'sample.ejs'),
  ).toString();
}
