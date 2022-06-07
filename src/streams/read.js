import fs  from 'fs';

export const read = async () => {
	// Write your code here 
	const readStream = fs.createReadStream('src/streams/files/fileToRead.txt');
	readStream.on('data', (chunk)  => {
		//console.log(`${chunk}`);
		process.stdout.write(chunk);
	});
};