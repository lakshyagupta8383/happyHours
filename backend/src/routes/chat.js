const express = require('express');
const router = express.Router();

const { saveChat, searchChats } = require('../db/chat'); // 🧠 Ripun: you just wrote this

// POST /v1/chat — Save a new message
router.post('/', async (req, res) => {
  try {
    const { sender, message } = req.body;
    const response = await saveChat({ sender, message }); // 🧠 DB call
    res.json({ status: 'ok', result: response });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save chat' });
  }
});

// GET /v1/chat?q=hello — Search messages
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    const results = await searchChats(q || '');
    res.json({ items: results });
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
