import { GQLErr, GQLErrType } from '../../graphql-compiler/tools';

import { Goals } from '../../models/Goals';
import { updateValidator } from './validators/save-update-goals-rules';

export const querySchema = `goals: Goals`;
export const otherSchema = `
  type Goals {
    saveOrUpdate(content:Object!): Object
  }
`;

export const resolver = { goals };

class GoalClass {
  public async saveOrUpdate({ content }: { content: any }, { res }: any) {
    const { errFound, error } = updateValidator(content);

    if (errFound) {
      throw new GQLErr(GQLErrType.BAD_REQUEST, error);
    }

    try {
      const skillTargetsArray = content.skillTargets.map((target: any) => {
        return {
          targetProficiency: target.targetProficiency,
          skillId: target.skillId._id,
        };
      });

      content.skillTargets = skillTargetsArray;
      const comingUserId = content.userId
        ? content.userId
        : res.locals.user
          ? res.locals.user.userId
          : null;

      if (!comingUserId) {
        throw new GQLErr(GQLErrType.FORBIDDEN, 'No token Found');
      }

      let goalDetails: any = {};

      if (content._id) {
        const contentId = content._id;
        delete content._id;
        goalDetails = await Goals.update({ _id: contentId }, { $set: content });
      } else {
        content.userId = comingUserId;
        const newGoalDetails = new Goals(content);
        goalDetails = await newGoalDetails.save();
      }

      return goalDetails;
    } catch (err) {
      throw new GQLErr(GQLErrType.INTERNAL_SERVER_ERROR, err);
    }
  }
}

function goals() {
  return new GoalClass();
}
