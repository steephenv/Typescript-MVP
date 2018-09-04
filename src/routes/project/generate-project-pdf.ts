import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';
import * as ejs from 'ejs';
import * as pdf from 'html-pdf';
import * as path from 'path';

import { Project } from '../../models/Project';
import { ProjectRequest } from '../../models/ProjectRequest';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

const ejsPath = path.join(__dirname, '../utils/projects/project-pdf.ejs');

function getHtmlString(newEjsPath: string, dataObj: any) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(newEjsPath, dataObj, (err, str) => {
      if (err) {
        return reject(err);
      }
      return resolve(str);
    });
  });
}

export const getProjectData = async (
  comingUserId: string,
  projectsId: string,
) => {
  const projectDataPromise: any = Project.findOne({
    _id: projectsId,
    userId: comingUserId,
  })
    .lean()
    .exec();
  const projectRequestDataPromise = ProjectRequest.findOne({
    userId: comingUserId,
    projectId: projectsId,
  })
    .lean()
    .exec();
  return await BluePromise.all([projectDataPromise, projectRequestDataPromise]);
};

export const generateProjectPdf: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.query.userId ? req.query.userId : res.locals.user.userId;
    const projectsId = req.query.projectId;
    const [
      projectDetailsData,
      projectRequestDetailsData,
    ] = await getProjectData(userId, projectsId);

    const htmlString: any = await getHtmlString(ejsPath, {
      projectDetailsData,
      projectRequestDetailsData,
    });

    const options: any = {
      format: 'A4',
      width: '1100px',
      height: '1400px',
      orientation: 'portrait',
      margin: '5cm',
      border: {
        top: '1in', // default is 0, units: mm, cm, in, px
        right: '1in',
        bottom: '1in',
        left: '1in',
      },
    };

    pdf.create(htmlString, options).toStream((err: any, stream: any) => {
      if (err) {
        return next(
          new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err),
        );
      }

      return stream.pipe(res);
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
