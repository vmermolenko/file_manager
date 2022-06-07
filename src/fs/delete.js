import * as fs from 'fs';

export const remove = async () => {
	// Write your code here 
	const pathFile = 'src/fs/files/fileToRemove.txt'
	
	fs.rm(pathFile, (err) => {
		if (err) throw new Error('FS operation failed');
	})
};