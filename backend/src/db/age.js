require('dotenv').config({ path: __dirname + '/../../../.env' }); // Load .env

const path = require('path');
const fs = require('fs');
const client = require('../config/test'); // Elastic client

const INDEX_NAME = 'recipes'; // Your drinks index

// Load legal drinking age map
const ageDataPath = path.join(__dirname, '/../../../public/assets/drinking_age.json');
const ageLimitMap = JSON.parse(fs.readFileSync(ageDataPath, 'utf-8'));

// Check if the user is underage
function isUnderage(userAge, state) {
  const limit = ageLimitMap[state];
  return limit === 'illegal' || (typeof limit === 'number' && userAge < limit);
}

// Main logic: get drinks based on age + state
async function getDrinksByAgeAndState(userAge, state) {
  const legalLimit = ageLimitMap[state];

  if (legalLimit === undefined) {
    throw new Error(`State '${state}' not found in legal age list.`);
  }

  const underage = isUnderage(userAge, state);

  const query = underage
    ? {
        bool: {
          must_not: [{ match: { tags: 'alcoholic' } }]
        }
      }
    : {
        match_all: {}
      };

  const response = await client.search({
    index: INDEX_NAME,
    size: 600,
    body: { query }
  });

  return response.hits.hits.map(hit => hit._source);
}

module.exports = { getDrinksByAgeAndState, isUnderage };
