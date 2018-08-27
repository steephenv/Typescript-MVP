import { Experience } from '../../../models/Experience';
import { score } from './score-board';

export async function markSameTopic(id: string, industry: string) {
  const sameIndustryCount = await Experience.count({
    userId: id,
    industryLine: industry,
  });
  if (sameIndustryCount) {
    return score.sameIndustry;
  }
  return 0;
}
