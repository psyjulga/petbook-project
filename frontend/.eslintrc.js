module.exports = {
	env: {
		commonjs: true,
		node: true,
		browser: true,
		es6: true,
		jest: true,
	},
	extends: [
		// 'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-redux/recommended',
	],
	globals: {},
	parser: '@babel/eslint-parser',
	parserOptions: {
		requireConfigFile: false,
		// to solve warning in jest.config.js
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react', 'import', 'react-hooks'],
	ignorePatterns: ['node_modules/'],
	rules: {
		// 'no-unused-vars': [
		// 	'error',
		// 	{
		// 		varsIgnorePattern: '^[A-Z]',
		// 	},
		// ],
	},
	settings: {
		react: {
			version: 'detect', // "detect" automatically picks the version you have installed.
		},
	},
}
