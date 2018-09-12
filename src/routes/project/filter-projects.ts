import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';

import { Project } from '../../models/Project';
import { Favorites } from '../../models/Favorites';

import { escapeRegex } from '../../utils/escape-regex';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

// route handler
export const filterProject: RequestHandler = async (req, res, next) => {
  try {
    let { _limit = 50, _skip = 0 } = req.body;

    _limit = +_limit;
    _skip = +_skip;

    if (isNaN(_limit) || isNaN(_skip)) {
      return next(
        new RequestError(
          RequestErrorType.BAD_REQUEST,
          'limit and skip should be numbers',
        ),
      );
    }

    delete req.body._limit;
    delete req.body._skip;

    // init
    let projects: any[] = null;
    let count: number = null;

    const userIdForListingFavs: string = req.body.userId
      ? req.body.userId
      : res.locals.user
        ? res.locals.user.userId
        : null;

    // determine the fn to activate
    if (req.body.searchKey) {
      const result = await regexKeySearch(
        req.body,
        userIdForListingFavs,
        _limit,
        _skip,
      );
      projects = result.projects;
      count = result.count;
    } else {
      const result = await normalFind(
        req.body,
        userIdForListingFavs,
        _limit,
        _skip,
      );
      projects = result.projects;
      count = result.count;
    }

    if (userIdForListingFavs) {
      projects = await attachFavoritesFlag(projects, userIdForListingFavs);
    }

    // console.log('projects........', projects);
    return res.status(200).send({
      msg: 'success',
      count,
      projects,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};

// attach favorites flag for projects
async function attachFavoritesFlag(projects: any[], userId: string) {
  const projectsMapped = await BluePromise.map(projects, async project => {
    const isFavorite = await Favorites.count({
      userId,
      type: 'project',
      projectsId: project._id,
    }).exec();

    if (isFavorite) {
      project.favorite = true;
    } else {
      project.favorite = false;
    }
    return project;
  });

  return projectsMapped;
}

// usual query
async function normalFind(
  body: any,
  userId: string,
  limit: number,
  skip: number,
) {
  const removeFavs = body._removeFavs || false;
  delete body._removeFavs;

  if (removeFavs && userId) {
    const favProjectIds = await Favorites.find({
      userId,
      type: 'project',
    })
      .distinct('projectsId')
      .exec();

    body._id = { $nin: favProjectIds };
  }
  const projectsPromise = Project.find(body)
    .populate('category')
    .populate('subcategory')
    .populate('industryLine')
    .populate('businessFunctions')
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
  const countPromise = Project.count(body).exec();

  const [projects, count] = await BluePromise.all([
    projectsPromise,
    countPromise,
  ]);

  return { projects, count };
}

// regex key search
async function regexKeySearch(
  reqQuery: any,
  userId: string,
  limit: number,
  skip: number,
) {
  const key: string = reqQuery.searchKey;
  delete reqQuery.searchKey;
  const removeFavs = reqQuery._removeFavs || false;
  delete reqQuery._removeFavs;

  const text = escapeRegex(key);
  const regex = new RegExp(text, 'gi');

  if (removeFavs && userId) {
    const favProjectIds = await Favorites.find({
      userId,
      type: 'project',
    })
      .distinct('projectsId')
      .exec();

    reqQuery._id = { $nin: favProjectIds };
  }

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
    .lean()
    .exec();

  const countPromise = Project.count(condition).exec();

  const [projects, count] = await BluePromise.all([
    projectsPromise,
    countPromise,
  ]);

  return { projects, count };
}
