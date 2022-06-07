export const calculateHash = async () => {
	// Write your code here 
	const crypto = await import('crypto');
	const fs = await import('fs');
	const fileBuffer = fs.readFileSync('src/hash/files/fileToCalculateHashFor.txt');
	const hashSum = crypto.createHash('sha256');
	hashSum.update(fileBuffer);
	const hex = hashSum.digest('hex');

	console.log(hex);
	return hex;
};