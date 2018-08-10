import { GQLErr } from '../error-handler/GQL-Error';

export function formatError(error: GQLErr) {
  const origErr: any = error.originalError;

  const errToDisplay: { [key: string]: any } = {
    message: error.message,
    locations: error.locations,
    path: error.path,
  };

  if (error.extensions) {
    errToDisplay.extensions = error.extensions;
  }

  if (origErr) {
    if (error.message === origErr.message) {
      errToDisplay.message = error.message;
    } else {
      errToDisplay.message = error.message;
      errToDisplay.moreMessage = origErr.message;
    }
    if (origErr.err) {
      errToDisplay.errCode = origErr.err;
    }
    if (origErr.details) {
      errToDisplay.details = origErr.details;
    }
    if (origErr.statusCode) {
      errToDisplay.statusCode = origErr.statusCode;
      if (origErr.statusCode >= 500) {
        console.error(errToDisplay); // tslint:disable-line:no-console
      }
    }
  }
  return errToDisplay;
}
