import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { googleLogout } from "react-oauth-google";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Store/Store";
import Swal from "sweetalert2"; // Import SweetAlert
import { logout, setErrorStatus } from "../../../Store/UserSlice"; // Import logout and setErrorStatus actions

interface ProfileInfo {
  name: string;
  picture: string;
  email: string;
}

const DasBoardOutlet: React.FC = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.User.user);
  const navigate = useNavigate(); // To navigate after logout
  const dispatch = useDispatch();

  const fetchProfileInfo = async () => {
    if (!user?.access_token) return;

    try {
      const apiResponse = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!apiResponse.ok) {
        throw new Error("Failed to fetch profile information");
      }

      const result: ProfileInfo = await apiResponse.json();
      setProfileInfo(result);
      setError(null); // Clear any previous errors
      dispatch(setErrorStatus(false)); // No error, so set error status to false
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
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
        dispatch(setErrorStatus(false)); // Reset error status after logout
        navigate("/"); // Navigate to the homepage after logout
      }
    });
  };

  return (
    <div>
      <nav className="bg-white text-black p-4 flex justify-between items-center">
        <div></div>

        <div className="flex items-center ml-auto">
          <img
            src={profileInfo?.picture || "https://via.placeholder.com/40"}
            alt={profileInfo?.name || "User"}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="mr-4">
            <p className="font-semibold">{profileInfo?.name || "Guest"}</p>
            <p className="text-sm text-gray-600">{profileInfo?.email || "No Email"}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      {error && (
        <div className="bg-red-500 text-white p-2 text-center">
          {error}
        </div>
      )}

      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DasBoardOutlet;
