// Load environment variables from the root .env file
require('dotenv').config({ path: __dirname + '/../../.env' });

const { Client } = require('@elastic/elasticsearch'); // Import Elasticsearch client

// Log to verify that environment variables are loaded properly
console.log("ELASTIC_HOST =", process.env.ES_HOST);
console.log("ELASTIC_API_KEY =", process.env.API_KEY ? "Loaded" : "Missing");

// Create Elasticsearch client with environment variables
const client = new Client({
  node: process.env.ES_HOST,
  auth: {
    apiKey: process.env.API_KEY
  }
});

// Function to test connection to Elasticsearch
async function testConnection() {
  try {
    const info = await client.info(); // Fetch connection info from Elasticsearch
    console.log("✅ Elasticsearch Info:", info); // Success message
  } catch (err) {
    console.error("❌ Connection failed:", err); // Error message if connection fails
  }
}

testConnection(); // Run the test
