import { useState } from "react";

export default function AuthPopup({ onClose, onGoogle, onSubmit }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onSubmit(email, password, isLogin);
  };

  return (
    <div className="fixed inset-0 bg-black/75 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96">
        
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Email */}
        <input
          className="w-full border p-3 rounded mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          className="w-full border p-3 rounded mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Forgot password (login only) */}
        {isLogin && (
          <button className="text-blue-600 text-sm mb-4 hover:underline">
            Forgot password?
          </button>
        )}

        {/* Main Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mb-3"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {/* Google Sign-in */}
        <button
          onClick={onGoogle}
          className="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google Logo"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Switch between Login / Signup */}
        <div className="mt-4 text-center text-sm">
          {isLogin ? (
            <>
              New user?{" "}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Sign up!
              </button>
            </>
          ) : (
            <>
              Already a user?{" "}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </>
          )}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="mt-5 w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
