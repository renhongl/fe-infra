const fs = require("fs-extra");
const path = require("path");

function copyTemplateFiles(templatePath, appPath) {
  fs.copySync(templatePath, appPath);
}

module.exports = { copyTemplateFiles };
