// Purpose: Handle POST /v1/ragchat to return GPT reply

const express = require('express');
const router = express.Router();

const { getTopDrinks } = require('../db/rag');         // RAG drink retriever
const { buildPrompt } = require('../utils/ragPrompt'); // Prompt builder
// const { generateReply } = require('../llm/openai');    // Yash’s GPT handler

router.post('/', async (req, res) => {
    const { message, age, state } = req.body;

    if (!message || !age || !state) {
        return res.status(400).json({ error: 'Missing message, age or state' });
    }

    try {
        const drinks = await getTopDrinks(message, age, state); // Search drinks
        const prompt = buildPrompt(message, drinks);            // Format prompt
        // const reply = await generateReply(prompt);              // GPT response
        res.json({
            mockMessage: 'OpenAI not connected — RAG test only ✅',
            prompt,
            drinks
        });
        res.json({ reply });
    } catch (err) {
        console.error('[RAG Chat Error]', err.message);
        res.status(500).json({ error: 'Chatbot failed. Try again later.' });
    }
});

module.exports = router;
