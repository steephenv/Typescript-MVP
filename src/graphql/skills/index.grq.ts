// tslint:disable:no-console

import { GQLErr, GQLErrType } from '../../graphql-compiler/tools';
import { Promise as BluePromise } from 'bluebird';

import { Skills } from '../../models/Skills';
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
    console.log(
      'GQL>>skills>update>>content',
      JSON.stringify(content, null, 2),
    );

    const { errFound, error } = updateValidator(content);

    if (errFound) {
      console.log('GQL>>skills>update>>content(err)', error);
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
            const skillExist = await Skills.count({
              _id: {
                $ne: skillObj._id,
              },
              userId: comingUserId,
              category: skillObj.category,
              subCategory: skillObj.subCategory,
              uniqueTitle: skillObj.uniqueTitle,
            }).exec();

            if (skillExist) {
              const existingError = Object.assign(
                {
                  _IS_EXISTING: true,
                  _DESCRIPTION:
                    'create skipped due to _options.skipIfExistingOnCondition',
                },
                skillObj,
              );
              return existingError;
            }
            const skillId = skillObj._id;
            delete skillObj._id;
            skillObj.submitted = true;

            console.log('saving in if');
            return Skills.update({ _id: skillId }, { $set: skillObj }).exec();
          }

          const skillExist2 = await Skills.count({
            category: skillObj.category,
            subCategory: skillObj.subCategory,
            uniqueTitle: skillObj.uniqueTitle,
            userId: comingUserId,
          }).exec();
          if (skillExist2) {
            const existingError = Object.assign(
              {
                _IS_EXISTING: true,
                _DESCRIPTION:
                  'create skipped due to _options.skipIfExistingOnCondition',
              },
              skillObj,
            );
            return existingError;
          }
          skillObj.userId = comingUserId;
          skillObj.submitted = true;
          const newSkillObj = new Skills(skillObj);
          console.log('saving in else');
          return newSkillObj.save();
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
