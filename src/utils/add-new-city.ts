import * as shortId from 'shortid';
import { country } from '../models/Country';

export const addNewCity = async (stateName: string, cityName: string) => {
  const stateDetails: any = await country
    .findOne({
      type: 'RE',
      local_name: stateName,
    })
    .exec();

  if (!stateDetails) {
    return;
  }

  const stateIso = stateDetails.iso;
  const extCountry = await country
    .find({
      iso: new RegExp('^' + stateIso),
      type: 'CI',
      local_name: cityName,
    })
    .exec();

  if (!extCountry.length) {
    const cityCode = shortId.generate();
    const newCity = new country({
      type: 'CI',
      local_name: cityName,
      iso: stateIso + '-' + cityCode,
    });
    await newCity.save();
  }
  return;
};
