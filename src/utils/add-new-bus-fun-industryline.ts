import { TempBusFunction } from '../models/BusinessFunction';
import { IndustryLine } from '../models/IndustryLine';

export const addNewBusinessFunction = async (businessFn: string) => {
  const extBusinessFunction = await TempBusFunction.findOne({
    businessFunction: businessFn,
  });

  if (!extBusinessFunction) {
    const newBusinessFunction = new TempBusFunction({
      businessFunction: businessFn,
    });
    await newBusinessFunction.save();
  }
  return;
};

export const addNewIndustryLine = async (indLine: string) => {
  const extIndustryLine = await IndustryLine.findOne({
    industryLine: indLine,
  });

  if (!extIndustryLine) {
    const newIndustryLine = new IndustryLine({
      industryLine: indLine,
    });
    await newIndustryLine.save();
  }
  return;
};
