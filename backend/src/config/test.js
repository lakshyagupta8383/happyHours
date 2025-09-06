// ✅ Load environment variables from the root .env file
require('dotenv').config({ path: __dirname + '/../../../.env' });

const { Client } = require('@elastic/elasticsearch'); // Import Elasticsearch client

// ✅ Create and export the configured client using environment variables
const client = new Client({
  node: process.env.ES_HOST, // Cluster URL from .env
  auth: {
    apiKey: process.env.API_KEY // API Key from .env
  }
});

module.exports = client; // ✅ Export this client so other files can use it
