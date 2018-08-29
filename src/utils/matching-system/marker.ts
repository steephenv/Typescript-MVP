import { Promise as BluePromise } from 'bluebird';

import { IQueryParams } from './queries/Query-params.interface';

// markers
import { markSameIndustry } from './markers/mark-same-industry';
import { markSameTopic } from './markers/mark-same-topic';
import { markSameCustomers } from './markers/mark-same-customer';
import { markSameSkills } from './markers/mark-same-industry-skills';

export async function getMarks(params: IQueryParams, shortList: string[]) {
  // console.log('> in getMarks, shortList: ', shortList);
  const marks = await BluePromise.map(shortList, id => mark(params, id));
  // console.log('> marks', marks);
  return marks;
}

async function mark(params: IQueryParams, id: string) {
  // console.log('...............', id);
  const allMarks: number[] = await BluePromise.all([
    markSameTopic(id, params.topic),
    markSameIndustry(id, params.industry),
    markSameCustomers(id, params.clientName),
    markSameSkills(id, params.skills),
    // add new markers
  ]);

  const sum = allMarks.reduce((acc, val) => acc + val);
  return sum;
}
