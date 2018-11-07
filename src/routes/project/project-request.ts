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

    req.body.userId = req.body.userId
      ? req.body.userId
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
    console.log('client dreatils...............', clientDetails);

    let skillTitles: any = [];
    if (req.body.skillsAndExperience && req.body.skillsAndExperience.length) {
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
      skills: skillTitles || null,
      // industry: null,
      // clientName: null,
    };
    if (clientDetails && clientDetails.companyName) {
      matchingParams.clientName = clientDetails.companyName || null;
    }
    let userIds: string[];
    // let role;
    let role: 'PM' | 'Consultant' = 'Consultant';
    if (req.body.runnerType && req.body.runnerType === 'Consultant') {
      role = 'Consultant';
      userIds = await getMatchingResult(matchingParams, 3, 100, role);
    } else if (req.body.runnerType && req.body.runnerType === 'PM') {
      role = 'PM';
      userIds = await getMatchingResult(matchingParams, 1, 100, role);
    }

    if (!userIds.length) {
      // if (req.body.runnerType === 'Consultant') {
      //   await ProjectRequest.findOneAndUpdate(
      //     { _id: req.body._id },
      //     {
      //       $set: {
      //         consultantIds: [
      //           '5b87b2da4d36dd7a2c2214ef',
      //           '5b924589b8a45351013f0215',
      //           '5b925b7cc0624033703c2c89',
      //         ],
      //       },
      //     },
      //     { new: true },
      //   ).exec();
      //   const mailOptions1: any = {
      //     toAddresses: [
      //       'paul@yopmail.com',
      //       'adam@yopmail.com',
      //       'gal@yopmail.com',
      //     ],
      //     template: EmailTemplates.PROJECT_REQUEST_EMAIL,
      //     fromName: 'Capricorns Team',
      //     subject: `New Project Request`,
      //   };
      //   await sendEmail(mailOptions1);
      // } else if (req.body.runnerType === 'PM') {
      //   await ProjectRequest.findOneAndUpdate(
      //     { _id: req.body._id },
      //     { $set: { pmIds: ['5bc03b731270bb34b65e9124'] } },
      //     { new: true },
      //   ).exec();
      //   const mailOptions1: any = {
      //     toAddresses: ['pma@yopmail.com'],
      //     template: EmailTemplates.PROJECT_REQUEST_EMAIL,
      //     fromName: 'Capricorns Team',
      //     subject: `New Project Request`,
      //   };
      //   await sendEmail(mailOptions1);
      // }

      return res.status(200).send({ success: true });
    }

    const userMailIds = await User.find({ _id: { $in: userIds } })
      .distinct('email')
      .exec();
    let requestUpdate;
    if (req.body.runnerType === 'Consultant') {
      requestUpdate = ProjectRequest.findOneAndUpdate(
        { _id: req.body._id },
        { $set: { consultantIds: userIds } },
        { new: true },
      ).exec();
    } else if (req.body.runnerType === 'PM') {
      requestUpdate = ProjectRequest.findOneAndUpdate(
        { _id: req.body._id },
        { $set: { pmIds: userIds } },
        { new: true },
      ).exec();
    }
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
