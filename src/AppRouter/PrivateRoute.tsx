import { useSelector } from "react-redux";
import { RootState } from "../Store/Store";
import { Navigate } from "react-router-dom";
import { JSX } from "react";

const isLoggedIn = useSelector((state: RootState) => state.User.isAuthenticated);


// PrivateRoute component to wrap protected routes
export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };