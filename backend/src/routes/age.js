const express = require('express');
const router = express.Router();

// ✅ Ripun: You own this logic. Can expand country rules if needed.
router.post('/', (req, res) => {
  const { dob, country } = req.body;
  const minAge = country === 'IN' ? 25 : 21;        // 🧠 You can change this logic
  const userAge = new Date().getFullYear() - new Date(dob).getFullYear();

  res.json({
    allowed: userAge >= minAge,
    min_age: minAge,
    reason: userAge >= minAge ? "Allowed" : `Legal age in ${country} is ${minAge}`
  });
});

module.exports = router;
