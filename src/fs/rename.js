import * as fs from 'fs';
export const rename = async () => {
    // Write your code here 
    const oldPath = 'src/fs/files/wrongFilename.txt';
    const newPath = 'src/fs/files/properFilename.md';

    if (!fs.existsSync(oldPath) || fs.existsSync(newPath)) throw new Error('FS operation failed');
    fs.renameSync(oldPath, newPath);
};