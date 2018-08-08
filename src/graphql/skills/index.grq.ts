import {
  GQLErr,
  GQLErrType,
  prepareGQLQuery,
} from '../../graphql-compiler/tools';
import { Promise as BluePromise } from 'bluebird';

import { Skills } from '../../models/Skills';
import { Goals } from '../../models/Goals';
import { updateValidator } from './validators/save-update-skills-rules';

export const querySchema = `skills: Skills`;
export const otherSchema = `
  type Skills {
    update(content:Object!): Object
  }
`;

export const resolver = { skills };

class SkillsClass {
  public async update(
    {
      content,
    }: {
      content: { [key: string]: any };
    },
    { res }: any,
  ) {
    const { errFound, error } = updateValidator(content);

    if (errFound) {
      throw new GQLErr(GQLErrType.BAD_REQUEST, error);
    }

    try {
      const saveSkills = await BluePromise.map(
        content.skills,
        async (skillObj: any) => {
          const comingUserId = skillObj.userId
            ? skillObj.userId
            : res.locals.user
              ? res.locals.user.userId
              : null;
          if (!comingUserId) {
            throw new GQLErr(GQLErrType.FORBIDDEN, 'No token Found');
          }
          skillObj.category = skillObj.category._id;
          skillObj.subCategory = skillObj.subCategory._id;
          skillObj.uniqueTitle = skillObj.skillTitle.trim().toLowerCase();
          if (skillObj._id) {
            const skillExist = await Skills.findOne({
              _id: {
                $ne: skillObj._id,
              },
              category: skillObj.category,
              subCategory: skillObj.subCategory,
              uniqueTitle: skillObj.uniqueTitle,
            });
            if (skillExist) {
              return;
            }
            const skillId = skillObj._id;
            delete skillObj._id;
            return Skills.update({ _id: skillId }, { skillObj });
          }
          if (!skillObj._id) {
            const skillExist = await Skills.findOne({
              category: skillObj.category,
              subCategory: skillObj.subCategory,
              uniqueTitle: skillObj.uniqueTitle,
            });
            if (skillExist) {
              return;
            }
            skillObj.userId = comingUserId;
            const newSkillObj = new Skills(skillObj);
            return newSkillObj.save();
          }
        },
      );
      // await updateSkillsAndGoals(res.locals.user.userId);
      return saveSkills;
    } catch (err) {
      throw new GQLErr(GQLErrType.INTERNAL_SERVER_ERROR, err);
    }
  }
}

function skills() {
  return new SkillsClass();
}

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
