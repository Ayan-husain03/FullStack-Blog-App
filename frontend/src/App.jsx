import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Index from "./pages/Index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
