import { Promise as BluePromise } from 'bluebird';

import { IQueryParams } from './queries/Query-params.interface';

export async function getMarks(params: IQueryParams, shortList: string[]) {
  const marks = await BluePromise.map(shortList, id => mark(params, id));
  return marks;
}

async function mark(params: IQueryParams, id: string) {
  const allMarks: number[] = await BluePromise.all([
    markSameTopic(id, params.topic),
    markSameIndustry(id, params.industry),
  ]);

  const sum = allMarks.reduce((acc, val) => acc + val);
  return sum;
}

// marker functions
async function markSameTopic(id: string, topic: string) {
  return 8;
}

async function markSameIndustry(id: string, industry: string) {
  return 8;
}
