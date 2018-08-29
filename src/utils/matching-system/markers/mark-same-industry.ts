import { Experience } from '../../../models/Experience';
import { score } from './score-board';

export async function markSameIndustry(id: string, industry: string) {
  if (!industry) {
    return 0;
  }
  const sameIndustryCount = await Experience.count({
    userId: id,
    companyIndustryLine: industry,
  });
  if (sameIndustryCount) {
    return score.sameIndustry;
  }
  return 0;
}
