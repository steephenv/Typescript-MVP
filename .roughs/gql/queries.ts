// public async deleteSkills(
//     {
//       condition,
//       ids,
//     }: {
//       condition: any;
//       ids: [string];
//     },
//     { res }: any,
//   ) {
//     // const { errFound, error } = updateValidator(ids);
//     const skillsDelete = await Skills.remove({ _id: { $in: ids } }).exec();
//     const goalUpdate = await Goals.update(
//       condition,
//       {
//         $pull: { skillTargets: { skillId: { $in: ids } } },
//       },
//       { safe: true, upsert: true },
//     ).exec();

//     return BluePromise.all([goalUpdate, skillsDelete]);
//   }

// async function updateSkillsAndGoals(givenUserId: string) {
//   const removeSkills = await Skills.find({
//     userId: givenUserId,
//     isDelete: true,
//   })
//     .distinct('_id')
//     .exec();
//   if (removeSkills.length) {
//     const skillUpdate = Skills.remove({ _id: { $in: removeSkills } }).exec();
//     const goalUpdate = Goals.update(
//       { userId: givenUserId },
//       { $pull: { skillTargets: { skillId: { $in: removeSkills } } } },
//     );
//     await BluePromise.all([skillUpdate, goalUpdate]);
//   }
//   return;
// }
