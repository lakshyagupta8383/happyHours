const express = require('express')
const router = express.Router();
const { saveChat, searchChats } = require('../db/chat');

// POST /v1/chat → Save message
router.post('/', async (req, res) => {
  const { sender, message, age, state } = req.body;

  try {
    const result = await saveChat(sender, message, parseInt(age), state);
    res.json({ status: 'ok', result });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
});

// GET /v1/chat?q=... → Search chats
router.get('/', async (req, res) => {
  const { q, age, state } = req.query;

  try {
    const results = await searchChats(q, parseInt(age), state);
    res.json({ items: results });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
});

module.exports = router;
