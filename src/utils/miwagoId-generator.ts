import { country as Country } from '../models/Country';
import { generate as generateShortId } from 'shortid';

export const generateMiwagoUserId = async (localName: string) => {
  const savableIdDetails = await Country.findOne(
    {
      local_name: localName,
      type: 'CI',
    },
    'iso',
  ).exec();

  if (!savableIdDetails) {
    throw new Error(`A code for city '${localName}' is not available`);
  }

  // mirror reference of it for better typing support
  const idDetailsMirror: any = savableIdDetails;

  const splits = idDetailsMirror.iso.split('-');
  const countryCode = splits[0];
  const cityCode = splits[2];

  const MIWAGO_USER_ID = `${countryCode}-${cityCode}-${generateShortId()}`;

  return MIWAGO_USER_ID;
};
