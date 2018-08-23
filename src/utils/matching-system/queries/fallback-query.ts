import { Promise as BluePromise } from 'bluebird';
import { Experience } from './../../../models/Experience';
import { EmployeeProjects } from './../../../models/EmployeeProjects';

import { IQueryParams } from './Query-params.interface';

export async function fallbackQuery(params: IQueryParams) {
  // search extended to availabilityResp
  const usersWithSameTopicPromise = EmployeeProjects.find({
    topic: params.topic,
  }).distinct('userId');

  // search extended to availabilityResp
  const usersWithSameIndustryPromise = Experience.find({
    companyIndustryLine: params.industry,
  }).distinct('userId');

  const [usersWithSameTopic, usersWithSameIndustry] = await BluePromise.all([
    usersWithSameTopicPromise,
    usersWithSameIndustryPromise,
  ]);

  return new Set([...usersWithSameTopic, ...usersWithSameIndustry]);
}
