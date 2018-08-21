import { Promise as BluePromise } from 'bluebird';
import { Experience } from './../../../models/Experience';
import { EmployeeProjects } from './../../../models/EmployeeProjects';

import { IQueryParams } from './Query-params.interface';

export async function secondQuery(
  params: IQueryParams,
  availabilityResp: string[],
) {
  // search extended to availabilityResp
  const usersWithSameTopicPromise = EmployeeProjects.find({
    userId: { $in: availabilityResp },
    topic: params.topic,
  }).distinct('userId');

  // search extended to availabilityResp
  const usersWithSameIndustryPromise = Experience.find({
    userId: { $in: availabilityResp },
    companyIndustryLine: params.industry,
  }).distinct('userId');

  const [usersWithSameTopic, usersWithSameIndustry] = await BluePromise.all([
    usersWithSameTopicPromise,
    usersWithSameIndustryPromise,
  ]);

  // return set
  return new Set([...usersWithSameTopic, ...usersWithSameIndustry]);
}
