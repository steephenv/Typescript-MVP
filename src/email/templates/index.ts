import { readFileSync } from 'fs';
import { join as pathJoin } from 'path';

export class EmailTemplates {
  public static SAMPLE = readFileSync(
    pathJoin(__dirname, 'sample.ejs'),
  ).toString();

  public static FORGOT_PASSWORD = readFileSync(
    pathJoin(__dirname, 'forgot-password.ejs'),
  ).toString();

  public static EMAIL_RECOVERY = readFileSync(
    pathJoin(__dirname, 'email-recovery.ejs'),
  ).toString();

  public static CONFIRM_REGISTRATION = readFileSync(
    pathJoin(__dirname, 'confirm-registration.ejs'),
  ).toString();

  public static ROLE_ACCEPT = readFileSync(
    pathJoin(__dirname, 'user-role-accept.ejs'),
  ).toString();

  public static ROLE_REJECT = readFileSync(
    pathJoin(__dirname, 'user-role-reject.ejs'),
  ).toString();

  public static INTERVIEW_SCHEDULED = readFileSync(
    pathJoin(__dirname, 'interview-scheduled.ejs'),
  ).toString();

  public static SHARE_PROJECT = readFileSync(
    pathJoin(__dirname, 'share-project.ejs'),
  ).toString();

  public static CLIENT_REG_EMAIL = readFileSync(
    pathJoin(__dirname, 'client-reg-email.ejs'),
  ).toString();
}
