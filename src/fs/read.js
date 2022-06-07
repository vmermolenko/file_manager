import * as fs from 'fs';
export const read = async () => {
  // Write your code here 
  const pathFile = 'src/fs/files/fileToRead.txt';
  
  fs.readFile(pathFile, 'utf8', (err, data) => {
    if (err) throw new Error('FS operation failed');
    console.log(data);
  });
};