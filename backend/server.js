const express = require('express');
const cors = require('cors');
require('dotenv').config();

const newsRoutes = require('./routes/news');

const app = express();
const PORT = process.env.PORT || 5000;

// Flexible CORS for development
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin
    if (!origin) return callback(null, true);
    
    // Check if origin is localhost or local network IP
    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
    const isLocalNetwork = /^https?:\/\/192\.168\.\d+\.\d+:\d+$/.test(origin) || 
                          /^https?:\/\/10\.\d+\.\d+\.\d+:\d+$/.test(origin) ||
                          /^https?:\/\/172\.(1[6-9]|2\d|3[01])\.\d+\.\d+:\d+$/.test(origin);
    
    if (isLocalhost || isLocalNetwork) {
      console.log('✅ CORS allowed for origin:', origin);
      callback(null, true);
    } else {
      console.log('❌ CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  console.log(`🌍 Origin: ${req.headers.origin || 'No origin'}`);
  next();
});

// Routes
app.use('/api/news', newsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    cors: 'Configured for localhost and local network IPs'
  });
});

// Error handling
app.use((error, req, res, next) => {
  console.error('❌ Server Error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {  // ✅ Bind to all interfaces
  console.log('🚀 Server started successfully!');
  console.log(`📡 API running on: http://localhost:${PORT}`);
  console.log(`🌍 CORS enabled for all localhost and local network origins`);
  console.log(`📊 Available endpoints:`);
  console.log(`   GET /api/health`);
  console.log(`   GET /api/news?limit=10&random=1`);
});