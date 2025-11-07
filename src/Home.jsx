import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import placeholderImage from "./assets/news.jpg";

const API_KEY = "3714088404f543e59dc28e97ee287ef1";
const COUNTRY = "us";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const today_date = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&pageSize=16&apiKey=${API_KEY}`
        );
        const data = await res.json();
        if (data.status === "ok") setArticles(data.articles);
        else setError("Failed to fetch news.");
      } catch {
        setError("Network error while fetching news.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <h2>Loading today’s top news...</h2>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home">
      <h1>Today's News Headlines</h1>
      <h3>{today_date}</h3>

      <div className="news-container">
        {articles.map((article, index) => (
          <div key={index} className="news-card">
            {article.urlToImage && (
              <img
                src={article.urlToImage || placeholderImage}
                alt={article.title}
                className="news-image"
              />
            )}
            <div className="news-content">
              <h3>{article.title}</h3>
              <p><strong>{article.source.name}</strong></p>
              <button onClick={() => navigate(`/news/${index}`, { state: { article } })}>
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}