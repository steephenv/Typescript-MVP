export const score = {
  sameTopic: 15,
  sameIndustry: 10,
  sameCustomer: 20,
  sameIndustrySkills: 20,

  reservationAvailable: 5,
  periodCovered: {
    gt80: 20,
    gt50: 15,
    lt50: 5,
    else: 0,
  },
  annualGoalAchieved: {
    gt80: 2,
    gt50: 4,
    else: 5,
  },
  price: {
    lt50: 10,
    lt100: 7,
    gt100: 5,
  },
};
