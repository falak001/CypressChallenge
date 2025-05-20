const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    
    },
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    video: true, 
    videoUploadOnPasses: true,
    browser: "chrome"
  },
  env: {
    email: process.env.email,
    password: process.env.password,
  },
});
