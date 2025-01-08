import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";

// Auth Pages
import Auth from "../Pages/Auth/Auth";
import Dashboard from "../Pages/DashBoard/Dashboard";
import DashboardLayout from "../Pages/DashBoard/DashBoardOutlet/DashboardLayout";

const AppRouter = () => {
  const isLoggedIn = useSelector((state: RootState) => state.User.isAuthenticated);
  const isauth = useSelector((state: RootState) => state.User.user?.access_token)
  const istoken = isauth ? true : false;
  const iserror = useSelector((state: RootState) => state.User.isError)
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to DashboardLayout if logged in, else Auth */}
        <Route path="/" element={isLoggedIn && istoken && !iserror ? <Navigate to="/dashboard" /> : <Auth />} />

        {/* Private route for Dashboard */}
        <Route
          path="/dashboard"
          element={isLoggedIn && istoken &&!iserror ? <DashboardLayout /> : <Navigate to="/" />}
        >
          {/* Default dashboard route */}
          <Route index element={<Dashboard />} />
        </Route>

        {/* Catch-all route for redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
