import { GQLErr } from '../error-handler/GQL-Error';

export function formatError(error: GQLErr) {
  console.log(error);
  return error;
}
