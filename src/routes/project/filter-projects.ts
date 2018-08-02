import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { Project } from '../../models/Project';
import { escapeRegex } from '../../utils/escape-regex';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

// route handler
export const filterProject: RequestHandler = async (req, res, next) => {
  try {
    // console.log('---body', req.body);
    const { _limit = 50, _skip = 0 } = req.body;

    delete req.body._limit;
    delete req.body._skip;

    // init
    let projects: any[] = null;
    let count: number = null;

    // determine the fn to activate
    if (req.body.searchKey) {
      const result = await regexKeySearch(req.body, _limit, _skip);
      projects = result.projects;
      count = result.count;
    } else {
      const result = await normalFind(req.body, _limit, _skip);
      projects = result.projects;
      count = result.count;
    }
    // console.log(projects);
    return res.status(200).send({
      msg: 'success',
      count,
      projects,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};

// usual query
async function normalFind(body: any, limit: number, skip: number) {
  const projectsPromise = Project.find(body)
    .populate('category')
    .populate('subcategory')
    .populate('industryLine')
    .populate('businessFunctions')
    .skip(skip)
    .limit(limit)
    .exec();
  const countPromise = Project.count(body).exec();

  const [projects, count] = await BluePromise.all([
    projectsPromise,
    countPromise,
  ]);

  return { projects, count };
}

// regex key search
async function regexKeySearch(reqQuery: any, limit: number, skip: number) {
  const key: string = reqQuery.searchKey;
  delete reqQuery.searchKey;

  const text = escapeRegex(key);
  const regex = new RegExp(text, 'gi');

  // make condition
  const condition = Object.assign(
    {},
    {
      $or: [{ projectTitle: regex }],
    },
    reqQuery,
  );

  const projectsPromise = Project.find(condition)
    .populate('category')
    .populate('subcategory')
    .populate('industryLine')
    .populate('businessFunctions')
    .skip(skip)
    .limit(limit)
    .exec();

  const countPromise = Project.count(condition).exec();

  const [projects, count] = await BluePromise.all([
    projectsPromise,
    countPromise,
  ]);

  return { projects, count };
}
