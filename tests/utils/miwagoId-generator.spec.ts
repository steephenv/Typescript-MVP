import { mongoose, mongooseConnectionPromise } from '../../src/app';
import { generateMiwagoUserId } from '../../src/utils/miwagoId-generator';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('testing generateMiwagoId', () => {
  test('testing for Kottayam', async done => {
    const miwagoId = await generateMiwagoUserId('Kottayam');
    const truthness = miwagoId.includes('IN-174243-');
    expect(truthness).toBe(true);
    done();
  });
});
