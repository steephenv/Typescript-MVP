import { Promise as BluePromise } from 'bluebird';
import { Experience } from './../../../models/Experience';
import { EmployeeProjects } from './../../../models/EmployeeProjects';

import { IQueryParams } from './Query-params.interface';

export async function fallbackQuery(
  params: IQueryParams,
  role: 'PM' | 'Consultant',
) {
  // console.log('> running fallback-q');

  // search extended to availabilityResp
  const usersWithSameTopicPromise = EmployeeProjects.aggregate([
    { $match: { topic: params.topic } },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'userDetails',
      },
    },
    {
      $unwind: {
        path: '$userDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
    { $match: { 'userDetails.role': role } },
    {
      $group: { _id: '$userDetails._id', length: { $sum: 1 } },
    },
    { $group: { _id: 'allIds', ids: { $push: '$_id' } } },
  ]);

  // search extended to availabilityResp
  const usersWithSameIndustryPromise = Experience.aggregate([
    { $match: { topic: params.topic } },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'userDetails',
      },
    },
    {
      $unwind: {
        path: '$userDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
    { $match: { 'userDetails.role': role } },
    {
      $group: { _id: '$userDetails._id', length: { $sum: 1 } },
    },
    { $group: { _id: 'allIds', ids: { $push: '$_id' } } },
  ]).exec();

  const [usersWithSameTopic, usersWithSameIndustry] = await BluePromise.all([
    usersWithSameTopicPromise,
    usersWithSameIndustryPromise,
  ]);

  const r1 = usersWithSameTopic[0] ? usersWithSameTopic[0].ids : [];
  const r2 = usersWithSameIndustry[0] ? usersWithSameIndustry[0].ids : [];
  const result = new Set([...r1, ...r2]);
  // console.log('> running fallback-q', result);
  return result;
}
