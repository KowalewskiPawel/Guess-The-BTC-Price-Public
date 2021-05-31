import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import mapDispatchToProps from "./redux/mapDispatchToProps";
import mapStateToProps from "./redux/mapStateToProps";
import "./App.css";

import Title from "./components/Title";
import Modal from "./components/Modal";
import Main from "./components/Main";

const queryClient = new QueryClient();

const formatPrice = (price) => {
  const formatConfig = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return formatConfig.format(price);
};

function Presentational() {
  return (
    <QueryClientProvider client={queryClient}>
      <Title />
      <BTCPrice />
      <Modal />
      <Main />
    </QueryClientProvider>
  );
}

function BTCPrice() {
  const { isLoading, error, data, isFetching } = useQuery("btcPrice", () =>
    fetch("https://api.coingecko.com/api/v3/coins/bitcoin").then((res) =>
      res.json()
    )
  );

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "ADD_PRICE",
          price: data.market_data.current_price.usd,
        })
      );
  }, [data]);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="BTCPriceDisplay">
      <strong style={{ marginRight: "1em" }}>₿TC Price:</strong>
      <strong style={{ marginRight: "1em" }}>
        {" "}
        {formatPrice(data.market_data.current_price.usd)}
      </strong>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}

const App = connect(mapStateToProps, mapDispatchToProps)(Presentational);

export default App;
