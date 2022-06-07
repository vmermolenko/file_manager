import fs  from 'fs';

export const write = async () => {
	// Write your code here 
	const writeStream = fs.createWriteStream('src/streams/files/fileToWrite.txt', { flags: 'a' });
	process.stdin.on('data', data => {
		//console.log(`You typed ${data.toString()}`);
		writeStream.write(data);
		process.exit();
	});
};