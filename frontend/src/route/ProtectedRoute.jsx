import Loading from "@/components/Loading";
import { signIn } from "@/helper/routesNames";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((state) => state.user);
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to={signIn} replace />;
  }
  return children;
}

export default ProtectedRoute;
