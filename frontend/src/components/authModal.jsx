import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "farmer",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "farmer",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const { data } = await API.post("/auth/login", {
          email: form.email,
          password: form.password,
          role: form.role,
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        alert("Login Successful 🔓");
        onClose();
      } else {
        if (form.password !== form.confirmPassword) {
          return alert("Passwords match nahi kar rahe ❌");
        }

        await API.post("/auth/signup", {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        });

        alert("Signup Successful ✅");
        setIsLogin(true);
        resetForm();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.3 }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6"
            >
              {/* CLOSE */}
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-white float-right text-lg"
              >
                ✕
              </button>

              {/* TITLE */}
              <h2 className="text-2xl font-bold text-white text-center mt-2">
                {isLogin ? "Welcome Back 🔓" : "Create Account 🚀"}
              </h2>

              {/* ROLE */}
              <div className="flex gap-2 mt-5">
                {["farmer", "buyer"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm({ ...form, role: r })}
                    className={`w-full py-2 rounded-lg font-semibold transition ${
                      form.role === r
                        ? "bg-emerald-500 text-black"
                        : "bg-zinc-800 text-white hover:bg-zinc-700"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">

                {!isLogin && (
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                )}

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />

                {!isLogin && (
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-semibold transition"
                >
                  {isLogin ? "Login" : "Signup"}
                </button>
              </form>

              {/* TOGGLE */}
              <p className="text-sm text-zinc-400 text-center mt-5">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-emerald-400 cursor-pointer hover:underline"
                >
                  {isLogin ? "Signup" : "Login"}
                </span>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;