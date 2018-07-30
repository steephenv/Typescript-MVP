/* tslint:disable:variable-name */
// import { BusinessFunction } from '../models/BusinessFunction';
import { TempBusSubFunction } from '../models/BusinessSubFunction';

export const addNewBusinessSubFunction = async (
  categoryId: string,
  businessSubFn: string,
) => {
  const extBusinessSubFunction = await TempBusSubFunction.findOne({
    subFunctionId: categoryId,
    subFunction: businessSubFn,
  });
  if (!extBusinessSubFunction) {
    const newBusinessSubFunction = new TempBusSubFunction({
      subFunctionId: categoryId,
      subFunction: businessSubFn,
    });
    await newBusinessSubFunction.save();
  }
  return;
};
