import { Store } from './short-list.class';

import { firstQuery } from './queries/query-1';
import { secondQuery } from './queries/query-2';
import { fallbackQuery } from './queries/fallback-query';

import { IQueryParams } from './queries/Query-params.interface';

export async function shortList(params: IQueryParams, size = 100) {
  const EntryStore = new Store(size); /* tslint:disable-line:variable-name */

  // run first query
  const { firstQResult, availabilityResp } = await firstQuery(params);
  EntryStore.store(firstQResult);

  // check
  if (EntryStore.isShortlistFilled) {
    return [...EntryStore.shortlistedConsultants];
  }

  // run second query
  EntryStore.store(await secondQuery(params, availabilityResp));

  // check
  if (EntryStore.isShortlistFilled) {
    return [...EntryStore.shortlistedConsultants];
  }

  // run fallback query
  EntryStore.store(await fallbackQuery(params));

  return [...EntryStore.shortlistedConsultants];
}
