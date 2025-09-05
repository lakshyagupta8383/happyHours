// Load .env variables from root level
require('dotenv').config({ path: __dirname + '/../../../.env' });

const client = require('../config/test'); // Elastic client
const INDEX_NAME = 'chats'; 

// Save a new chat message to Elasticsearch
async function saveChat({ sender, message, timestamp }) {
  const doc = {
    sender,
    message,
    timestamp: timestamp || new Date().toISOString() // default to now
  };

  const response = await client.index({
    index: INDEX_NAME,  // where to store
    body: doc           // what to store
  });

  return response;
}

// Search chats by keyword (in message or sender)
async function searchChats(query) {
  const response = await client.search({
    index: INDEX_NAME,
    body: {
      query: {
        multi_match: {
          query: query,         // what to search for
          fields: ['message', 'sender'] // where to search
        }
      }
    }
  });

  // return hits only
  return response.hits.hits.map(hit => hit._source);
}

module.exports = { saveChat, searchChats };
