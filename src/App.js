import React from "react";
import { connect } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import mapDispatchToProps from "./redux/mapDispatchToProps";
import mapStateToProps from "./redux/mapStateToProps";
import "./App.css";

import Title from "./components/Title";
import Modal from "./components/Modal";
import Main from "./components/Main";
import BTCPrice from "./components/BTCPrice";

const queryClient = new QueryClient();

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

const App = connect(mapStateToProps, mapDispatchToProps)(Presentational);

export default App;
