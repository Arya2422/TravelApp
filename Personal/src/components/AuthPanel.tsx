import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import closeIcon from "@/assets/icons/close.png";
import authImage from "@/assets/travel.jpg";
import { registerUser, loginUser } from "@/api/auth";
import type { AuthPanelProps } from "@/types/auth";


const AuthPanel = ({ show, onClose, onLoginSuccess }: AuthPanelProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ 
      ...form, 
      [e.target.type === "email" ? "email" : e.target.type === "password" ? "password" : "name"]: e.target.value 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let data;
      if (isLogin) {
        data = await loginUser(form.email, form.password);
      } else {
        data = await registerUser(form.name, form.email, form.password);
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      onLoginSuccess?.({ name: data.user.name });

      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="relative bg-white rounded-2xl shadow-2xl flex flex-col sm:flex-row overflow-hidden w-[90%] max-w-5xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            {/* Left Image */}
            <div className="hidden sm:block sm:w-1/2 bg-gray-100">
              <img src={authImage} alt="Auth" className="h-full w-full object-cover" />
            </div>

            {/* Right Auth Panel */}
            <div className="w-full sm:w-1/2 p-6 sm:p-10 relative">
              <button onClick={onClose} className="absolute top-4 right-4 hover:opacity-70 transition">
                <img src={closeIcon} alt="Close" width={22} />
              </button>

              <h2 className="text-2xl font-semibold text-center mb-8 mt-6">
                {isLogin ? "Log in to Your Account" : "Create an Account"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div>
                    <label className="block text-sm mb-1 font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm mb-1 font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Please wait..." : isLogin ? "Continue" : "Sign Up"}
                </button>

                <div className="relative flex items-center justify-center my-4">
                  <div className="border-t border-gray-300 w-full"></div>
                  <span className="bg-white px-3 text-gray-500 text-sm absolute">or</span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-2 border py-2.5 rounded-lg hover:bg-gray-50 transition"
                >
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google"
                    width={20}
                  />
                  <span className="font-medium">Continue with Google</span>
                </button>
              </form>

              <p className="text-center text-sm mt-8 text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                  className="text-blue-600 font-medium hover:underline"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthPanel;