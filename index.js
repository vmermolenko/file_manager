import process from 'process';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__filename);

console.log(__dirname);


const username = process.argv.slice(2)[0].split("=")[1];
console.log(`Welcome to the File Manager, ${username}!`);

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
	var input = process.stdin.read();

	if (input !== null) {
		//process.stdout.write(input);
		var command = input.trim();
		if (command == 'exit') {
				process.exit(0);
		}
		process.stdin.resume();
	}
});

process.on("SIGINT", function() {
	process.exit(0);
});

process.on("exit", function() {
	console.log(`Thank you for using File Manager, ${username}!`);
});

