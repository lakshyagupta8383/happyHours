require('dotenv').config({ path: __dirname + '/../../../.env' });
const { Client } = require('@elastic/elasticsearch');
const fs = require('fs');
const path = require('path');

// Elastic credentials
const ES_HOST = process.env.ES_HOST;
const API_KEY = process.env.API_KEY;

// Connect to Elastic Cloud
const client = new Client({
  node: ES_HOST,
  auth: { apiKey: API_KEY },
  tls: { rejectUnauthorized: false }
});

// Load drinking age rules
const ageDataPath = path.join(__dirname, '/../../../public/assets/drinking_age.json');
const ageLimits = JSON.parse(fs.readFileSync(ageDataPath, 'utf8'));

// Check if user is underage
function isUnderage(age, state) {
  const legal = ageLimits[state];
  return legal === 'illegal' || (typeof legal === 'number' && age < legal);
}

// Save chat in "chats" index (only if allowed)
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
    index: 'chats',
    document: doc
  });

  return result;
}

// Search past chats (age-filtered)
async function searchChats(q, age, state) {
  const underage = isUnderage(age, state);

  const response = await client.search({
    index: 'chats',
    size: 1000,
    query: {
      match: { message: q }
    }
  });

  return response.hits.hits
    .map(hit => hit._source)
    .filter(chat =>
      !(underage && chat.message.toLowerCase().includes('alcohol'))
    );
}

// Get top drinks from Elastic (with age filtering)
async function getTopDrinks(userQuery, age, state, limit = 5) {
  const must = [
    {
      multi_match: {
        query: userQuery,
        fields: ['name^5', 'description^2', 'tags']
      }
    }
  ];

  if (age && state && ageLimits[state] && age < ageLimits[state]) {
    must.push({ term: { 'tags.keyword': 'non-alcoholic' } });
  }

  const result = await client.search({
    index: 'recipes',
    size: limit,
    query: {
      bool: { must }
    }
  });

  return result.hits.hits.map(hit => hit._source);
}

module.exports = {
  getTopDrinks,
  saveChat,
  searchChats
};
