const express = require('express');
const router = express.Router();

const { saveFeedback } = require('../db/feedback');

// POST /v1/feedback
router.post('/', async (req, res) => {
  const { user, type, reference_id, rating, comment } = req.body;

  if (!user || !type || !reference_id || !rating) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await saveFeedback({ user, type, reference_id, rating, comment });
    res.json({ status: 'ok', result });
  } catch (err) {
    console.error('Feedback save error:', err);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

module.exports = router;
