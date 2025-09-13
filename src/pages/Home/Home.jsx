
import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const { isLoggedIn } = useContext(AuthContext);

  const [displayCoin, setDisplayCoin] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    if (value.trim() === "") {
      setDisplayCoin(allCoin);
    } else {
      const filtered = allCoin.filter(
        (coin) =>
          coin.name.toLowerCase().includes(value) ||
          coin.symbol.toLowerCase().includes(value)
      );
      setDisplayCoin(filtered);
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. 
          {isLoggedIn ? " Explore coins below!" : " Sign up to explore more."}
        </p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search crypto..."
            value={search}
            onChange={handleSearch}
            disabled={!isLoggedIn} // disable search if not logged in
          />
          <button type="submit" disabled={!isLoggedIn}>Search</button>
        </form>
      </div>

      <div className={`crypto-table ${!isLoggedIn ? "blurred" : ""}`}>
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {displayCoin.slice(0, 10).map((item) => (
          <Link
            to={`/coin/${item.id}`}
            key={item.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="table-layout">
              <p>{item.market_cap_rank}</p>
              <div className="coin-info">
                <img src={item.image} alt={item.name} width={20} />
                <p>{item.name} ({item.symbol.toUpperCase()})</p>
              </div>
              <p>{item.current_price.toLocaleString()} {currency.symbol}</p>
              <p
                style={{
                  textAlign: "center",
                  color: item.price_change_percentage_24h >= 0 ? "green" : "red",
                }}
              >
                {item.price_change_percentage_24h?.toFixed(2)}%
              </p>
              <p className="market-cap">{item.market_cap.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

