import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import { signIn, signUp } from "./helper/routesNames";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
          </Route>
          <Route path={signIn} element={<SignIn />} />
          <Route path={signUp} element={<Signup />} />
        </Routes>
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </>
  );
}

export default App;
