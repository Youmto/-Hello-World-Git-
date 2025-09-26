import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgImage from "../src/assets/fan.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    navigate("/product"); // Redirect after login
  };

  // Helper class for smooth underline
  const underlineClass =
    "relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full";

  const underlineClass_1 =
    "relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-underline before:transition-all before:duration-300 hover:before:w-full";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"
    style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
  >
      
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md transform hover:scale-105 transition-transform relative">

        {/* Back Arrow */}
        <button
          onClick={() => navigate("/")}
          className={`flex justify-center items-center absolute top-4 left-4 p-2 transition-colors`}
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 mr-1" />
          <span className={`${underlineClass_1}`}>Back to Home</span>
        </button>

        <h2 className="text-3xl font-bold mb-6 mt-6 text-center text-gray-800">
          Welcome Back
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-none"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-right mt-2">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className={`text-blue-500 text-sm ${underlineClass}`}
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Login
          </button>
        </form>

        <div className="my-5 flex items-center">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-gray-500">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>
          <button className="flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              className="w-5 h-5 mr-2"
            />
            Continue with Facebook
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className={`text-blue-500 ${underlineClass}`}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
