const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "8o48nn",
  e2e: {
    baseUrl: "https://infosafe.live",
    viewportWidth: 1024,
    viewportHeight: 768,
  },
});
