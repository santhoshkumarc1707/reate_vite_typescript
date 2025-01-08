import { useGoogleLogin } from "react-oauth-google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/UserSlice";

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
    <div className="flex items-center justify-center h-screen bg-[#fffafa]">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Google Auth Login</h1>
        <button
          onClick={() => handleGoogleLogin()}
          className="flex items-center justify-center bg-black text-white py-2 px-6 text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-gray-700"
        >
          {/* Updated Google Logo URL */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt="Google Logo"
            className="w-5 h-5 mr-3"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default GoogleOAuthLogin;
