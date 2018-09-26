import { Transform } from 'stream';

/**
 * push to stream line by line
 */
export const tsvArraySplitter = () => {
	return new Transform({
		readableObjectMode: true,
		transform(chunk, encoding, callback) {
			const lines = chunk.toString().split('\n');
			lines.forEach(line => {
				const lineArray = line.split('\t');
				const trimmedLineArray = lineArray.map(el => (el = el.trim()));
				this.push(trimmedLineArray);
			});
			callback();
		},
	});
};
