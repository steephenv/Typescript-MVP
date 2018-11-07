import { shortList } from './shortlist-maker';
import { getMarks } from './marker';
import { IQueryParams } from './queries/Query-params.interface';
import { User } from '../../models/User';

export async function getMatchingResult(
  params: IQueryParams,
  numberOfUsersToSelect: number,
  shortListSize = 100,
  role: 'PM' | 'Consultant' = 'Consultant',
) {
  // run matching system
  const shortListedUserIds = await shortList(params, shortListSize, role);
  const correspondingMarks = await getMarks(params, shortListedUserIds);

  // console.log('> shortListedUserIds:', shortListedUserIds);
  // console.log('> correspondingMarks:', correspondingMarks);

  let selectedUsers: string[] = [];
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

  if (
    process.env.NODE_ENV! === 'production' &&
    (!selectedUsers || !selectedUsers.length)
  ) {
    selectedUsers = await setDummyUsers(role);
  }
  return selectedUsers;
}

async function setDummyUsers(role: string) {
  let users: any[];
  if (role === 'PM') {
    users = await User.find({
      email: 'pma@yopmail.com',
    });
  } else if (role === 'Consultant') {
    const emailArray = [
      'paul@yopmail.com',
      'adam@yopmail.com',
      'gal@yopmail.com',
    ];
    users = await User.find({
      email: { $in: emailArray },
    });
  }

  const usersIds = users.map(user => user._id);
  return usersIds;
}
