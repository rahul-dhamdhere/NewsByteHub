import React, { useState, useEffect } from 'react';
import './App.css';

// API call to backend
const fetchNewsArticles = async (limit = 10) => {
  try {
    const response = await fetch(`http://localhost:5000/api/news?limit=${limit}&random=1`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching news articles:', error);
    throw error;
  }
};

function NewsCard({ cardData }) {
  const [liked, setLiked] = useState(false);

  return (
    <div id="container">
      <div id="card" style={{ backgroundColor: cardData.bgColor || 'lightgrey' }}>
        {cardData.image && (
          <img 
            src={cardData.image} 
            alt={cardData.title} 
            style={{ borderRadius: '15px', marginBottom: '15px' }} 
          />
        )}
        <h1>{cardData.title}</h1>
        <p>{cardData.summary}</p>
        <div className="card-meta">
          <p>Category: {cardData.category}</p>
          <p>Published: {new Date(cardData.published_at).toLocaleDateString()}</p>
        </div>
        <button 
          onClick={() => setLiked(!liked)}
          style={{ 
            backgroundColor: liked ? 'red' : 'gray',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            marginTop: '20px',
            cursor: 'pointer',
            borderRadius: '5px'
          }}
        >
          {liked ? '❤️ Liked' : '🤍 Like'}
        </button>
        <a 
          href={cardData.url} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'block',
            marginTop: '10px',
            color: 'blue',
            textDecoration: 'none',
            backgroundColor: "grey"
          }}
        >
          Read Full Article →
        </a>
      </div>
    </div>
  );
}

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await fetchNewsArticles(10);
        setArticles(data);
      } catch (err) {
        setError('Failed to load articles');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        fontSize: '24px'
      }}>
        Loading news...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column',
        color: 'red'
      }}>
        <h2>Error: {error}</h2>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div id='scrll'>
      {articles.map((article) => (
        <NewsCard key={article.id} cardData={article} />
      ))}
    </div>
  );
}

export default App;