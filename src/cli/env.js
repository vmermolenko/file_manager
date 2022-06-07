export const parseEnv = () => {
	const env = process.env;
	let envRSS = ''
	Object.keys(env).forEach(el => {
		if (el.slice(0, 4) === 'RSS_')  envRSS += el +"="+env[el] +";";
	});
	console.log(envRSS)
};