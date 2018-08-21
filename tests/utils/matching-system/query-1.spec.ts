import { mongoose, mongooseConnectionPromise } from '../../../src/app';
import { firstQuery } from '../../../src/utils/matching-system/queries/query-1';

afterAll(() => mongooseConnectionPromise.then(() => mongoose.disconnect()));

describe('testing generateMiwagoId', () => {
  test('testing for Kottayam', async done => {
    const miwagoId = await firstQuery({
      startTime: new Date('2018-08-28'),
      endTime: new Date('2018-09-3'),
    });
    console.log(miwagoId);
    done();
  });
});
