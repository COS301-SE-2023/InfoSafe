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
            },
        },

    ],
};

