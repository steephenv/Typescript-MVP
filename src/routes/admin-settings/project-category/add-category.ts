import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../../error-handler/RequestError';
import { Promise as BluePromise } from 'bluebird';

import { ProjectCategory } from '../../../models/ProjectCategory';
import { ProjectSubCategory } from '../../../models/ProjectSubCategory';

interface ISaveFields {
  subCategory?: string;
  category?: string;
  categoryId?: string;
}

export const saveCollection = async (model: any, fields: ISaveFields) => {
  const newModel = new model(fields);
  return newModel.save();
};

export const updateCollection = async (
  model: any,
  id: string,
  fields: ISaveFields,
) => {
  return model.update({ _id: id }, { $set: fields });
};

export const saveProjectCategory: RequestHandler = async (req, res, next) => {
  try {
    const savedCategory = await saveCollection(ProjectCategory, {
      category: req.body.category,
    });
    if (req.body.subCategories.length) {
      await BluePromise.map(req.body.subCategories, (sub: any) => {
        return saveCollection(ProjectSubCategory, {
          categoryId: savedCategory._id,
          subCategory: sub.subCategory,
        });
      });
    }
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};

export const updateProjectCategory: RequestHandler = async (req, res, next) => {
  try {
    const updatedCategory = updateCollection(ProjectCategory, req.body._id, {
      category: req.body.category,
    });
    let updateSubCategories;
    if (req.body.subCategories.length) {
      updateSubCategories = BluePromise.map(
        req.body.subCategories,
        (subCat: any) => {
          if (subCat._id) {
            return updateCollection(ProjectSubCategory, subCat._id, {
              subCategory: subCat.subCategory,
            });
          }
          return saveCollection(ProjectSubCategory, {
            categoryId: req.body._id,
            subCategory: subCat.subCategory,
          });
        },
      );
    }
    await BluePromise.all([updatedCategory, updateSubCategories]);
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
