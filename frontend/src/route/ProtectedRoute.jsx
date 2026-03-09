import { signIn } from "@/helper/routesNames";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((state) => state);
  if (!user) {
    return <Navigate to={signIn} />;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return children;
}

export default ProtectedRoute;
