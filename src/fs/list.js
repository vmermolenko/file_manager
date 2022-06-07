import * as fs from 'fs';
export const list = async () => {
    // Write your code here 
    const pathFolder = 'src/fs/files'
	if (!fs.existsSync(pathFolder)) throw new Error('FS operation failed')
    fs.readdirSync(pathFolder).forEach(file => {
		console.log(file);
	});
};