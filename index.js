import process from 'process';
import { getOSinfo } from './src/nav/navos.js'
import { homedir, up, cd, ls, cat, add, rename, copyStream, remove, calculateHash } from './src/nav/navigation.js'
import { compress, decompress } from './src/nav/zip-brotli.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__filename);
console.log(__dirname);

let currentDir = homedir();

const username = process.argv.slice(2)[0].split("=")[1];
console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currentDir}`);

process.stdin.setEncoding('utf8');

process.stdin.on('readable', async function() {
	var input = process.stdin.read();

	if (input !== null) {

		var command = input.trim();
		let nav = command.split(' ');

		switch (nav[0]){
			case 'exit' :
				process.exit(0);
			case 'up' :
				currentDir = await up(currentDir);
				break;
			case 'cd' :
				currentDir = await cd(currentDir, nav[1]);
				break;
			case 'ls' :
				await ls(currentDir);
				break;
			case 'cat' :
				await cat(currentDir, nav[1]); 
				break;
			case 'add' :
				await add(currentDir, nav[1]); 
				break;
			case 'rn' :
				await rename(currentDir, nav[1], nav[2]); 
				break;
			case 'cp' :
				await copyStream(currentDir, nav[1], nav[2]); 
				break;
			case 'mv' :
				await copyStream(currentDir, nav[1], nav[2]); 
				await remove(currentDir, nav[1]);
				break;
			case 'rm' :
				await remove(currentDir, nav[1]);
				break;
			case 'os':
				await getOSinfo(nav[1]);
				break;
			case 'hash':
				await calculateHash(currentDir, nav[1]);
				break;
			case 'compress':
				await compress(currentDir, nav[1], nav[2]);
				break;
			case 'decompress':
				await decompress(currentDir, nav[1], nav[2]);
				break;
			default:
				console.log('Invalid input');
				break;
		} 
		console.log(`You are currently in ${currentDir}`);	

		process.stdin.resume();
	}
});

process.on("SIGINT", function() {
	process.exit(0);
});

process.on("exit", function() {
	console.log(`Thank you for using File Manager, ${username}!`);
});

