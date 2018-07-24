/* tslint:disable:variable-name */
// import { BusinessFunction } from '../models/BusinessFunction';
import { BusinessSubFunction } from '../models/BusinessSubFunction';

export const addNewBusinessSubFunction = async (
  CategoryId: string,
  businessSubFn: string,
) => {
  const extBusinessSubFunction = await BusinessSubFunction.findOne({
    subCategory: businessSubFn,
  });

  if (!extBusinessSubFunction) {
    const newBusinessSubFunction = new BusinessSubFunction({
      subCategoryId: CategoryId,
      subCategory: businessSubFn,
    });
    await newBusinessSubFunction.save();
  }
  return;
};
