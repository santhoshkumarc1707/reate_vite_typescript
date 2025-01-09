import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";

// Auth Pages
import Auth from "../Pages/Auth/Auth";
import Dashboard from "../Pages/DashBoard/Dashboard";
import DashboardLayout from "../Pages/DashBoard/DashBoardOutlet/DashboardLayout";
import React from "react";

const AppRouter = () => {
  const isLoggedIn = useSelector((state: RootState) => state.User.isAuthenticated);
  const iserror = useSelector((state: RootState) => state.User.isError);

  return (
    <BrowserRouter>
      <Routes>
        {/* Root route: Redirect to /dashboard if logged in, otherwise render Auth */}
        <Route
          path="/"
          element={isLoggedIn && iserror ? <Navigate to="/dashboard" /> : <Auth />}
        />

        {/* Dashboard route: Protected route */}
        <Route
          path="/dashboard"
          element={isLoggedIn && iserror ? <DashboardLayout /> : <Navigate to="/" />}
        >
          {/* Nested default dashboard route */}
          <Route index element={<Dashboard />} />
        </Route>

        {/* Catch-all route: Redirect to the root */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
