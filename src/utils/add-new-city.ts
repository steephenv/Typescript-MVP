import * as shortId from 'shortid';
import { country } from '../models/Country';

export const addNewCity = async (iso: string, cityName: string) => {
  const extCountry = await country.find({
    iso: new RegExp('^' + iso),
    type: 'CI',
    local_name: cityName,
  });

  if (!extCountry.length) {
    const cityCode = shortId.generate();
    const newCity = new country({
      type: 'CI',
      local_name: cityName,
      iso: iso + '-' + cityCode,
    });
    await newCity.save();
  }
  return;
};
