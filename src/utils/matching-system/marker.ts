import { Promise as BluePromise } from 'bluebird';

import { IQueryParams } from './queries/Query-params.interface';

// markers
import { markSameIndustry } from './markers/mark-same-industry';
import { markSameTopic } from './markers/mark-same-topic';

export async function getMarks(params: IQueryParams, shortList: string[]) {
  const marks = await BluePromise.map(shortList, id => mark(params, id));
  return marks;
}

async function mark(params: IQueryParams, id: string) {
  const allMarks: number[] = await BluePromise.all([
    markSameTopic(id, params.topic),
    markSameIndustry(id, params.industry),
    // add new markers
  ]);

  const sum = allMarks.reduce((acc, val) => acc + val);
  return sum;
}
