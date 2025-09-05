// 1. Load .env variables (Elastic host + API key)
require('dotenv').config({ path: __dirname + '/../../../.env' });  // force load

console.log("ES_HOST →", process.env.ES_HOST);
console.log("API_KEY →", process.env.API_KEY);

// 2. Import the Elasticsearch JS client
const { Client } = require('@elastic/elasticsearch');

// 3. Initialize the Elastic client securely using env variables
const client = new Client({
  node: process.env.ES_HOST,       // Elastic Cloud URL from .env
  auth: {
    apiKey: process.env.API_KEY // API Key from .env
  }
});
const INDEX_NAME = 'recipes';


// FUNCTION 1: Get all drinks (used in GET /v1/drinks)
async function getAllDrinks() {
  try {
    const result = await client.search({
      index: INDEX_NAME,
      size: 10, // optional: limit how many recipes you return
      query: {
        match_all: {} // fetch everything in the index
      }
    });

    return result.hits.hits.map(hit => hit._source);
  } catch (err) {
    console.error('Error in getAllDrinks:', err.meta?.body?.error || err);
    throw new Error('Failed to fetch all drinks');
  }
}


// FUNCTION 2: Get drink by ID (used in GET /v1/drinks/:id)
async function getDrinkById(id) {
  try {
    const result = await client.get({
      index: INDEX_NAME,
      id: id
    });

    return result._source; // return the drink data
  } catch (err) {
    // If the document wasn't found, return null (so the route can send 404)
    if (err.meta?.statusCode === 404) return null;

    console.error('Error in getDrinkById:', err.meta?.body?.error || err);
    throw new Error('Failed to fetch drink by ID');
  }
}


// Export both functions to be used in routes
module.exports = {
  getAllDrinks,
  getDrinkById
};
