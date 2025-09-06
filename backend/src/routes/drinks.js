const express = require('express');                     // Import Express
const router = express.Router();                        // Create router
const { getAllDrinks, getDrinkById } = require('../db/drinks'); // 🧠 Ripun: implement these


// GET /v1/drinks
router.get('/', async (req, res) => {
  try {
    const drinks = await getAllDrinks();               // 🧠 Ripun: fetch all drinks from DB
    res.json({ items: drinks });                       // Send as JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drinks' });  // Handle DB errors
  }
});

// GET /v1/drinks/:id
router.get('/:id', async (req, res) => {
  try {
    const drink = await getDrinkById(req.params.id);   // 🧠 Ripun: fetch specific drink
    if (!drink) return res.status(404).json({ error: 'Drink not found' });
    res.json(drink);                                   // Send found drink
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drink' }); // Handle errors
  }
});

module.exports = router;                               // Export router
