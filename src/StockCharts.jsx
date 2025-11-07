import { useEffect, useState } from "react";
import "./StockCharts.css"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const API_KEY = "KJYL66TXS37Y8UWG";

const INDEX_SYMBOLS = {
  "S&P 500": "SPY",
  "NASDAQ": "QQQ",
  "Dow Jones": "DIA"
};

export default function StockCharts() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = {};
        for (const [name, symbol] of Object.entries(INDEX_SYMBOLS)) {
          const res = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
          );
          const json = await res.json();
          const series = json["Time Series (Daily)"];
          
          if (series) {
            fetchedData[name] = Object.entries(series)
              .slice(0, 30) 
              .map(([date, values]) => ({
                date,
                close: parseFloat(values["4. close"]),
              }))
              .reverse();
          }
        }
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching market index data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading market index data...</p>;

  return (
    <div className="market-index-chart">
      <h1>Top U.S. Market Indices</h1>
      <h3>Close charts for most recent 30 trading days</h3>

      {Object.entries(data).map(([name, indexData]) => (
        <div key={name} className="index-chart">
          <h2>{name}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={indexData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#007bff"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}
