require('dotenv').config({ path: __dirname + '/../../../.env' }); // Load .env
const { Client } = require('@elastic/elasticsearch');
const fs = require('fs');
const path = require('path');

// Load from .env
const ES_HOST = process.env.ES_HOST;
const API_KEY = process.env.API_KEY;

// Initialize Elastic client
const client = new Client({
  node: ES_HOST,
  auth: { apiKey: API_KEY }
});

// Load drinking age data
const ageDataPath = path.join(__dirname, '/../../../public/assets/drinking_age.json');
const ageLimitMap = JSON.parse(fs.readFileSync(ageDataPath, 'utf-8'));

const INDEX_NAME = 'chats';

// Check if user is underage
function isUnderage(age, state) {
  const legal = ageLimitMap[state];
  return legal === 'illegal' || (typeof legal === 'number' && age < legal);
}

// Save a chat message
async function saveChat(sender, message, age, state) {
  if (isUnderage(age, state) && message.toLowerCase().includes('alcohol')) {
    throw new Error('You are not allowed to request alcoholic suggestions.');
  }

  const doc = {
    sender,
    message,
    timestamp: new Date()
  };

  const result = await client.index({
    index: INDEX_NAME,
    document: doc
  });

  return result;
}

// Search chats by query
async function searchChats(q, age, state) {
  const underage = isUnderage(age, state);

  const response = await client.search({
    index: INDEX_NAME,
    size: 20,
    query: {
      match: {
        message: q
      }
    }
  });

  return response.hits.hits
    .map(hit => hit._source)
    .filter(chat =>
      !(underage && chat.message.toLowerCase().includes('alcohol'))
    );
}

module.exports = {
  saveChat,
  searchChats
};
