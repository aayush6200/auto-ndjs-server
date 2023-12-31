// const fs = require("fs");
// const path = require("path");
// const { execSync } = require("child_process");

console.log("Setting up the project...");
// Content for server.js
const serverJsContent = `
// Import essential modules.
const express = require('express');        // Express: Framework for building web applications.
const bodyParser = require('body-parser'); // Body-parser: Middleware to parse the body of incoming requests.
const cors = require('cors');              // CORS: Middleware to enable Cross-Origin Resource Sharing.
const dotenv = require('dotenv');          // Dotenv: Loads environment variables from a .env file.

// Initialize environment variables from .env file.
dotenv.config();

// Create an Express app. This will be your server.
const app = express();

// Define the port on which your server will run. Default is 3000 if not specified.
const port = process.env.PORT || 3000;

// Apply middleware for CORS and request body parsing.
app.use(cors());                    // Enable all CORS requests.
app.use(bodyParser.json());         // Parse incoming JSON payloads.

// Define routes and their handlers here.
// Example: app.get('/', (req, res) => res.send('Hello World!'));

// Start the server and listen on the defined port.
app.listen(port, () => {
  console.log(\`Server is running on port \${port}\`);  // Log when the server is successfully started.
});
`;

// Get the user's project directory
const projectDirectory = process.cwd();

//
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("Setting up the project...");

try {
  // Check for and create package.json if it doesn't exist
  const packageJsonPath = path.join(projectDirectory, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    console.log("Initializing package.json...");
    execSync("npm init -y", { stdio: "inherit" });
  }

  // Write server.js in the root directory
  const serverJsPath = path.join(projectDirectory, "server.js");
  if (!fs.existsSync(serverJsPath)) {
    fs.writeFileSync(serverJsPath, serverJsContent);
    console.log("server.js created successfully!");
  } else {
    console.log("server.js already exists.");
  }

  // Install dependencies in the project directory
  console.log("Installing dependencies...");
  execSync("npm install express body-parser cors dotenv", { stdio: "inherit" });
  // Install nodemon as a development dependency
  console.log("Installing nodemon as a development dependency...");
  execSync("npm install nodemon --save-dev", { stdio: "inherit" });
  // Read, update, and write the package.json to include a start script
  let packageJsonRaw = fs.readFileSync(packageJsonPath);
  let packageJson = JSON.parse(packageJsonRaw);
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.start = "nodemon server.js";
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log("Added 'start' script to package.json");
} catch (error) {
  console.error("Error setting up the project:", error);
}

console.log("Setup completed successfully!");
