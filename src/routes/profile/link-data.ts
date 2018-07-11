import { RequestHandler } from 'express';
import lme from 'lme';
import * as extract from 'extract-zip';
import * as csv from 'fast-csv';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as userHome from 'user-home';

import { PersonalDetails } from '../../models/PersonalDetails';
import { customerCredentials } from '../../models/CustomerCredentials';
import { Education } from '../../models/Education';
import { experiance } from '../../models/Experiance';
import { projects } from '../../models/Projecs';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const linkData: RequestHandler = async (req: any, res, next) => {
  try {
    const userDir = req.params.userId;
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
    const tempEducation = userHome + '/' + 'zipped/newuserid/Education.csv';
    const tempEmails = userHome + '/' + 'zipped/newuserid/Email Addresses.csv';
    const tempPositions = userHome + '/' + 'zipped/newuserid/Positions.csv';
    const tempProfiles = userHome + '/' + 'zipped/newuserid/Profile.csv';
    const tempConnection = userHome + '/' + 'zipped/newuserid/Connections.csv';
    const tempSkills = userHome + '/' + 'zipped/newuserid/Skills.csv';
    if (tempEducation) {
      const column: any = [];
      let tempcolumn: any = [];
      csv
        .fromPath(tempEducation)
        .on('data', data => {
          // console.log(data);
          column.push(data);
        })
        .on('end', (data: any) => {
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
            //  console.log('the object array looped data = ', dataobj);
            // lme.i(Object.keys(dataobj));
            const datakey: any = Object.keys(dataobj);

            const eduData = new Education({
              userId: res.locals.decoded.userId,
              nameOfInstitution: dataobj[datakey[0]],
              durationFrom: dataobj[datakey[1]],
              durationTo: dataobj[datakey[2]],
              major: dataobj[datakey[3]],
              degree: dataobj[datakey[4]],
              activities: dataobj[datakey[5]],
            });
            await eduData.save();
            // const criteria = {
            //   nameOfInstitution: dataobj[datakey[0]],
            //   duration: {
            //     from: dataobj[datakey[1]],
            //     to: dataobj[datakey[2]],
            //   },
            //   major: dataobj[datakey[3]],
            //   degree: dataobj[datakey[4]],
            //   activities: dataobj[datakey[5]],
            // };
            // lme.i(criteria);
            // data updation to personal details schema
            //  const educationData: any = await Education.findOneAndUpdate(
            //   {userId : res.locals.data.userId}, {$set: {criteria}});
          });
        });
    }
    if (tempProfiles) {
      const column: any = [];
      let tempcolumn: any = [];
      csv
        .fromPath(tempProfiles)
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
            //         console.log('the object array looped data = ', dataobj);
            const datakey: any = Object.keys(dataobj);
            const profData = new PersonalDetails({
              userId: res.locals.decoded.userId,
              firstName: dataobj[datakey[0]],
              lastName: dataobj[datakey[1]],
              birthDate: dataobj[datakey[4]],
              country: dataobj[datakey[9]],
              zipCode: dataobj[datakey[10]],
              PersonalStatement: dataobj[datakey[6]],
              Summary: dataobj[datakey[7]],
              MaidenName: dataobj[datakey[2]],
            });
            await profData.save();
            //   const criteria = {
            //     firstName: dataobj[datakey[0]],
            //     lastName: dataobj[datakey[1]],
            //     birthDate: dataobj[datakey[4]],
            //     country: dataobj[datakey[9]],
            //     zipCode: dataobj[datakey[10]],
            //     PersonalStatement: dataobj[datakey[6]],
            //     Summary: dataobj[datakey[7]],
            //     MaidenName: dataobj[datakey[2]],
            //   };
            //   lme.i(criteria);
            // updating PersonalData schema.....
            // const PersonalData: any = await PersonalDetails.findOneAndUpdate(
            //  {userId : res.locals.data.userId}, {$set: {criteria}});
          });
          objArray.forEach(async (dataobj: any) => {
            //         console.log('the object array looped data = ', dataobj);
            const datakey: any = Object.keys(dataobj);
            const workExData = new experiance({
              userId: res.locals.decoded.userId,
              companyIndustryLine: dataobj[datakey[8]],
            });
            await workExData.save();
            //   const criteria = {
            //     companyIndustryLine: dataobj[datakey[8]],
            //   };
            //   lme.i(criteria);
            // updating PersonalData schema.....
            //  const WorkData: any = await WorkExperiance.findOneAndUpdate(
            //   {userId : res.locals.data.userId}, {$set: {criteria}});
          });
        });
    }
    if (tempEmails) {
      const column: any = [];
      let tempcolumn: any = [];
      csv
        .fromPath(tempEmails)
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
          //  console.log(objArray);
          let flag = 0;
          objArray.forEach(async (dataobj: any) => {
            // console.log('the object array looped data = ', dataobj);
            const datakey: any = Object.keys(dataobj);
            if (dataobj[datakey[2]] === 'Yes') {
              const primaryCriteria = {
                primaryEmail: dataobj[datakey[0]],
              };
              // updating CostomerCredentials schema.....
              await PersonalDetails.findOneAndUpdate(
                { userId: res.locals.decoded.userId },
                { $set: { primaryCriteria } },
              );
            } else if (dataobj[datakey[2]] === 'No' && flag === 0) {
              const secondaryCriteria = {
                secondaryEmail: dataobj[datakey[0]],
              };
              flag++;
              // updating CostomerCredentials schema.....
              await PersonalDetails.findOneAndUpdate(
                { userId: res.locals.decoded.userId },
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
          // console.log(objArray);
          //           objArray.forEach( async function (dataobj: any) {
          //     //      console.log('the object array looped data = ', dataobj);
          //            // lme.i(Object.keys(dataobj));
          //            const datakey: any = Object.keys(dataobj);
          //            // lme.i(dataobj[datakey[0]]);
          //            const criteria = {
          //             companyName : dataobj[datakey[0]],
          //             jobTitle : dataobj[datakey[1]],
          //             duration : {
          //               from : dataobj[datakey[4]],
          //               to : dataobj[datakey[5]]
          //             }
          //            };
          //  //          lme.i(criteria);
          //            // updating Experiance schema....
          //           //  const WorkExperianceData: any = await WorkExperiance.findOneAndUpdate(
          //           //   {userId : res.locals.data.userId}, {$push: {criteria}});
          //            });
          objArray.forEach(async (dataobj: any) => {
            const datakey: any = Object.keys(dataobj);
            const projdata = new projects({
              userId: res.locals.decoded.userId,
              clientsCompanyName: dataobj[datakey[0]],
              engagementDuration: {
                from: dataobj[datakey[4]],
                to: dataobj[datakey[5]],
              },
              roleDescription: dataobj[datakey[2]],
              yourrole: dataobj[datakey[1]],
            });
            await projdata.save();
            // const criteria2 = {
            //   clientsCompanyName: dataobj[datakey[0]],
            //   engagementDuration: {
            //     from: dataobj[datakey[4]],
            //     to: dataobj[datakey[5]],
            //   },
            //   roleDescription: dataobj[datakey[2]],
            //   yourrole: dataobj[datakey[1]],
            // };
            //           console.log('criteria 2 starts here....');
            // lme.i('projects data .......', criteria2);
            // updating project schema....
            //  const ProjectsData: any = await Projects.findOneAndUpdate(
            //   {userId : res.locals.data.userId}, {$push: {criteria2}});
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
              { userId: res.locals.decoded.userId },
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
            const custdata = new customerCredentials({
              userId: res.locals.decoded.userId,
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
      lme.i('removed');
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
