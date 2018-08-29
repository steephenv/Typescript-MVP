import { Skills } from '../../../models/Skills';
import { score } from './score-board';

export async function markSameSkills(id: string, skillTitles: string[] = []) {
  if (!skillTitles.length) {
    return 0;
  }
  const skills = await Skills.count({
    userId: id,
    skillTitle: { $in: skillTitles },
  });
  // console.log('skillsssss', skills);
  if (skills) {
    return score.sameIndustrySkills;
  }
  return 0;
}
