const express = require('express');
const db = require('../config/database');
const router = express.Router();

// GET /api/news - Fetch random articles
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const random = req.query.random === '1';

    let query = `
      SELECT 
        id, title, summary, url, image, category, published_at 
      FROM news_articles 
    `;
    
    if (random) {
      query += ' ORDER BY RAND()';
    } else {
      query += ' ORDER BY published_at DESC';
    }
    
    query += ` LIMIT ${limit}`;

    console.log('🔍 Executing query:', query);
    
    const [rows] = await db.execute(query);

    console.log(`✅ Found ${rows.length} articles`);

    res.json(rows);

  } catch (error) {
    console.error('❌ Database error:', error);
    res.status(500).json({
      error: 'Failed to fetch articles',
      message: error.message
    });
  }
});

module.exports = router;