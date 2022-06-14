import os from 'os'
import fs from 'fs'
import zlib from 'zlib'
import path from 'path';

function isDir(path) {
    try {
        var stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        return false;
    }
}

function isExistHomedir(pathDest) {
    const pathFirst = os.homedir();
	const tmp = pathDest.slice(0,pathFirst.length);
	return pathFirst === tmp
}

export const compress = async (currentDir, path_to_file , path_to_destination) => {
    let READ_FILE_NAME = path.join(currentDir, path_to_file);

	if ((fs.existsSync(path_to_file) && isExistHomedir(path_to_file))) {
		READ_FILE_NAME = path_to_file;
	} else if ( !(fs.existsSync(READ_FILE_NAME) && isExistHomedir(READ_FILE_NAME)) ){
		console.log('Operation failed')
		return;
	}

    let WRITE_FILE_NAME = path.join(currentDir, path_to_destination);

	if ((fs.existsSync(path_to_destination) && isExistHomedir(path_to_destination))) {
		WRITE_FILE_NAME = path_to_destination;
	} else if ( !(fs.existsSync(WRITE_FILE_NAME) && isExistHomedir(WRITE_FILE_NAME)) ){
		console.log('Operation failed')
		return;
	}

    const fileName = READ_FILE_NAME.split(path.sep).pop();
    const newfileName = fileName + '.br';

    WRITE_FILE_NAME = path.join(WRITE_FILE_NAME, newfileName);
    
    const readStream = fs.createReadStream(READ_FILE_NAME);
    const writeStream = fs.createWriteStream(WRITE_FILE_NAME);
    const brotli = zlib.createBrotliCompress();
    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on('finish', () => {
        console.log('Compress successfully: ' + WRITE_FILE_NAME);
    });
} 

export const decompress = async (currentDir, path_to_file , path_to_destination) => {
    let READ_FILE_NAME = path.join(currentDir, path_to_file);
	if ((fs.existsSync(path_to_file) && isExistHomedir(path_to_file))) {
		READ_FILE_NAME = path_to_file;
	} else if ( !(fs.existsSync(READ_FILE_NAME) && isExistHomedir(READ_FILE_NAME)) ){
		console.log('Operation failed')
		return;
	}

    let WRITE_FILE_NAME = path.join(currentDir, path_to_destination);

	if ((isDir(path_to_destination) && isExistHomedir(path_to_destination))) {
		WRITE_FILE_NAME = path_to_destination;
	} else if ( !(isDir(WRITE_FILE_NAME) && isExistHomedir(WRITE_FILE_NAME)) ){
		console.log('Operation failed')
		return;
	}

    const fileName = READ_FILE_NAME.split(path.sep).pop();
    const newfileName = fileName.replace('.br', '');
    
    WRITE_FILE_NAME = path.join(WRITE_FILE_NAME, newfileName);

    const readStream = fs.createReadStream(READ_FILE_NAME);
    const writeStream = fs.createWriteStream(WRITE_FILE_NAME);
    const brotli = zlib.createBrotliDecompress();
    const stream = readStream.pipe(brotli).pipe(writeStream);

    stream.on('finish', () => {
        console.log('Decompress successfully: ' + WRITE_FILE_NAME);
    });
} 
