import { GQLErr, GQLErrType } from '../../error-handler/GQL-Error';

// this is a sample grq file
export const querySchema = `getHumans: String`;
export const resolver = { getHumans };

function getHumans() {
  try {
    return `We're humans :) (<5)`;
  } catch (err) {
    throw new GQLErr(GQLErrType.BAD_REQUEST, err);
  }
}
