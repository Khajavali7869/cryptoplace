import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  async function getCoinsList(curr) {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        {
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-cKrhJVDxcjH8ZLNpZx7hiiPT",
          },
        }
      );
      setAllCoin(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  }


  useEffect(() => {
    getCoinsList(currency);
  }, [currency]);
  

  const contextValue = {
    allCoin,
    setAllCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
