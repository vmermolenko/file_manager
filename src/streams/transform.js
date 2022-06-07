import { Transform } from 'stream';

export const transform = async () => {
	// Write your code here 
	process.stdin.on('data', data => {
		//console.log(`You typed ${data.toString()}`);
		const myTransform = new Transform({
			transform(chunk, encoding, callback) {
				//console.log(chunk.toString());
				reverseString(chunk.toString());
				const data = chunk.toString();
				callback(null, reverseString(data))
			}
		});
		
		function reverseString(str) {
			return str.split("").reverse().join("");
		}
		
		myTransform.on('data', (chunk) => {
			process.stdout.write(chunk.toString())
			//console.log(chunk.toString())
		});
		
		myTransform.write(data);
		process.exit();
	});
};

