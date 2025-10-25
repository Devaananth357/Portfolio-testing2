// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const START_PORT = parseInt(process.env.PORT, 10) || 3000;

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow your live sites to call this API (add/remove origins as needed)
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://devaananth357.github.io',
  'https://devaananth-portfolio.info'
];
app.use(
  cors({
    origin(origin, cb) {
      // allow same-origin / curl / server-to-server with no Origin
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('CORS not allowed from this origin'));
    },
    methods: ['POST', 'OPTIONS'],
    credentials: false
  })
);

// Serve static files when running locally (optional)
app.use(express.static(path.join(__dirname, '/')));

// --- Routes ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Simple contact form submission route (no database)
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body || {};
  // Basic sanity check
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  // TODO: plug in email service / DB here if you want

  return res.json({ success: true, message: 'Form submitted successfully!' });
});

// --- Start with auto-incrementing port if in use ---
function startServer(port) {
  const server = app
    .listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} in use, trying ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error(err);
        process.exit(1);
      }
    });
}
startServer(START_PORT);
