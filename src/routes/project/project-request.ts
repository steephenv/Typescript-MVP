import { ProjectRequest } from '../../models/ProjectRequest';
import { Project } from '../../models/Project';
import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { getMatchingResult } from '../../utils/matching-system';
import { EmailTemplates, sendEmail } from '../../email/send-email';

import { User } from '../../models/User';

export const saveProjectRequest: RequestHandler = async (req, res, next) => {
  try {
    // const consNo = await User.count({ role: 'Consultant' }).exec();
    // req.body.bestFitNo = consNo;
    req.body.userId = req.query.userId
      ? req.query.userId
      : res.locals.user.userId;
    req.body.updatedAt = new Date();

    const requestDetails: any = await ProjectRequest.findOneAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      { upsert: true, new: true },
    ).exec();

    if (!requestDetails || requestDetails.status !== 'Request') {
      return res.status(200).send({ success: true });
    }

    let industryLineName = '';
    const projCatalog = await Project.findOne({
      _id: req.body.projectId,
    })
      .populate('industryLine')
      .lean()
      .exec();

    if (projCatalog && projCatalog.industryLine) {
      industryLineName = projCatalog.industryLine.name;
    }

    const clientDetails = await User.findOne({ _id: req.body.userId })
      .lean()
      .exec();

    let skillTitles: any = [];
    if (req.body.skillsAndExperience.length) {
      req.body.skillsAndExperience.forEach((skillData: any) => {
        if (skillData.functional.length) {
          skillTitles = skillTitles.concat(skillData.functional);
        }
        if (skillData.personal.length) {
          skillTitles = skillTitles.concat(skillData.personal);
        }
        if (skillData.leadership.length) {
          skillTitles = skillTitles.concat(skillData.leadership);
        }
        if (skillData.entrepreneurship.length) {
          skillTitles = skillTitles.concat(skillData.entrepreneurship);
        }
      });
    }

    const matchingParams: any = {
      startTime: req.body.targetStart,
      endTime: req.body.expectedEnd,
      // topic: null,
      topic: req.body.projectName || null,
      industry: industryLineName || null,
      clientName: clientDetails.companyName || null,
      skills: skillTitles || null,
      // industry: null,
      // clientName: null,
    };

    const userIds = await getMatchingResult(matchingParams, 3);

    console.log('userId::', userIds); // tslint:disable-line

    if (!userIds.length) {
      return res.status(200).send({ success: true });
    }

    const userMailIds = await User.find({ _id: { $in: userIds } })
      .distinct('email')
      .exec();

    const requestUpdate = await ProjectRequest.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { consultantIds: userIds } },
      { new: true },
    ).exec();

    const mailOptions: any = {
      toAddresses: userMailIds,
      template: EmailTemplates.PROJECT_REQUEST_EMAIL,
      fromName: 'Capricorns Team',
      subject: `New Project Request`,
    };

    const mailSend = sendEmail(mailOptions);

    await BluePromise.all([requestUpdate, mailSend]);

    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
