import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { ProjectTitle } from '../../models/ProjectTitles'

export const searchTitles: RequestHandler = async (req, res, next) => {
  try {
    const condition: any = {};
    let titleSearched: any; 
    if(req.query && req.query.text){
      const projectText = req.query.text ? req.query.text : '';
      const regexp = new RegExp(`${projectText}`, 'i');
      condition.projectTitle = regexp;
      titleSearched = await ProjectTitle.find(condition)
        .select('projectTitle')
        .exec();
    } else {
      titleSearched = await ProjectTitle.find({})
      .select('projectTitle')
      .exec();
    } 
  
    return res.status(200).send({
      success: true,
      title: titleSearched,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
