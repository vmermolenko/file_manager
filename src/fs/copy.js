import * as fs from 'fs';

export const copy = async () => {
    // Write your code here 
	const pathFiles = 'src/fs/files';
   	const pathFilesCopy = 'src/fs/files_copy';
	if (!fs.existsSync(pathFiles) || fs.existsSync(pathFilesCopy)) throw new Error('FS operation failed');
		fs.cp(pathFiles, pathFilesCopy,  { recursive:true }, (err) => {
		if (err) throw err;
			console.log('files folder copy to files_copy is copied successfully.');
	});
};