const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "8o48nn",
  e2e: {
    baseUrl: "http://localhost:8080",
    viewportWidth: 1024,
    viewportHeight: 768,
  },
});
