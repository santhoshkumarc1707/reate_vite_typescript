import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Auth Pages
import Auth from "../Pages/Auth/Auth";
import Dashboard from "../Pages/DashBoard/Dashboard";
import DashboardLayout from "../Pages/DashBoard/DashBoardOutlet/DashboardLayout";
import React from "react";
const AppRouter = () => {
    const isLoggedIn = useSelector((state) => state.User.isAuthenticated);
    const iserror = useSelector((state) => state.User.isError);
    return (React.createElement(BrowserRouter, null,
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: isLoggedIn && iserror ? React.createElement(Navigate, { to: "/dashboard" }) : React.createElement(Auth, null) }),
            React.createElement(Route, { path: "/dashboard", element: isLoggedIn && iserror ? React.createElement(DashboardLayout, null) : React.createElement(Navigate, { to: "/" }) },
                React.createElement(Route, { index: true, element: React.createElement(Dashboard, null) })),
            React.createElement(Route, { path: "*", element: React.createElement(Navigate, { to: "/" }) }))));
};
export default AppRouter;
