module.exports = {
    root: true,
    env: {
        browser: true, // Add browser environment for frontend (React) code
        node: true, // Add node environment for backend (Spring Boot) code
    },
    parserOptions: {
        ecmaVersion: 2021, // Adjust this based on your ECMAScript version
        sourceType: "module",
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended", // For React-specific rules
    ],
    plugins: ["react"],
    rules: {
        // Add any general rules here that apply to both frontend and backend code
        // ...

        // Example rule: Enforce using double quotes for strings
        quotes: ["error", "double"],
    },
    ignorePatterns: ["**/*.java"],
    overrides: [
        {
            // Frontend (React) code in frontend/ directory
            files: ["frontend/**/*.js"],
            env: {
                browser: true,
            },
            extends: [
                "plugin:react/recommended"
            ],
            rules: {
                'react/jsx-uses-react': 'error',
                'react/jsx-uses-vars': 'error',
                'react/prop-types': 'off',
                'react/react-in-jsx-scope': 'error',
                'react/jsx-curly-brace-presence': ['error', 'never'],
                "jsx-quotes": ["error", "prefer-single"],
            },
        },

    ],
};

