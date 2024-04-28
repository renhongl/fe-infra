#!/usr/bin/env node

const inquirer = require("inquirer");
const { program } = require("commander");
const { generateApp } = require("../commands/generate");

program
  .version("1.0.0")
  .description("CLI tool to auto-generate webpack React TypeScript apps");

program
  .command("generate")
  .alias("g")
  .description("Generate a new webpack React TypeScript app")
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "appName",
        message: "Enter the name of your app:",
        validate: (input) => !!input.trim() || "App name is required",
      },
      {
        type: "list",
        name: "template",
        message: "Choose a template:",
        choices: ["main", "subapp", "monorepo"],
      },
    ]);

    generateApp(answers.appName, answers.template);
  });

program.parse(process.argv);

// const { program } = require("commander");
// const path = require("path");
// const { generateApp } = require("../commands/generate");

// program
//   .version("1.0.0")
//   .description("CLI tool to auto-generate webpack React TypeScript apps");

// program
//   .command("generate <appName>")
//   .alias("g")
//   .description("Generate a new webpack React TypeScript app")
//   .action((appName) => {
//     generateApp(appName);
//   });

// program.parse(process.argv);
