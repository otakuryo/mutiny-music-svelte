module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'prettier',
		'plugin:svelte/recommended'
	],
	rules: {

	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
