import React, { useContext } from "react";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";


const Pricing = () => {
  const { allCoin, currency } = useContext(CoinContext);

  return (
    <div className="crypto-table" style={{ marginTop: "100px" }}>
      <div className="table-layout">
        <p>#</p>
        <p>Coins</p>
        <p>Price</p>
        <p style={{ textAlign: "center" }}>24H Change</p>
        <p className="market-cap">Market Cap</p>
      </div>

      {allCoin.slice(0, 10).map((item) => (
        <Link
          to={`/coin/${item.id}`}
          key={item.id}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="table-layout">
            <p>{item.market_cap_rank}</p>
            <div className="coin-info">
              <img src={item.image} alt={item.name} width={20} />
              <p>
                {item.name} ({item.symbol.toUpperCase()})
              </p>
            </div>
            <p>
              {item.current_price.toLocaleString()} {currency.symbol}
            </p>
            <p
              style={{
                textAlign: "center",
                color:
                  item.price_change_percentage_24h >= 0 ? "green" : "red",
              }}
            >
              {item.price_change_percentage_24h?.toFixed(2)}%
            </p>
            <p className="market-cap">{item.market_cap.toLocaleString()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Pricing;
