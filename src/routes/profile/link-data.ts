import { RequestHandler } from 'express';
import * as lme from 'lme';
import * as extract from 'extract-zip';
import * as csv from 'fast-csv';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as userHome from 'user-home';

import { PersonalDetails } from '../../models/PersonalDetails';
import { CustomerCredentials } from '../../models/CustomerCredentials';
import { Education } from '../../models/Education';
import { Experience } from '../../models/Experience';
import { EmployeeProjects } from '../../models/EmployeeProjects';
import { User } from '../../models/User';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const linkData: RequestHandler = async (req, res, next) => {
  try {
    const userDir = res.locals.user.userId;
    const dir = userHome + `/zipped + ${userDir} `;

    const filename = req.file.filename;

    const dir1 = userHome + `/zipped/${userDir}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    // unzipping zip file....

    await new Promise((resolve, reject) => {
      extract(req.file.path, { dir: dir1 }, (err: any) => {
        if (err) {
          return reject();
        } else {
          return resolve();
        }
      });
    });

    let tempEducation;
    let tempEmails;
    let tempPositions;
    let tempProfiles;
    let tempConnection;
    let tempSkills;

    if (userHome + '/' + `zipped/${userDir}/Education.csv`) {
      tempEducation = userHome + '/' + `zipped/${userDir}/Education.csv`;
    }
    if (userHome + '/' + `zipped/${userDir}/Email Addresses.csv`) {
      tempEmails = userHome + '/' + `zipped/${userDir}/Email Addresses.csv`;
    }
    if (userHome + '/' + `zipped/${userDir}/Positions.csv`) {
      tempPositions = userHome + '/' + `zipped/${userDir}/Positions.csv`;
    }
    if (userHome + '/' + `zipped/${userDir}/Profile.csv`) {
      tempProfiles = userHome + '/' + `zipped/${userDir}/Profile.csv`;
    }
    if (userHome + '/' + `zipped/${userDir}/Connections.csv`) {
      tempConnection = userHome + '/' + `zipped/${userDir}/Connections.csv`;
    }
    if (userHome + '/' + `zipped/${userDir}/Skills.csv`) {
      tempSkills = userHome + '/' + `zipped/${userDir}/Skills.csv`;
    }
    // saving primary email
    const primaryData: any = await User.findOne({
      _id: res.locals.user.userId,
    }).exec();
    if (primaryData) {
      primaryData.isLinkedinProfileFetched = true;
      await primaryData.save();
    }

    if (tempEducation) {
      const column: any = [];
      let tempcolumn: any = [];
      csv
        .fromPath(tempEducation)
        .on('data', data => {
          column.push(data);
        })
        .on('end', (data: any) => {
          tempcolumn = column[0];
          const klength: any = tempcolumn.length;
          const objArray: any = [];
          column.forEach((arr: any, i: any) => {
            if (i === 0) {
              return;
            }
            if (klength === arr.length) {
              const obj: any = {};
              tempcolumn.forEach((key: any, j: any) => {
                key = key.trim();
                obj[key] = arr[j];
              });
              objArray.push(obj);
            }
          });
          objArray.forEach(async (dataobj: any) => {
            const datakey: any = Object.keys(dataobj);
            const eduData = new Education({
              userId: res.locals.user.userId,
              nameOfInstitution: dataobj[datakey[0]],
              // durationFrom: dataobj[datakey[1]],
              // durationTo: dataobj[datakey[2]],
              major: dataobj[datakey[3]],
              degree: dataobj[datakey[4]],
              activities: dataobj[datakey[5]],
            });
            await eduData.save();
          });
        });
    }
    if (tempProfiles) {
      const column: any = [];
      let tempcolumn: any = [];
      csv
        .fromPath(tempProfiles)
        .on('data', data => {
          column.push(data);
        })
        .on('end', async () => {
          tempcolumn = column[0];
          const klength: any = tempcolumn.length;
          const objArray: any = [];
          column.forEach((arr: any, i: any) => {
            if (i === 0) {
              return;
            }
            if (klength === arr.length) {
              const obj: any = {};
              tempcolumn.forEach((key: any, j: any) => {
                key = key.trim();
                obj[key] = arr[j];
              });
              objArray.push(obj);
            }
          });
          let profData: any = {};
          objArray.forEach(async (dataobj: any) => {
            const datakey: any = Object.keys(dataobj);
            let birthD = '';
            try {
              const newDateObj = new Date(dataobj[datakey[4]]); //tslint:disable-line
              birthD = dataobj[datakey[4]];
            } catch (err) {} //tslint:disable-line
            profData = {
              birthDate: birthD,
              country: dataobj[datakey[9]],
              zipCode: dataobj[datakey[10]],
              personalStatement: dataobj[datakey[6]],
              summary: dataobj[datakey[7]],
              maidenName: dataobj[datakey[2]],
              primaryEmail: primaryData.email,
            };
            await PersonalDetails.update(
              { userId: res.locals.user.userId },
              { $set: profData },
              { upsert: true },
            );
            // await BluePromise.all([updateUser, personalUpdate]);
          });
          objArray.forEach(async (dataobj: any) => {
            const datakey: any = Object.keys(dataobj);
            const workExData = new Experience({
              userId: res.locals.user.userId,
              companyIndustryLine: dataobj[datakey[8]],
            });
            await workExData.save();
          });
        });
    }
    if (tempEmails) {
      const column: any = [];
      let tempcolumn: any = [];
      csv
        .fromPath(tempEmails)
        .on('data', data => {
          column.push(data);
        })
        .on('end', () => {
          tempcolumn = column[0];
          const klength: any = tempcolumn.length;
          const objArray: any = [];
          column.forEach((arr: any, i: any) => {
            if (klength === arr.length) {
              const obj: any = {};
              tempcolumn.forEach((key: any, j: any) => {
                key = key.trim();
                obj[key] = arr[j];
              });
              objArray.push(obj);
            }
          });
          let flag = 0;
          objArray.forEach(async (dataobj: any) => {
            // console.log('the object array looped data = ', dataobj);
            const datakey: any = Object.keys(dataobj);
            // if (dataobj[datakey[2]] === 'Yes') {
            //   const primaryCriteria = {
            //     primaryEmail: dataobj[datakey[0]],
            //   };
            //   // updating CostomerCredentials schema.....
            //   await PersonalDetails.findOneAndUpdate(
            //     { userId: res.locals.user.userId },
            //     { $set: { primaryCriteria } },
            //   );
            // } else if
            if (dataobj[datakey[2]] === 'No' && flag === 0) {
              // finding primary email from usermodel.......
              // const primaryData: any = await User.findOne({
              //   _id: res.locals.user.userId,
              // }).exec();
              const secondaryCriteria = {
                // primaryEmail: primaryData.email,
                secondaryEmail: dataobj[datakey[0]],
              };
              flag++;
              // updating CostomerCredentials schema.....
              await PersonalDetails.findOneAndUpdate(
                { userId: res.locals.user.userId },
                { $set: { secondaryCriteria } },
              );
            }
          });
        });
    }

    if (tempPositions) {
      const column: any = [];
      let tempcolumn: any = [];
      csv
        .fromPath(tempPositions)
        .on('data', data => {
          // console.log(data);
          column.push(data);
        })
        .on('end', () => {
          tempcolumn = column[0];
          const klength: any = tempcolumn.length;
          // const remainingArray: any = column.shift();
          const objArray: any = [];
          column.forEach((arr: any, i: any) => {
            if (klength === arr.length) {
              const obj: any = {};
              tempcolumn.forEach((key: any, j: any) => {
                key = key.trim();
                obj[key] = arr[j];
              });
              objArray.push(obj);
            }
          });

          objArray.forEach(async (dataobj: any) => {
            const datakey: any = Object.keys(dataobj);
            const projdata = new EmployeeProjects({
              userId: res.locals.user.userId,
              clientsCompanyName: dataobj[datakey[0]],
              // engagementFrom: dataobj[datakey[4]],
              engagement: dataobj[datakey[5]],
              roleDescription: dataobj[datakey[2]],
              role: dataobj[datakey[1]],
            });
            await projdata.save();
          });
        });
    }
    if (tempSkills) {
      const column: any = [];
      let tempcolumn: any = [];
      csv
        .fromPath(tempSkills)
        .on('data', data => {
          // console.log(data);
          column.push(data);
        })
        .on('end', () => {
          tempcolumn = column[0];
          const klength: any = tempcolumn.length;
          // const remainingArray: any = column.shift();
          const objArray: any = [];
          column.forEach((arr: any, i: any) => {
            if (klength === arr.length) {
              const obj: any = {};
              tempcolumn.forEach((key: any, j: any) => {
                key = key.trim();
                obj[key] = arr[j];
              });
              objArray.push(obj);
            }
          });
          objArray.forEach(async (dataobj: any) => {
            const datakey: any = Object.keys(dataobj);
            const criteria = {
              subCategory: dataobj[datakey[0]],
            };
            // updating PersonalData schema.....
            await PersonalDetails.findOneAndUpdate(
              { userId: res.locals.user.userId },
              { $push: { criteria } },
            );
          });
        });
    }
    if (tempConnection) {
      const column: any = [];
      let tempcolumn: any = [];
      csv
        .fromPath(tempConnection)
        .on('data', data => {
          // console.log(data);
          column.push(data);
        })
        .on('end', () => {
          tempcolumn = column[0];
          const klength: any = tempcolumn.length;
          // const remainingArray: any = column.shift();
          const objArray: any = [];
          column.forEach((arr: any, i: any) => {
            if (klength === arr.length) {
              const obj: any = {};
              tempcolumn.forEach((key: any, j: any) => {
                key = key.trim();
                obj[key] = arr[j];
              });
              objArray.push(obj);
            }
          });
          // console.log(objArray);
          objArray.forEach(async (dataobj: any) => {
            // console.log('the object array looped data = ', dataobj);
            const datakey: any = Object.keys(dataobj);
            const custdata = new CustomerCredentials({
              userId: res.locals.user.userId,
              name: dataobj[datakey[0]],
              position: dataobj[datakey[4]],
              company: dataobj[datakey[3]],
            });
            await custdata.save();
            // const criteria = {
            //   name: dataobj[datakey[0]],
            //   position: dataobj[datakey[4]],
            //   company: dataobj[datakey[3]],
            // };
            //   lme.i(criteria);
            // updating CostomerCredentials schema.....
            //  const CustomercredentialsData: any = await CustomerCredentials.findOneAndUpdate(
            //   {userId : res.locals.data.userId}, {$push : {criteria}});
          });
        });
    }
    await rimraf(dir, () => {
      lme.i('Removed');
    });
    // await rimraf(`/home/dev286/projects/personal-management-api/uploads/${filename}`, function () {
    //   console.log('deleted folder uploads');
    //  });
    await fs.unlink(userHome + `/uploads/${filename}`, err => {
      if (err) {
        throw err;
      }
    });
    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
