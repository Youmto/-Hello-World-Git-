import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bg_3 from "../src/assets/bg_3.png";

export default function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const underlineClass =
    "relative before:absolute before:bottom-[-2px] before:left-0 before:h-[2px] before:w-0 before:bg-blue-700 before:transition-all before:duration-300 hover:before:w-full";

  const underlineClass_1 =
    "relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-underline before:transition-all before:duration-300 hover:before:w-full";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    navigate("/product"); // Replace with your signup logic
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${bg_3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="shadow-2xl rounded-2xl p-10 w-full max-w-md transform transition-transform relative border-2 border-gray-200 absolute inset-0 bg-white/40 backdrop-blur-xl select-none">
        {/* Back Arrow */}
        <button
          onClick={() => navigate("/")}
          className="flex justify-center items-center absolute top-4 left-4 p-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-gray-400 mr-1 rounded-lg hover:text-gray-800 transition-colors" />
          <span className={`${underlineClass_1}`}>Back to Home</span>
        </button>

        <h2 className="text-3xl font-bold mb-6 mt-6 text-center text-gray-800">
          Create Account
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-medium">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 mt-1 font-medium border rounded-lg focus:outline-none focus:ring-2 focus:border-none"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 mt-1 font-medium border rounded-lg focus:outline-none focus:ring-2 focus:border-none"
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 font-medium border rounded-lg focus:outline-none focus:ring-2 focus:border-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 font-medium border rounded-lg focus:outline-none focus:ring-2 focus:border-none"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 font-medium border rounded-lg focus:outline-none focus:ring-2 focus:border-none"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition-colors font-semibold cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <div className="my-5 flex items-center">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-gray-500">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center border border-gray-700 py-2 rounded-xl hover:bg-gray-700 hover:text-gray-200 transition-colors cursor-pointer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>
          <button className="flex items-center justify-center border border-gray-700 py-2 rounded-xl hover:bg-gray-700 hover:text-gray-200 transition-colors cursor-pointer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              className="w-5 h-5 mr-2"
            />
            Continue with Facebook
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className={`text-blue-700 ${underlineClass}`}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
