import { RequestHandler } from 'express';
import { Project } from '../../models/Project';
import { ProjectCategory } from '../../models/ProjectCategory';
import { ProjectSubCategory } from '../../models/ProjectSubCategory';
import { IndustryLine } from '../../models/IndustryLine';
import { TempBusFunction } from '../../models/BusinessFunction';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const searchProjects: RequestHandler = async (req, res, next) => {
  try {
    const indId = await IndustryLine.find({
      industryLine: req.body.industryLine,
    })
      .distinct('_id')
      .exec();
    const busFnId = await TempBusFunction.find({
      businessFunction: req.body.businessFunctions,
    })
      .distinct('_id')
      .exec();
    const catId = await ProjectCategory.find({
      category: req.body.category,
    })
      .distinct('_id')
      .exec();
    const subCatId = await ProjectSubCategory.find({
      subCategory: req.body.subCategory,
    })
      .distinct('_id')
      .exec();
    const projectList = await Project.find({
      $or: [
        { IndustryLine: { $in: indId } },
        { TempBusFunction: { $in: busFnId } },
        { ProjectCategory: { $in: catId } },
        { ProjectSubCategory: { $in: subCatId } },
        { technology: req.body.technology },
        { effort: req.body.effort },
        { price: req.body.price },
        { impact: req.body.impact },
        { referenceClientTypes: req.body.referenceClientTypes },
        { referenceProjectDate: req.body.referenceProjectDate },
        { referenceCountry: req.body.referenceCountry },
        { referenceLanguage: req.body.referenceLanguage },
      ],
    })
      .populate('category')
      .populate('subcategory')
      .populate('industryLine')
      .populate('businessFunctions')
      .exec();
    // console.log(projectList);
    return res.status(200).send({
      success: true,
      projects: projectList,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
