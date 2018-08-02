// this is a sample grq file
export const querySchema = `getHumans: String`;
export const resolver = { getHumans };

function getHumans() {
  return `We're humans :)`;
}
