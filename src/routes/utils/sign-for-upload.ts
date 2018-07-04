import { generate as generateShortId } from 'shortid';
import { RequestHandler } from 'express';
import { get as getConfig } from 'config';
import { Promise as BluePromise } from 'bluebird';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { s3 } from '../../aws/s3';

const AWS_S3_BUCKET = getConfig('AWS_BUCKET_NAME');

// promisify what yo all asking for
function getSignedUrl(op: string, s3Params: any) {
  return new BluePromise((resolve, reject) => {
    s3.getSignedUrl(op, s3Params, (err, url) => {
      if (err) {
        return reject(err);
      }
      resolve(url);
    });
  });
}

// stay safe
function trimSlashes(pathValue: string) {
  // strip first slash if any
  if (pathValue[0] === '/') {
    pathValue = pathValue.slice(1);
  }
  // strip last slash if any
  if (pathValue[pathValue.length - 1] === '/') {
    pathValue = pathValue.slice(0, pathValue.length - 1);
  }
  return pathValue;
}

interface ISignForUpload {
  fileName: string;
  filePath: string;
  fileType: string;
}

export const signForUpload: RequestHandler = async (req, res, next) => {
  try {
    const signature = await signForUploadCtrl(req.body.objectsToSign);

    return res.status(200).send(signature);
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};

async function signForUploadCtrl(objectsToUpload: ISignForUpload[]) {
  return await BluePromise.map(
    objectsToUpload,
    async obj => await signEachObjects(obj),
  );
}

async function signEachObjects(objectToUpload: ISignForUpload) {
  const rand = generateShortId();

  objectToUpload.fileName = `${objectToUpload.fileName}_${rand}`;
  objectToUpload.filePath = trimSlashes(objectToUpload.filePath);

  const s3Params = {
    Bucket: AWS_S3_BUCKET,
    Key: `${objectToUpload.filePath}/${objectToUpload.fileName}`,
    Expires: 120,
    ContentType: objectToUpload.fileType,
    ACL: 'public-read',
  };

  const signedUrl = await getSignedUrl('putObject', s3Params);

  return {
    signedRequest: signedUrl,
    accessUrl: `https://${AWS_S3_BUCKET}.s3.amazonaws.com/${
      objectToUpload.filePath
    }/${objectToUpload.fileName}`,
    fileName: objectToUpload.fileName,
    fileType: objectToUpload.fileType,
  };
}
