import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Promise as BluePromise } from 'bluebird';

import { ProjectCategory } from '../../models/ProjectCategory';
import { ProjectSubCategory } from '../../models/ProjectSubCategory';

interface ISaveFields {
  subCategory?: string;
  category?: string;
  categoryId?: string;
  uniqueName?: string;
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
    const unique = req.body.category.trim().toLowerCase();
    const exsCategory = await ProjectCategory.find({
      uniqueName: unique,
      isDelete: false,
    }).exec();
    if (exsCategory.length) {
      return next(
        new RequestError(RequestErrorType.CONFLICT, 'Category Existing !!'),
      );
    }
    const savedCategory = await saveCollection(ProjectCategory, {
      category: req.body.category,
      uniqueName: unique,
    });
    if (req.body.subCategories.length) {
      await BluePromise.map(req.body.subCategories, (sub: any) => {
        return saveCollection(ProjectSubCategory, {
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

export const updateProjectCategory: RequestHandler = async (req, res, next) => {
  try {
    const exsCategory = await ProjectCategory.find({
      _id: { $ne: req.body._id },
      category: req.body.category,
    }).exec();
    if (exsCategory.length) {
      return next(
        new RequestError(RequestErrorType.CONFLICT, 'Category Existing !!'),
      );
    }
    const updatedCategory = updateCollection(ProjectCategory, req.body._id, {
      category: req.body.category,
    });
    let updateSubCategories;
    if (req.body.subCategories.length) {
      updateSubCategories = BluePromise.map(
        req.body.subCategories,
        async (subCat: any) => {
          const exsSubCategory = await ProjectSubCategory.find({
            categoryId: req.body._id,
            subCategory: subCat.subCategory,
          }).exec();
          if (exsSubCategory.length) {
            return;
          }
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
