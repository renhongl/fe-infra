const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

const fileUtils = require("../lib/fileUtils");

function initializeProject(projectName) {
  const projectPath = path.resolve(projectName);

  // Create directory for the new project
  fs.mkdirSync(projectPath);
  console.log(`Created directory: ${projectPath}`);

  // Create package.json
  const packageJson = {
    name: projectName,
    version: "1.0.0",
    description: "My new project",
    scripts: {
      start: "webpack serve --mode development",
      build: "webpack --mode production",
    },
    devDependencies: {
      webpack: "^5.0.0",
      "webpack-cli": "^4.0.0",
      "webpack-dev-server": "^4.0.0",
      typescript: "^4.0.0",
      react: "^17.0.0",
      "react-dom": "^17.0.0",
      "@types/react": "^17.0.0",
      "@types/react-dom": "^17.0.0",
      "babel-loader": "^8.0.0",
      "@babel/core": "^7.0.0",
      "@babel/preset-env": "^7.0.0",
      "@babel/preset-react": "^7.0.0",
      "@babel/preset-typescript": "^7.0.0",
      "css-loader": "^5.0.0",
      "style-loader": "^2.0.0",
      "html-webpack-plugin": "^5.0.0",
    },
  };
  fs.writeFileSync(
    path.join(projectPath, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );

  // Copy webpack configuration file
  const webpackConfig = `
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
      entry: './src/index.tsx',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader',
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
        }),
      ],
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
      },
    };
  `;
  fs.writeFileSync(path.join(projectPath, "webpack.config.js"), webpackConfig);

  // Create src directory and index.html
  fs.mkdirSync(path.join(projectPath, "src"));
  fs.writeFileSync(
    path.join(projectPath, "src", "index.tsx"),
    "// Your React component goes here"
  );
  fs.writeFileSync(
    path.join(projectPath, "src", "index.html"),
    '<div id="root"></div>'
  );

  // Install dependencies using npm
  console.log("Installing dependencies...");
  execSync("npm install", { cwd: projectPath, stdio: "inherit" });

  console.log("Project initialized successfully!");
}

module.exports = { initializeProject };
