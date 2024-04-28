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
  if (template !== "monorepo") {
    const templatePath = path.resolve(__dirname, "..", "templates", template);
    fileUtils.copyTemplateFiles(templatePath, appPath);
  } else {
    const monorepoPath = path.resolve(__dirname, "..", "templates", "monorepo");
    fileUtils.copyTemplateFiles(monorepoPath, appPath);
    fs.mkdirSync(path.resolve(appPath, "main"));
    fs.mkdirSync(path.resolve(appPath, "subapp"));
    const mainPath = path.resolve(__dirname, "..", "templates", "main");
    fileUtils.copyTemplateFiles(mainPath, path.resolve(appPath, "main"));
    const subAppPath = path.resolve(__dirname, "..", "templates", "subapp");
    fileUtils.copyTemplateFiles(subAppPath, path.resolve(appPath, "subapp"));
  }

  // Install dependencies using npm
  console.log("Installing dependencies...");
  if (template !== "monorepo") {
    execSync("npm install", { cwd: appPath, stdio: "inherit" });
  } else {
    execSync("pnpm i", { cwd: appPath, stdio: "inherit" });
  }

  console.log("App generated successfully!");
}

module.exports = { generateApp };
