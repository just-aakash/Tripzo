import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";

export default function GenZLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
const { setTheme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to sign in."
        );
      }

      login(data.token, data.user);
      if (data.user.experienceMode === "dynamic") {
        setTheme("genz");
      } else if (data.user.experienceMode === "classic") {
        setTheme("millennial");
      }


      navigate(
        location.state?.from || "/dashboard",
        { replace: true }
      );
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080811] text-white">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=85"
          alt="Travel landscape"
          className="h-full w-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-[#080811]/65" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#080811] via-[#080811]/60 to-transparent" />
      </div>

      {/* Ambient lights */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-violet-500/20 blur-[140px]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-28 lg:grid-cols-[1fr_480px]">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:block"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/45">
            <Sparkles size={14} />
            TravelMate
          </div>

          <h1 className="mt-8 max-w-3xl text-7xl font-black leading-[0.86] tracking-[-0.06em]">
            READY TO
            <br />
            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
              GO?
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-8 text-white/50">
            Your next destination is waiting.
            Sign in and start discovering places,
            experiences and journeys made for you.
          </p>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-[32px] border border-white/10 bg-black/35 p-7 shadow-2xl backdrop-blur-2xl md:p-9"
        >

          {/* Mobile heading */}
          <div className="mb-8 lg:hidden">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              TravelMate
            </p>

            <h1 className="mt-3 text-5xl font-black tracking-[-0.05em]">
              Let's go.
            </h1>
          </div>

          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-white/35">
              Welcome back
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Sign in to continue.
            </h2>
          </div>

          {location.state?.message && (
            <div className="mb-5 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-3 text-sm text-fuchsia-100">
              {location.state.message}
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/40">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-fuchsia-400/50 focus:bg-white/[0.09]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/40">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-violet-400/50 focus:bg-white/[0.09]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(255,255,255,0.15)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Let's go"}

              {!loading && (
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          <div className="my-7 h-px bg-white/10" />

          <p className="text-center text-sm text-white/40">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() =>
                navigate("/register", {
                  state: location.state,
                })
              }
              className="font-medium text-white transition-colors hover:text-fuchsia-300"
            >
              Create one
            </button>
          </p>

        </motion.div>
      </div>
    </main>
  );
}
