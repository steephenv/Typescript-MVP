import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Promise as BluePromise } from 'bluebird';

import { SkillCategory } from '../../models/SkillCategory';
import { SkillSubCategory } from '../../models/SkillSubCategory';

interface ISaveFields {
  subCategory?: string;
  category?: string;
  categoryId?: string;
  cluster?: string;
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

export const saveSkillCategory: RequestHandler = async (req, res, next) => {
  try {
    const savedCategory = await saveCollection(SkillCategory, {
      category: req.body.category,
      cluster: req.body.cluster,
    });
    if (req.body.subCategories.length) {
      await BluePromise.map(req.body.subCategories, (sub: any) => {
        return saveCollection(SkillSubCategory, {
          categoryId: savedCategory._id,
          subCategory: sub.subCategory,
        });
      });
    }
    return res.status(201).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};

export const updateSkillCategory: RequestHandler = async (req, res, next) => {
  try {
    const updatedCategory = updateCollection(SkillCategory, req.body._id, {
      category: req.body.category,
    });
    let updateSubCategories;
    if (req.body.subCategories.length) {
      updateSubCategories = BluePromise.map(
        req.body.subCategories,
        (subCat: any) => {
          if (subCat._id) {
            return updateCollection(SkillSubCategory, subCat._id, {
              subCategory: subCat.subCategory,
            });
          }
          return saveCollection(SkillSubCategory, {
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
