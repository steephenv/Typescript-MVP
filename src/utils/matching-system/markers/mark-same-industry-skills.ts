import { Skills } from '../../../models/Skills';
import { score } from './score-board';

export async function markSameTopic(id: string, skillTitles: string[]) {
  const skills = await Skills.count({
    userId: id,
    skillTitle: { $in: skillTitles },
  });
  if (skills) {
    return score.sameIndustrySkills;
  }
  return 0;
}
