import * as fs from 'fs';

export const create = async () => {
	// Write your code here 
	const path = 'src/fs/files/fresh.txt';
	if (fs.existsSync(path)) {
		const error = new Error('FS operation failed');
	} else {
		fs.writeFile('src/fs/files/fresh.txt', 'I am fresh and young', (err) => {
			if (err) throw err;
				console.log('File is created successfully.');
		});
	}
};