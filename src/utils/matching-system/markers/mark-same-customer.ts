import { EmployeeProjects } from '../../../models/EmployeeProjects';
import { score } from './score-board';

export async function markSameCustomers(id: string, client: string) {
  if (!client) {
    return 0;
  }
  const clientName = await EmployeeProjects.count({
    userId: id,
    clientsCompanyName: client,
  });
  if (clientName) {
    return score.sameCustomer;
  }
  return 0;
}
