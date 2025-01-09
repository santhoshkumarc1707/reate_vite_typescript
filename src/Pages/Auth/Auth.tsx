import { useGoogleLogin } from "react-oauth-google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/UserSlice";
import React from "react";

function GoogleOAuthLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Login successful:", tokenResponse);
      dispatch(setUser(tokenResponse));
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed", error);
      navigate("/");
    },
  });

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#d9d8d8] to-[#cfd2d5] relative">
      {/* Decorative Background Elements with Bounce Animation */}
      <div className="absolute w-72 h-72 bg-blue-100 opacity-50 rounded-full top-10 left-10 blur-3xl animate-bounce"></div>
      <div className="absolute w-96 h-96 bg-pink-200 opacity-40 rounded-full bottom-20 right-20 blur-3xl animate-bounce delay-200"></div>

      {/* Left Section - Login Form */}
      <div className="w-1/2 flex flex-col justify-center items-start px-16 z-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome Back!
        </h1>
        <p className="text-md text-gray-600 mb-8">
          Log in to your account and continue your journey with us.
        </p>
        <button
          onClick={() => handleGoogleLogin()}
          className="flex items-center justify-center bg-gray-800 text-white py-3 px-6 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-gray-700"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt="Google Logo"
            className="w-5 h-5 mr-3"
          />
          Sign in with Google
        </button>
      </div>

      {/* Right Section - Design */}
      <div className="w-1/2 flex items-center justify-center z-10">
        <div className="text-center">
          <div className="relative w-full h-96 flex items-center justify-center">
            <div className="w-40 h-40 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full animate-bounce"></div>
            <div className="absolute w-60 h-60 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-70 animate-bounce delay-150"></div>
            <div className="absolute w-80 h-80 bg-gradient-to-r from-pink-200 to-blue-200 rounded-full opacity-40 animate-bounce delay-300"></div>
          </div>
          <h1 className="text-4xl font-bold text-gray-700 mt-8">
            Simplify Your Workflow
          </h1>
          <p className="text-md text-gray-500 mt-4">
            Get access to your personalized dashboard in just one click.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GoogleOAuthLogin;
