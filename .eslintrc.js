module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
    },
    extends: [
        "react-app",
        "plugin:react/recommended",
    ],
    plugins: ["react"],
    rules: {
        quotes: ["error", "double"],
    },
    ignorePatterns: ["**/*.java", "**/*.cy.js"],
    overrides: [
        {
            files: ["frontend/**/*.js"],
            env: {
                browser: true,
            },
            extends: [
                "plugin:react/recommended"
            ],
            rules: {
                "react/jsx-uses-react": "error",
                "react/jsx-uses-vars": "error",
                "react/prop-types": "off",
                "react/react-in-jsx-scope": "error",
                "react/jsx-curly-brace-presence": ["error", "never"],
                "jsx-quotes": ["error", "prefer-double"],
            },
        },

    ],
};

