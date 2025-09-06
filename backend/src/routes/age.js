const express = require('express');
const router = express.Router();

const { getDrinksByAgeAndState } = require('../db/age');

// GET /v1/age?age=20&state=Delhi
router.get('/', async (req, res) => {
  const { age, state } = req.query;

  if (!age || !state) {
    return res.status(400).json({ error: 'Missing age or state in query' });
  }

  const userAge = parseInt(age, 10);
  if (isNaN(userAge)) {
    return res.status(400).json({ error: 'Invalid age format' });
  }

  try {
    const drinks = await getDrinksByAgeAndState(userAge, state);
    res.json({ items: drinks });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
