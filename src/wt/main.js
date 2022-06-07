import { Worker } from 'worker_threads';
import os from 'os';
//import { resolve } from 'path';

export const performCalculations = async () => {
	// Write your code here
	const cpu_s=os.cpus();
	let number = 10;
	const computeAll = [];
	cpu_s.forEach( element => computeAll.push(compute(number++)))
	const result = await Promise.all(computeAll)	
	console.log(result);
};

const compute = (number) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./src/wt/worker.js", {workerData: {num: number}});

        worker.on("message", result => {
          //console.log(`${number}th Fibonacci No: ${result}`);
					resolve({
						status : 'resolved',
						data : result
					})
        });

        worker.on("error", error => {
          console.log(error);
					resolve({
						status : 'error',
						data : 0
					})
        });

        worker.on("exit", exitCode => {
        	//console.log(`It exited with code ${exitCode}`);
        })
    }) 
}