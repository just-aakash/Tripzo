import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";

export default function MillenialLogin() {
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
    <main className="min-h-screen bg-[#f3f0e7] text-[#26332c]">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* IMAGE */}
        <div className="relative hidden min-h-screen overflow-hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85"
            alt="Travel landscape"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#26332c]/20" />

          <div className="absolute bottom-12 left-12 right-12 text-white">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">
              TravelMate · Travel Journal
            </p>

            <h1 className="mt-5 max-w-xl font-serif text-6xl leading-[0.9]">
              Go somewhere
              <br />
              worth remembering.
            </h1>

            <p className="mt-6 max-w-md text-sm leading-6 text-white/75">
              Discover destinations with a little more
              intention.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="flex items-center justify-center px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md"
          >

            <div className="mb-16">
              <button
                onClick={() => navigate("/")}
                className="font-serif text-2xl"
              >
                TravelMate
              </button>

              <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#26332c]/40">
                Travel Journal
              </p>
            </div>

            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#26332c]/40">
                Welcome back
              </p>

              <h2 className="mt-4 font-serif text-5xl leading-none">
                Sign in.
              </h2>

              <p className="mt-5 text-sm leading-6 text-[#26332c]/50">
                Continue discovering places worth going to.
              </p>
            </div>

            {location.state?.message && (
              <div className="mb-6 border-l-2 border-[#b49a62] bg-[#ebe7dc] px-4 py-3 text-sm text-[#26332c]/70">
                {location.state.message}
              </div>
            )}

            {error && (
              <div className="mb-6 border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#26332c]/40">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  className="w-full border-b border-[#26332c]/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#26332c]/25 focus:border-[#26332c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#26332c]/40">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Your password"
                  className="w-full border-b border-[#26332c]/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#26332c]/25 focus:border-[#26332c]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex items-center gap-3 border-b border-[#26332c]/50 pb-2 text-sm uppercase tracking-[0.18em] transition-all hover:border-[#26332c] disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}

                {!loading && (
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                )}
              </button>
            </form>

            <div className="mt-12 border-t border-[#26332c]/15 pt-7">
              <p className="text-sm text-[#26332c]/50">
                New to TravelMate?
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/register", {
                    state: location.state,
                  })
                }
                className="mt-2 font-serif text-xl underline decoration-[#26332c]/20 underline-offset-4 transition-colors hover:decoration-[#26332c]"
              >
                Create an account
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </main>
  );
}
