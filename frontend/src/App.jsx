import React, { useEffect } from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import { profile, signIn, signUp } from "./helper/routesNames";
import { Toaster } from "sonner";
import Profile from "./pages/Profile";
import { getCurrentUser } from "./helper/service/authService";
import { useDispatch } from "react-redux";
import { setUser } from "./store/auth/authSlice";
import ProtectedRoute from "./route/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const res = await getCurrentUser();
    console.log(res);
    dispatch(setUser(res.data));
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path={profile}
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
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
