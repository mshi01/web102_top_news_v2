import { useLocation, useNavigate } from "react-router-dom";
import "./IndividualNewsPage.css";

export default function IndividualNewsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.article) {
    return (
      <div className="news-detail">
        <h2>Article not found.</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const { article } = state;

  return (
    <div className="news-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1>{article.title}</h1>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="detail-image"
        />
      )}

      <p><strong>Source:</strong> {article.source.name}</p>
      <p><strong>Author:</strong> {article.author || "Unknown"}</p>
      <p><strong>Published At:</strong> {new Date(article.publishedAt).toLocaleString()}</p>

      <p className="article-description">{article.description || "No description available."}</p>
      <p className="article-content">{article.content || ""}</p>

      <a href={article.url} target="_blank" rel="noopener noreferrer" className="original-link">
        Read Original Article →
      </a>
    </div>
  );
}
