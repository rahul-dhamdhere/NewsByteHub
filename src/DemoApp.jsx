import React, { useState, useEffect } from 'react';
import './App.css';

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

  // Dummy data instead of backend call
  const dummyData = [
    {
      id: 1,
      title: "AI Isn’t Coming for Hollywood. It Has Already Arrived",
      summary: "AI isn’t coming for Hollywood. Stability AI’s early success led to collapse, but VCs left after four months, signaling their exit. Can the competition still hold off? The article highlights a star-studded comeback, leaving questions about whether the AI war will continue.",
      category: "Technology",
      published_at: " 20/8/2025",
      url: "https://example.com/ai-news",
      image: "https://media.wired.com/photos/68a4c03846f2ca0825d3d3fc/191:100/w_1280,c_limit/WIRED-FFStabilityAI-MarkHarris-01.jpg"
    },
    {
      id: 2,
      title: "Ghislaine Maxwell moved to minimum-security women's prison in Texas",
      summary: "Ghislaine Maxwell, a key figure in the Epstein case, was moved from Florida to Texas. Authorities confirmed her transfer to a minimum-security facility in Texas, marking her at the center of controversy over the Trump administration’s handling of the Epstein case. The move highlights the legal and political implications of the case.",
      category: "Sports",
      published_at: "1/8/2025",
      url: "https://example.com/sports",
      image: "https://ichef.bbci.co.uk/news/1024/branded_news/c0c3/live/2e1dc6d0-6efd-11f0-8415-3f856a662103.jpg"
    },
    {
      id: 3,
      title: "Amazon is wreaking havoc on the ad market, and The Trade Desk may be its latest victim",
      summary: "Amazon's expansion has intensified competition in the ad market, as The Trade Desk's shares fell nearly 40%—the sharpest decline on record—following analysts' claims of Amazon being the primary culprit. The Trade Desk CEO's shares plummeted after critics highlighted the growing rivalry, with competitors like Amazon signaling increasing their presence in ad markets.",
      category: "Sports",
      published_at: "8/8/2025",
      url: "https://example.com/economy",
      image: "https://i.insider.com/68965b70cfc04e97619b2495?width=1200&format=jpeg"
    },
    {
      id: 4,
      title: "Jesus Christ! The Rise of AI for Talking to God",
      summary: " A guy in the cloud sees everything, and AI is becoming better at imitating humans, creating music, texts, and images. As AI improves, it’s also being used for more creative and everyday tasks. Generative AI is advancing at a faster pace, making it possible for humans to create art and complex ideas. This technological leap is reshaping the world, blending human creativity with artificial intelligence. In short, AI is not just creating art—it’s revolutionizing how humans interact with technology, making it more intelligent and efficient. The rise of AI is transforming our daily lives, blending human potential with machine capabilities. This summary captures the essence while staying concise.",
      category: "technology",
      published_at: "12/8/2025",
      url: "https://example.com/economy",
      image: "https://gizmodo.com/app/uploads/2024/08/FacebookShrimpJesus.jpg"
    },
    {
      id: 5,
      title: "Did Nvidia Just Pop an AI Bubble? Here’s What the Market Says",
      summary: " Nvidia’s lukewarm second-quarter results have the market questioning if the AI bubble is nearing an exit, with analysts and Wall Street reacting to mixed sentiment. The market’s skepticism points to a potential shift in the industry’s trajectory.",
      category: "technology",
      published_at: "28/8/2025",
      url: "https://example.com/economy",
      image: "https://gizmodo.com/app/uploads/2024/11/Jensen-Huang-Nvidia-1.jpg"
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setArticles(dummyData);
      setLoading(false);
    }, 1000); // simulate loading delay
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

  return (
    <div id='scrll'>
      {articles.map((article) => (
        <NewsCard key={article.id} cardData={article} />
      ))}
    </div>
  );
}

export default App;
