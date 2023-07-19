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
    overrides: [
        {
            // Frontend (React) code in frontend/ directory
            files: ["frontend/**/*.js"],
            env: {
                browser: true,
            },
            extends: [
                "plugin:react/recommended", // React-specific rules
                // Add any other frontend-specific plugins and configurations here
            ],
            rules: {
                // Add frontend-specific rules here
                // ...

                // Example rule: Enforce using single quotes for JSX attributes
                "jsx-quotes": ["error", "prefer-single"],
            },
        },
        {
            // Backend (Spring Boot) code in backend/ directory
            files: ["backend/**/*.java"],
            env: {
                node: true,
            },
            // Add any backend-specific plugins and configurations here
            // ...

            rules: {
                // Add backend-specific rules here
                // ...
            },
        },
    ],
};

