import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { googleLogout } from "react-oauth-google";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert
import { logout, setErrorStatus } from "../../../Store/UserSlice"; // Import logout and setErrorStatus actions
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
const DasBoardOutlet = () => {
    const [profileInfo, setProfileInfo] = useState(null);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.User.user);
    const navigate = useNavigate(); // To navigate after logout
    const dispatch = useDispatch();
    const fetchProfileInfo = async () => {
        if (!user?.access_token)
            return;
        try {
            const apiResponse = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            });
            if (!apiResponse.ok) {
                throw new Error("Failed to fetch profile information");
            }
            const result = await apiResponse.json();
            setProfileInfo(result);
            setError(null); // Clear any previous errors
            dispatch(setErrorStatus(false)); // No error, so set error status to false
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError("Error fetching profile info");
            }
            console.error("Error:", err);
            dispatch(setErrorStatus(true)); // Error occurred, set error status to true
        }
    };
    useEffect(() => {
        fetchProfileInfo();
    }, []);
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, log out",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                googleLogout();
                dispatch(logout()); // Dispatch logout action to reset user state
                dispatch(setErrorStatus(true)); // Reset error status after logout
                navigate("/"); // Navigate to the homepage after logout
            }
        });
    };
    return (React.createElement("div", null,
        React.createElement("nav", { className: "bg-white text-black p-4 flex justify-between items-center" },
            React.createElement(React.Fragment, null,
                React.createElement(FontAwesomeIcon, { icon: faClipboard, bounce: true, size: "lg", className: "" }),
                React.createElement("p", { className: "text-2xl" }, "TaskBuddy")),
            React.createElement("div", { className: "flex flex-row items-center ml-auto" },
                React.createElement("img", { src: profileInfo?.picture || "https://via.placeholder.com/40", alt: profileInfo?.name || "User", className: "w-10 h-10 rounded-full mr-3" }),
                React.createElement("div", { className: "mr-4" },
                    React.createElement("p", { className: "font-semibold" }, profileInfo?.name || "Guest"),
                    React.createElement("p", { className: "text-sm text-gray-600" }, profileInfo?.email || "No Email")),
                React.createElement("button", { onClick: handleLogout, className: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" }, "Logout"))),
        error && (React.createElement("div", { className: "bg-red-500 text-white p-2 text-center" }, error)),
        React.createElement("div", { className: "p-4" },
            React.createElement(Outlet, null))));
};
export default DasBoardOutlet;
