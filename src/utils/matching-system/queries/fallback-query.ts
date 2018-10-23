import { Promise as BluePromise } from 'bluebird';
import { Experience } from './../../../models/Experience';
import { EmployeeProjects } from './../../../models/EmployeeProjects';
import { InterviewAvailabilityCalender } from './../../../models/InterviewAvailabilityCalender';

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

  const availabilityRespRaw = await InterviewAvailabilityCalender.aggregate([
    {
      $match: {
        startTime: { $gte: new Date(params.startTime) },
        endTime: { $lte: new Date(params.endTime) },
        booked: false,
      },
    },
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
      $group: { _id: '$userId', length: { $sum: 1 } },
    },
    { $sort: { length: -1 } },
    { $limit: 100 },
    { $skip: 0 },
    { $group: { _id: 'allIds', ids: { $push: '$_id' } } },
  ]);

  const [
    usersWithSameTopic,
    usersWithSameIndustry,
    availableUsers,
  ] = await BluePromise.all([
    usersWithSameTopicPromise,
    usersWithSameIndustryPromise,
    availabilityRespRaw,
  ]);

  const r1 = usersWithSameTopic[0] ? usersWithSameTopic[0].ids : [];
  const r2 = usersWithSameIndustry[0] ? usersWithSameIndustry[0].ids : [];
  const r3 = availableUsers[0] ? availableUsers[0].ids : [];
  const result = new Set([...r1, ...r2, ...r3]);
  // console.log('> running fallback-q', result);
  return result;
}
