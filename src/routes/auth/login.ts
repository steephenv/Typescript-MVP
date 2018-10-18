import { RequestHandler } from 'express';

import { User } from '../../models/User';
import { TempUser } from '../../models/TempUser';
import { Jwt } from './utils/Jwt';

// import { makeJwtToken } from '../../middlewares/jwt';

import { messages } from '../../config/app/messages';

import { getRoleIconData } from '../utils/assets/role-icons';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { PersonalDetails } from '../../models/PersonalDetails';

export const login: RequestHandler = async (req, res, next) => {
  try {
    req.body.username = (req.body.username as string).toLowerCase();
    const user: any = await User.findOne({ email: req.body.username }).exec();
    if (!user) {
      const tempUser: any = await TempUser.findOne({
        email: req.body.username,
      }).exec();
      if (tempUser) {
        return next(
          new RequestError(
            RequestErrorType.LOGIN_FAILED,
            messages.EmailVerificationPending.ENG,
          ),
        );
      }
      return next(
        new RequestError(RequestErrorType.LOGIN_FAILED, messages.noUser.ENG),
      );
    }

    const compare = await user.comparePassword(req.body.password);
    if (!compare) {
      return next(
        new RequestError(RequestErrorType.LOGIN_FAILED, messages.noUser.ENG),
      );
    }

    const personalDetail = await PersonalDetails.findOne({
      userId: user._id,
    })
      .lean()
      .exec();
    let userImage = '';
    let middleName = '';
    if (personalDetail) {
      userImage = personalDetail.image;
    }
    if (personalDetail && personalDetail.middleName) {
      middleName = personalDetail.middleName;
    }

    let roleData: any = [];

    if (
      user.role === 'User' &&
      (user.appliedRole === 'Employee' || user.appliedRole === 'Consultant')
    ) {
      roleData = getRoleIconData('UserEmployeeConsultant');
    } else {
      roleData = getRoleIconData(user.role);
    }
    const accessToken = await Jwt.sign({
      userId: user._id,
      role: user.role,
      appliedRole: user.appliedRole,
    });
    return res.status(200).send({
      success: true,
      data: user,
      accessToken,
      userImage,
      middleName,
      roleData,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
