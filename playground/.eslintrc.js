// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'eslint:recommended',
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array
        'plugin:react-hooks/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
        ecmaVersion: 11, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'react/no-unescaped-entities': 'off',
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    Function: false,
                },
                extendDefaults: true,
            },
        ],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-empty-interface': [
            'error',
            {
                allowSingleExtends: false,
            },
        ],
        'no-debugger': 'off',
    },
    ignorePatterns: ['*/build', '*/build', '*/node_modules'],
};
