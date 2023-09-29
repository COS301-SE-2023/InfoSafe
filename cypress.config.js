const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "8o48nn",
  e2e: {
    baseUrl: "http://ec2-52-91-180-105.compute-1.amazonaws.com:8080",
    viewportWidth: 1024,
    viewportHeight: 768,
  },
});
