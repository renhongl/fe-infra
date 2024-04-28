const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const fileUtils = require("../libs/fileUtils");

function generateApp(appName, template) {
  console.log("Generating app with the following inputs:");
  console.log("App Name:", appName);
  console.log("Template:", template);
  const appPath = path.resolve(appName);

  // Create directory for the new app
  fs.mkdirSync(appPath);
  console.log(`Created directory: ${appPath}`);

  // Copy template files to the new app directory
  const templatePath = path.resolve(__dirname, "..", "templates", template);
  fileUtils.copyTemplateFiles(templatePath, appPath);

  // Install dependencies using npm
  console.log("Installing dependencies...");
  execSync("npm install", { cwd: appPath, stdio: "inherit" });

  console.log("App generated successfully!");
}

module.exports = { generateApp };
