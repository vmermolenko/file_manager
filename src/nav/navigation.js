import os from 'os';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto'

const homedir = () => {
	return os.homedir();
};

const up = async (pathDir) => {
	if (homedir() === pathDir) {
		return pathDir;
	}
	const arr = pathDir.split(path.sep)
	arr.pop();
    return arr.join(path.sep);
};

const cd = async (pathDir, pathDest) => {
	if (fs.existsSync(pathDest) && isDir(pathDest)) {
		return pathDest;   
	}

	const pathDestDir = path.join(pathDir, pathDest);
	if (fs.existsSync(pathDestDir) && isDir(pathDestDir) && isExistHomedir(pathDestDir)) {
		return pathDestDir;
	}

	console.log('Operation failed');
	
  return pathDir;
};

const ls = async (pathFolder) => {
	if (!fs.existsSync(pathFolder)) throw new Error('FS operation failed')
    fs.readdirSync(pathFolder).forEach(file => {
		console.log(file);
	});
};

const cat = async (currentDir, pathFile) => {
	let tmpPath = path.join(currentDir, pathFile);

	if ((fs.existsSync(pathFile) && isExistHomedir(pathFile))) {
		tmpPath = pathFile;
	} else if ( !(fs.existsSync(tmpPath) && isExistHomedir(tmpPath)) ){
		console.log('Operation failed')
		return;
	} 

	fs.readFile(tmpPath, 'utf8', (err, data) => {
		if (err) {
			console.log('Operation failed');
			return;
		};
		console.log(data);
	});
};

const add = async (currentDir, new_file_name) => {
	const tmpPath = path.join(currentDir, new_file_name);
	if (fs.existsSync(tmpPath)) {
		console.log('Operation failed');
	} else {
		fs.writeFile(tmpPath, '', (err) => {
			if (err) console.log('Operation failed');
			console.log('File created successfully: ' + tmpPath);				
		});
	}
};

const rename = async (currentDir, pathFile, new_filename) => {
	let oldPath = path.join(currentDir, pathFile);

	if ((fs.existsSync(pathFile) && isExistHomedir(pathFile))) {
		oldPath = pathFile;
	} else if ( !(fs.existsSync(oldPath) && isExistHomedir(oldPath)) ){
		console.log('Operation failed')
		return;
	} 

	const arrPath = oldPath.split(path.sep)
	arrPath.pop();
	arrPath.push(new_filename)
  const newPath = arrPath.join(path.sep);

  if (!fs.existsSync(oldPath) || fs.existsSync(newPath)) {
		console.log('Operation failed')
		return;
	}
  fs.renameSync(oldPath, newPath);

	console.log('Rename successfully: ' + newPath);
};


const copyStream = async (currentDir, pathFile, path_to_new_directory) => {
	
	let oldPath = path.join(currentDir, pathFile);

	if ((fs.existsSync(pathFile) && isExistHomedir(pathFile))) {
		oldPath = pathFile;
	} else if ( !(fs.existsSync(oldPath) && isExistHomedir(oldPath)) ){
		console.log('Operation failed')
		return;
	} 

	const fileName = oldPath.split(path.sep).pop();
	let newPath = path.join(currentDir, path_to_new_directory);

	if ((isDir(path_to_new_directory) && isExistHomedir(path_to_new_directory))) {
		newPath = path_to_new_directory;
	} else if ( !(isDir(newPath) && isExistHomedir(newPath)) ){
		console.log('Operation failed');
		return;
	} 

	newPath = path.join(newPath, fileName);
	console.log(oldPath);
	console.log(newPath);
	var readable = fs.createReadStream(oldPath, { encoding: 'utf8', highWaterMark: 16 * 1024 });
	var writable = fs.createWriteStream(newPath);
	
	readable.pipe(writable);

	console.log('Copy successfully: ' + newPath);
};

const remove = async (currentDir, pathFile) => {
	
	let oldPath = path.join(currentDir, pathFile);

	if ((fs.existsSync(pathFile) && isExistHomedir(pathFile))) {
		oldPath = pathFile;
	} else if ( !(fs.existsSync(oldPath) && isExistHomedir(oldPath)) ){
		console.log('Operation failed')
		return;
	} 

	fs.rm(oldPath, (err) => {
		if (err) console.log('Operation failed');
		console.log('File deleted successfully: ' + oldPath);
	})
};

const calculateHash = async (currentDir, pathFile) => {
	let tmpPath = path.join(currentDir, pathFile);

	if ((fs.existsSync(pathFile) && isExistHomedir(pathFile))) {
		tmpPath = pathFile;
	} else if ( !(fs.existsSync(tmpPath) && isExistHomedir(tmpPath)) ){
		console.log('Operation failed')
		return;
	} 

	const fileBuffer = fs.readFileSync(tmpPath);
	const hashSum = crypto.createHash('sha256');
	hashSum.update(fileBuffer);
	const hex = hashSum.digest('hex');

	console.log(hex);
};

function isDir(path) {
	try {
		var stat = fs.lstatSync(path);
		return stat.isDirectory();
	} catch (e) {
		return false;
	}
}

function isExistHomedir(pathDest) {
  const pathFirst = homedir();
	const tmp = pathDest.slice(0,pathFirst.length);
	return pathFirst === tmp
}




export { homedir, up, cd, ls, cat, add, rename, copyStream, remove, calculateHash }