import { RequestHandler } from 'express';

import { Project } from '../../models/Project';
import { escapeRegex } from '../../utils/escape-regex';

// import { ProjectSubCategory } from '../../models/ProjectSubCategory';
// import { Industry } from '../../models/Industries';
// import { BusinessFunction } from '../../models/Business-function';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const searchProjects: RequestHandler = async (req, res, next) => {
  try {
    const queryArray = [];
    if (req.body.searchKey || true) {
      // const regexp = new RegExp(`^${req.body.searchKey}`);
      const text = escapeRegex(req.body.searchKey);
      const regexp = new RegExp(text, 'gi');

      queryArray.push({ projectTittle: regexp || '' });
    }
    if (req.body.industryLine.length) {
      queryArray.push({ industryLine: req.body.industryLine });
    }
    if (req.body.businessFunctions.length) {
      queryArray.push({ businessFunctions: req.body.businessFunctions });
    }
    if (req.body.category.length) {
      queryArray.push({ category: req.body.category });
    }
    if (req.body.subCategory.length) {
      queryArray.push({ subCategory: req.body.subCategory });
    }
    if (req.body.technology) {
      queryArray.push({ technology: req.body.technology });
    }
    if (req.body.effort) {
      queryArray.push({ effort: req.body.effort });
    }
    if (req.body.price) {
      queryArray.push({ price: req.body.price });
    }
    if (req.body.impact) {
      queryArray.push({ impact: req.body.impact });
    }
    if (req.body.referenceClientTypes) {
      queryArray.push({ referenceClientTypes: req.body.referenceClientTypes });
    }
    if (req.body.referenceProjectDate) {
      queryArray.push({ referenceProjectDate: req.body.referenceProjectDate });
    }
    if (req.body.referenceCountry) {
      queryArray.push({ referenceCountry: req.body.referenceCountry });
    }
    if (req.body.referenceLanguage) {
      queryArray.push({ referenceLanguage: req.body.referenceLanguage });
    }
    let projectList;
    // if (queryArray.length === 0) {

    const cond = {
      $and: queryArray,
    };

    projectList = await Project.find(cond)
      .populate('category')
      .populate('subcategory')
      .populate('industryLine')
      .populate('businessFunctions')
      .lean()
      .exec();
    // } else {
    // projectList = await Project.find({})
    //   .populate('category')
    //   .populate('subcategory')
    //   .populate('industryLine')
    //   .populate('businessFunctions')
    //   .exec();
    // }
    return res.status(200).send({
      success: true,
      projects: projectList,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
