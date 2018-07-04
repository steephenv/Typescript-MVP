import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';

export class EmailTemplates {
  public static VERIFICATION_CODE_EMAIL = readFileSync(
    pathJoin(__dirname, 'sample.ejs'),
  ).toString();
}
