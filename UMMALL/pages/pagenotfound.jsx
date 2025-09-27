import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import bg_2 from "../src/assets/bg_2.png";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${bg_2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="shadow-2xl rounded-2xl p-10 w-full max-w-md transform transition-transform relative border-2 border-gray-200 absolute inset-0 bg-white/40 backdrop-blur-xl select-none text-center">
        {/* Back Arrow */}
        <button
          onClick={() => navigate("/")}
          className="flex justify-center items-center absolute top-4 left-4 p-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-gray-400 mr-1 rounded-lg hover:text-gray-800 cursor-pointer transition-colors" />
          <span className="relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-underline before:transition-all before:duration-300 hover:before:w-full">
            Back to Home
          </span>
        </button>

        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-700 text-lg mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white py-2 px-6 rounded-xl hover:bg-blue-600 transition-colors font-semibold cursor-pointer"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
