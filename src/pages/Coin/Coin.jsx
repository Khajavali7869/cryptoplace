import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./Coin.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Coin = () => {
  const { id } = useParams();
  const { currency, allCoin } = useContext(CoinContext);
  const [chartData, setChartData] = useState(null);
  const coinData = allCoin.find((c) => c.id === id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
          {
            params: {
              vs_currency: currency.name,
              days: 30,
              interval: "daily",
            },
            headers: {
              "x-cg-demo-api-key": "CG-cKrhJVDxcjH8ZLNpZx7hiiPT",
            },
          }
        );

        const prices = res.data.prices.map((item) => {
          const date = new Date(item[0]);
          return {
            time: date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            }),
            price: item[1],
          };
        });

        setChartData({
          labels: prices.map((p) => p.time),
          datasets: [
            {
              label: `${id.toUpperCase()} Price (${currency.symbol})`,
              data: prices.map((p) => p.price),
              borderColor: "rgba(20, 233, 233, 1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              fill: true,
              tension: 0.3,
              pointRadius: 0,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [id, currency]);

  return (
    <div className="coin-container">
      {coinData && (
        <div className="coin-header flex items-center justify-center gap-3 mb-6">
          <img src={coinData.image} alt={coinData.name} width={50} />
          <h2 className="text-2xl font-bold">
            {coinData.name} ({coinData.symbol.toUpperCase()}) {currency.symbol}
          </h2>
        </div>
      )}

      {chartData ? (
        <div className="chart-wrapper">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "#333",
                    font: {
                      size: 12,
                      weight: "bold",
                    },
                  },
                  grid: {
                    color: "rgba(200,200,200,0.2)",
                  },
                },
                y: {
                  ticks: {
                    color: "#333",
                    font: {
                      size: 12,
                      weight: "bold",
                    },
                  },
                  grid: {
                    color: "rgba(200,200,200,0.2)",
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <p className="text-center loading"></p>
      )}

      {coinData && (
        <div className="coin-details">
          <div className="detail-row">
            <span className="detail-label">Crypto Market Rank</span>
            <span className="detail-value">{coinData.market_cap_rank}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Current Price</span>
            <span className="detail-value">
              {currency.symbol} {coinData.current_price.toLocaleString()}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Market Cap</span>
            <span className="detail-value">
              {currency.symbol} {coinData.market_cap.toLocaleString()}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">24 Hour High</span>
            <span className="detail-value">
              {currency.symbol} {coinData.high_24h.toLocaleString()}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">24 Hour Low</span>
            <span className="detail-value">
              {currency.symbol} {coinData.low_24h.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coin;
