import { Promise as BluePromise } from 'bluebird';
import { Experience } from './../../../models/Experience';
import { EmployeeProjects } from './../../../models/EmployeeProjects';

import { IQueryParams } from './Query-params.interface';

export async function secondQuery(
  params: IQueryParams,
  availabilityResp: string[],
) {
  // console.log('> running 2-q');

  // search extended to availabilityResp
  const usersWithSameTopicPromise = EmployeeProjects.find({
    userId: { $in: availabilityResp },
    topic: params.topic,
  })
    .distinct('userId')
    .exec();

  // search extended to availabilityResp
  const usersWithSameIndustryPromise = Experience.find({
    userId: { $in: availabilityResp },
    companyIndustryLine: params.industry,
  })
    .distinct('userId')
    .exec();

  const [usersWithSameTopic, usersWithSameIndustry] = await BluePromise.all([
    usersWithSameTopicPromise,
    usersWithSameIndustryPromise,
  ]);

  const result = new Set([...usersWithSameTopic, ...usersWithSameIndustry]);

  // console.log('> 2-q result', result);

  // return set
  return result;
}
