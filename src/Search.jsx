import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "3714088404f543e59dc28e97ee287ef1";
const COUNTRY = "us";
const CATEGORIES = ["politics", "business", "sports", "entertainment", "health"];

export default function Search() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const searchNews = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setCategory("");
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=16&apiKey=${API_KEY}`
      );
      const data = await res.json();
      if (data.status === "ok") setArticles(data.articles);
      else setError("No news found.");
    } catch {
      setError("Network error while fetching search results.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = async (cat) => {
    setCategory(cat);
    setQuery("");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&category=${cat}&pageSize=16&apiKey=${API_KEY}`
      );
      const data = await res.json();
      if (data.status === "ok") setArticles(data.articles);
      else setError("No news found.");
    } catch {
      setError("Network error while fetching category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h1>Search News</h1>

      <form onSubmit={searchNews} className="search-bar">
        <input
          type="text"
          placeholder="Search news by keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="category-buttons">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${category === cat ? "active" : ""}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p>Loading results...</p>}
      {error && <p>{error}</p>}

      <div className="news-container">
        {articles.map((article, index) => (
          <div key={index} className="news-card">
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="news-image" />
            )}
            <div className="news-content">
              <h3>{article.title}</h3>
              <p><strong>{article.source.name}</strong></p>
              <button
                className="read-btn"
                onClick={() => navigate(`/news/${index}`, { state: { article } })}
              >
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
