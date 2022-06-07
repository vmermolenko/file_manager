import { spawn } from 'child_process';

export const spawnChildProcess = async (args) => {
    // Write your code here
    const child = spawn('node src/cp/files/script.js prop value', { shell: true });

    child.stdout.on('data', data => {
        console.log(`stdout:\n${data}`);
    });
};