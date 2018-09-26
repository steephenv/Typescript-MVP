import { createReadStream } from 'fs';

import { s3 } from '../../aws/s3';
import { logger } from './responder-interface';

const AWS_S3_BUCKET = 'aumet-data';

export const s3Upload = async (fileName: string, fullPath: string) => {
	const stream = createReadStream(fullPath);
	const key = `tsv-uploads/users/${fileName}`;

	try {
		await s3
			.upload({
				Body: stream,
				Bucket: AWS_S3_BUCKET,
				Key: key,
			})
			.promise();

		const accessUrl = `https://${AWS_S3_BUCKET}.s3.amazonaws.com/${key}`;
		return accessUrl;
	} catch (err) {
		logger('S3 upload failed');
	}
};
