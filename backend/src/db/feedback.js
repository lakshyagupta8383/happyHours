require('dotenv').config({ path: __dirname + '/../../../.env' });

const { Client } = require('@elastic/elasticsearch');
const path = require('path');

const ES_HOST = process.env.ES_HOST;
const API_KEY = process.env.API_KEY;

const client = new Client({ node: ES_HOST, auth: { apiKey: API_KEY } });

const INDEX_NAME = 'feedback';

async function saveFeedback(data) {
  const doc = {
    ...data,
    timestamp: new Date()
  };

  const result = await client.index({
    index: INDEX_NAME,
    document: doc
  });

  return result;
}

module.exports = { saveFeedback };
