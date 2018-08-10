import { AppData } from '../models/AppData';
import * as leftPad from 'left-pad';

export const generateMiwagoUserId = async () => {
  const userCounter = await getNextId();
  const precisionCounter = leftPad(userCounter, 5, 0);

  const now = new Date();
  const yearField = (now.getFullYear() + '').slice(-2);
  const monthField = leftPad(now.getMonth(), 2, 0);

  return yearField + monthField + precisionCounter;
};

// returns next id and update database
async function getNextId() {
  let idCounter: number;

  const monthlyIdContent: any = await AppData.findOne(
    {
      name: 'monthly-id',
    },
    'content',
  ).exec();

  if (monthlyIdContent) {
    idCounter = +monthlyIdContent.content.counter;
    await updateIdCounter(idCounter + 1);
  } else {
    await createMonthlyIdContent();
    idCounter = 1;
  }
  return idCounter;
}

// if monthly-id does not exist yet create one
function createMonthlyIdContent() {
  return AppData.create({
    name: 'monthly-id',
    content: {
      counter: 2,
    },
  });
}

// if monthly-id does not exist yet create one
function updateIdCounter(val: number) {
  return AppData.updateOne(
    {
      name: 'monthly-id',
    },
    {
      content: {
        counter: val,
      },
    },
  );
}
