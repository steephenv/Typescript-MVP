import { RequestHandler } from 'express';

import { Jwt } from '../../routes/auth/utils/Jwt';
import { PersonalDetails } from '../../models/PersonalDetails';
import { User } from '../../models/User';
import { getRoleIconData } from '../utils/assets/role-icons';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const decodeToken: RequestHandler = async (req, res, next) => {
  try {
    // const token = (req.get('Authorization') || '').split(' ');
    const token = req.body.token;
    let decodedToken: any;
    // if (token[0] === 'Bearer') {
    //   decodedToken = await Jwt.verify(token[1]);
    // }
    if (token) {
      decodedToken = await Jwt.verify(token);
    }
    const personalDetail = await PersonalDetails.findOne({
      userId: decodedToken.userId,
    })
      .lean()
      .exec();
    const user: any = await User.findOne({ _id: decodedToken.userId }).exec();
    user.password = null;
    let userImage = '';
    let middleName = '';
    if (personalDetail) {
      userImage = personalDetail.image;
    }
    if (personalDetail && personalDetail.middleName) {
      middleName = personalDetail.middleName;
    }

    let roleData: any = [];

    // if (
    //   decodedToken.role === 'User' &&
    //   (decodedToken.appliedRole === 'Employee' ||
    //     decodedToken.appliedRole === 'Consultant')
    // ) {
    roleData = getRoleIconData('UserEmployeeConsultant');
    // } else {
    roleData = getRoleIconData(decodedToken.role);
    // }
    const accessToken = await Jwt.sign({
      userId: decodedToken._id,
      role: decodedToken.role,
      appliedRole: decodedToken.appliedRole,
    });
    return res.status(200).send({
      success: true,
      data: user,
      //   decodedToken,
      accessToken,
      userImage,
      middleName,
      roleData,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};
