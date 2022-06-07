import os from 'os';
import fs from 'fs';
import path from 'path';

const homedir = async () => {
	return os.homedir();
};

const up = async (pathDir) => {
    return pathDir.split(path.sep) 
};

const cd = async (pathDir) => {
    return pathDir.dirname(filename).split(path.sep).pop()   
};

const ls = async (pathFolder) => {
	if (!fs.existsSync(pathFolder)) throw new Error('FS operation failed')
        fs.readdirSync(pathFolder).forEach(file => {
		console.log(file);
	});
};


export { homedir, up, cd, ls }