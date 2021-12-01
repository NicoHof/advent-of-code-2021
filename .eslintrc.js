module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: ['prettier', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'warn',
        'no-console': 0,
    },
};
