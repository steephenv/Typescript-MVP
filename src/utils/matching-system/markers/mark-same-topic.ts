import { EmployeeProjects } from '../../../models/EmployeeProjects';
import { score } from './score-board';

export async function markSameTopic(id: string, topic: string) {
  if (!topic) {
    return 0;
  }

  const sameTopicCount = await EmployeeProjects.count({
    userId: id,
    projectName: topic,
  });

  if (sameTopicCount) {
    return score.sameTopic;
  }
  return 0;
}
