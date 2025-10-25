const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Simple contact form submission route (no database)
app.post('/submit-form', (req, res) => {
  // Send a success response immediately
  res.json({ success: true, message: 'Form submitted successfully!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on https://devaananth357.github.io/Portfolio-testing2/`);
});
