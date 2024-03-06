const fs = require('fs');
const {environment}=require("./environmentVariableValue")
async function getConfig() {
    // Get the current environment (default: development)
    //const environment = process.env.NODE_ENV || 'development';

    // Construct the path to the configuration file
    const configPath = `./config.${environment}.json`;

    // Read the configuration file
    const configData = fs.readFileSync(configPath, { encoding: 'utf8' }).replace(/^\uFEFF/, '');

    // Parse the JSON data
    const { username, password, baseUrl } = JSON.parse(configData);

    // Return the configuration data
    return { username, password, baseUrl };
}

// Export the getConfig function
module.exports = { getConfig };