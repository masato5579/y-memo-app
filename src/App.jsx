import React from "react";
import Router from "./Router";
import { Header } from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <main className="root header-padding">
        <Router />
      </main>
    </>
  );
};

export default App;
