
import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import signup from "../../assets/arrow_icon.png";
import { CoinContext } from "../../context/CoinContext";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { setCurrency } = useContext(CoinContext);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const currencyhandler = (e) => {
    switch (e.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "inr":
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {isLoggedIn ? (
            <Link to="/features">Features</Link>
          ) : (
            <span className="disabled-link">Features</span>
          )}
        </li>
        <li>
          {isLoggedIn ? (
            <Link to="/coin">Pricing</Link>
          ) : (
            <span className="disabled-link">Pricing</span>
          )}
        </li>
      </ul>

      <div className="nav-right">
        <select onChange={currencyhandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>

        <button
          onClick={isLoggedIn ? logout : () => navigate("/signup")}
        >
          {isLoggedIn ? "Logout" : "Sign Up"} <img src={signup} alt="Arrow" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
