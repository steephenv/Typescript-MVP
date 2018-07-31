import { RequestHandler } from 'express';
import { Project } from '../../models/Project';
// import { ProjectCategory } from '../../models/ProjectCategory';
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
    if (req.body.searchKey) {
      const regexp = new RegExp(`^${req.query.searchKey}`);
      queryArray.push({ projectTittle: regexp });
    }
    if (req.body.industryLine) {
      queryArray.push({ industryLine: req.body.industryLine });
    }
    if (req.body.businessFunctions) {
      queryArray.push({ businessFunctions: req.body.businessFunctions });
    }
    if (req.body.category) {
      queryArray.push({ category: req.body.category });
    }
    if (req.body.subCategory) {
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
    if (!queryArray) {
      projectList = await Project.find({
        $and: queryArray,
        // $and: [
        //   { Industry: { $in: req.body.category } },
        //   { businessFunctions: { $in: req.body.businessFunctions } },
        //   { ProjectCategory: { $in: req.body.category } },
        //   { ProjectSubCategory: { $in: req.body.subCategory } },
        //   { technology: req.body.technology },
        //   { effort: req.body.effort },
        //   { price: req.body.price },
        //   { impact: req.body.impact },
        //   { referenceClientTypes: req.body.referenceClientTypes },
        //   { referenceProjectDate: req.body.referenceProjectDate },
        //   { referenceCountry: req.body.referenceCountry },
        //   { referenceLanguage: req.body.referenceLanguage },
        // ],
      })
        .populate('category')
        .populate('subcategory')
        .populate('industryLine')
        .populate('businessFunctions')
        .exec();
    } else {
      projectList = await Project.find({})
        .populate('category')
        .populate('subcategory')
        .populate('industryLine')
        .populate('businessFunctions')
        .exec();
    }
    return res.status(200).send({
      success: true,
      projects: projectList,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
