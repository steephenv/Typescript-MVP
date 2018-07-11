import { country as Country } from '../models/Country';
import { generate as generateShortId } from 'shortid';

export const generateMiwagoUserId = async (localName: string) => {
  const savableIdDetails = await Country.findOne(
    {
      local_name: localName,
    },
    'iso',
  ).exec();

  if (!savableIdDetails) {
    throw new Error(`A code for city '${localName}' is not available`);
  }

  // mirror reference of it for better typing support
  const idDetailsMirror: any = savableIdDetails;

  const MIWAGO_USER_ID = `${idDetailsMirror.iso}#${generateShortId()}`;

  return MIWAGO_USER_ID;
};
