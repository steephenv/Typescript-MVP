import { GQLErr, GQLErrType } from '../../error-handler/GQL-Error';

// this is a sample grq file
export const querySchema = `getHumans: String`;
export const resolver = { getHumans };

function getHumans() {
  if (Math.floor(Math.random() * 10) < 5) {
    return `We're humans :) (<5)`;
  } else {
    throw new GQLErr(GQLErrType.BAD_REQUEST, 'details----');
  }
}
