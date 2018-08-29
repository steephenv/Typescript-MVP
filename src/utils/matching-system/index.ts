import { shortList } from './shortlist-maker';
import { getMarks } from './marker';
import { IQueryParams } from './queries/Query-params.interface';

export async function getMatchingResult(
  params: IQueryParams,
  numberOfUsersToSelect: number,
  shortListSize = 100,
) {
  // run matching system
  const shortListedUserIds = await shortList(params, shortListSize);
  const correspondingMarks = await getMarks(params, shortListedUserIds);

  // console.log('> shortListedUserIds:', shortListedUserIds);
  // console.log('> correspondingMarks:', correspondingMarks);

  const selectedUsers: string[] = [];
  let i = 0;

  // he he.. for loop!
  for (; i < numberOfUsersToSelect; i++) {
    // find highest index
    const maxIndex = correspondingMarks.indexOf(
      Math.max(...correspondingMarks),
    );

    if (shortListedUserIds[maxIndex]) {
      selectedUsers.push(shortListedUserIds[maxIndex]);
    }

    // remove those entries from both arrays
    shortListedUserIds.splice(maxIndex, 1);
    correspondingMarks.splice(maxIndex, 1);
  }

  // console.log('> selectedUsers:', selectedUsers);
  return selectedUsers;
}
