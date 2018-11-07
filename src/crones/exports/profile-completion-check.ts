import { get as getConfig } from 'config';

import { InterviewDetails } from '../../models/InterviewDetails';
import { User } from '../../models/User';

import { EmailTemplates, sendEmail } from '../../email/send-email';

export const dayCheck = async () => {
  try {
    const thirdDay = new Date(
      new Date().setUTCDate(new Date().getUTCDate() + 3),
    );
    const secondDay = new Date(
      new Date().setUTCDate(new Date().getUTCDate() + 2),
    );
    const secondDayStarting = new Date(secondDay.setUTCHours(0, 0, 0, 0));
    const thirdDayEnding = new Date(thirdDay.setUTCHours(23, 59, 59, 999));

    const query = {
      startTime: { $gte: secondDayStarting },
      endTime: { $lte: thirdDayEnding },
      interviewStatus: 'Applied',
    };
    const userIds = await InterviewDetails.find(query)
      .distinct('contestantId')
      .exec();

    const userMails: string[] = await User.find({
      _id: { $in: userIds },
      profileDataVerified: false,
    })
      .distinct('email')
      .exec();

    for (const userMail of userMails) {
      if (!userMail) {
        continue;
      }
      const mailOptions = {
        toAddresses: [userMail],
        template: EmailTemplates.PROFILE_COMPLETION_NOTIFIER,
        fromName: 'Capricorns Team',
        subject: `Profile Completion`,
        fields: {
          url: `${getConfig('frontEnd.web.baseUrl')}/#/interview`,
        },
      };

      await sendEmail(mailOptions);
      // tslint:disable-next-line:no-console
      console.log('mail sent to' + userMail);
    }
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log('err in cron > profile-completion-check', err);
  }
};
