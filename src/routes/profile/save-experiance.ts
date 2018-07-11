import { RequestHandler } from 'express';

import { experiance } from '../../models/Experiance';
import { projects } from '../../models/Projecs';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveExperiance: RequestHandler = async (req, res, next) => {
  try {
    const criteria = {
      updatedAt: new Date(),
      duration: {
        from: req.body.from,
        to: req.body.to,
      },
      typeOfEngagement: req.body.typeOfEngagement,
      jobTitle: req.body.jobTitle,
      businessFunction: req.body.businessFunction,
      companyName: req.body.companyName,
      companyIndustryLine: req.body.companyIndustryLine,
      companySize: req.body.companySize,
      locationCountry: req.body.locationCountry,
      locationCity: req.body.locationCity,
      mainResponsibility: req.body.mainResponsibility,
      peopleManagementResponsibility: req.body.peopleManagementResponsibility,
      managedTeamSize: req.body.managedTeamSize,
      budgetResponsibility: req.body.budgetResponsibility,
    };
    const criteria2 = {
      updatedAt: new Date(),
      engagementDuration: {
        from: req.body.projectfrom,
        to: req.body.projectto,
      },
      engagementAs: req.body.engagementAs,
      projectName: req.body.projectName,
      clientsCompanyName: req.body.clientsCompanyName,
      CompanyIndustryLine: req.body.projectCompanyIndustryLine,
      clientsCompanySize: req.body.clientsCompanySize,
      locationCountry: req.body.projectCountry,
      locationCity: req.body.projectCity,
      businessFunction: req.body.businessFunction,
      projectGoal: req.body.projectGoal,
      projectDuration: req.body.projectDuration,
      projectSize: req.body.projectSize,
      projectComplexity: req.body.projectComplexity,
      projectRegionalReach: req.body.projectRegionalReach,
      yourRole: req.body.yourRole,
      projectteamSize: req.body.projectteamSize,
      budgetResponsibility: req.body.projectBudgetResponsibility,
      yourMainResults: req.body.yourMainResults,
      applicableToOtherCompanies: req.body.applicableToOtherCompanies,
    };
    await experiance.findOneAndUpdate(
      { userId: req.body.userId },
      { $set: { criteria } },
    );
    await projects.findOneAndUpdate(
      { userId: req.body.userId },
      { $set: { criteria2 } },
    );
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
