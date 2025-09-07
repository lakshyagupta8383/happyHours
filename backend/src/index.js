const express = require('express');        // Import the Express.js framework
const cors = require('cors');              // Import CORS to allow frontend access

const app = express();                     // Initialize the Express app
const PORT = 3000;                         // Define the port for server to listen on

app.use(cors());                           // Enable Cross-Origin Resource Sharing
app.use(express.json());                   // Allow Express to parse JSON in requests

// Mount individual route handlers (each has its own file)
app.use('/v1/age', require('./routes/age'));    // 🔞 Age verification API
app.use('/v1/drinks', require('./routes/drinks'));    // 🍸 Drinks list + details
app.use('/v1/chat', require('./routes/chat'));     // for logs
app.use('/v1/ragchat', require('./routes/ragchat'));        // Chat + AI replies
app.use('/v1/feedback', require('./routes/feedback')); // Feedback from users

// Start the server on defined port
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
