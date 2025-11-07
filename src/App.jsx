import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import IndividualNewsPage from "./IndividualNewsPage";
import StockCharts from "./StockCharts";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        
        <aside className="sidebar">
          <h2>Dashboard</h2>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search News</Link>
              </li>
              <li>
                <Link to="/stock">Stock Market</Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/news/:id" element={<IndividualNewsPage />} />
            <Route path="/stock" element={<StockCharts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
