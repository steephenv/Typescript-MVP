import { EmployeeProjects } from '../../../models/EmployeeProjects';
import { score } from './score-board';

export async function markSameTopic(id: string, client: string) {
  const clientName = await EmployeeProjects.count({
    userId: id,
    clientsCompanyName: client,
  });
  if (clientName) {
    return score.sameCustomer;
  }
  return 0;
}
