import fs from 'fs';
import zlib from 'zlib';

export const decompress = async () => {
	// Write your code here 

	const paths= "src/zip/files/fileTDeCompress.txt";
	const zip = "src/zip/files/archive.gz";

	const fileContents = fs.createReadStream(zip);
  const writeStream = fs.createWriteStream(paths);
  const unzip = zlib.createGunzip();
	
	fileContents.pipe(unzip).pipe(writeStream);
};