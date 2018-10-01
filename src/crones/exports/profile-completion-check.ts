import { InterviewDetails } from '../../models/InterviewDetails';
import { User } from '../../models/User';

import { EmailTemplates, sendEmail } from '../../email/send-email';

export const dayCheck = async () => {
  const thirdDay = new Date(new Date().setUTCDate(new Date().getUTCDate() + 3));
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

  const userMails = await User.find({
    _id: { $in: userIds },
    profileDataVerified: false,
  })
    .distinct('email')
    .exec();

  const mailNotifier = {
    toAddresses: userMails,
    template: EmailTemplates.PROFILE_COMPLETION_NOTIFIER,
    fromName: 'Capricorns Team',
    subject: `Profile Completion`,
    fields: {
      url: 'https://dev-miwago.cubettech.in/#/interview',
    },
  };

  if (userMails && userMails.length) {
    await sendEmail(mailNotifier);
  }
};
