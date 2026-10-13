import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";

export default function GenZRegister() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();
  const { setTheme } = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    experienceMode: "dynamic",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleExperienceChange(mode) {
    setForm((current) => ({
      ...current,
      experienceMode: mode,
    }));

    if (mode === "dynamic") {
      setTheme("genz");
    } else if (mode === "classic") {
      setTheme("millennial");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.age
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const age = Number(form.age);

    if (age < 13 || age > 100) {
      setError("Age must be between 13 and 100.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
            age,
            experienceMode: form.experienceMode,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to create your account."
        );
      }

      // Save login information
      login(data.token, data.user);

      // Restore the selected theme from the account
      if (data.user.experienceMode === "dynamic") {
        setTheme("genz");
      } else if (data.user.experienceMode === "classic") {
        setTheme("millennial");
      }

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong. Please try again."
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
          src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=2200&q=85"
          alt="Travel destination"
          className="h-full w-full object-cover opacity-35"
        />

        <div className="absolute inset-0 bg-[#080811]/75" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#080811] via-[#080811]/75 to-[#080811]/40" />
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[140px]" />

      <div className="pointer-events-none absolute -right-20 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-[150px]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-[1fr_520px]">

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
            YOUR NEXT
            <br />
            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
              ADVENTURE.
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-8 text-white/50">
            Create your TravelMate account and start
            discovering places that match the way you
            want to travel.
          </p>
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-[32px] border border-white/10 bg-black/40 p-7 shadow-2xl backdrop-blur-2xl md:p-9"
        >

          {/* Mobile heading */}
          <div className="mb-8 lg:hidden">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              TravelMate
            </p>

            <h1 className="mt-3 text-5xl font-black tracking-[-0.05em]">
              Start exploring.
            </h1>
          </div>

          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-white/35">
              New here?
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Create your account.
            </h2>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/40">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-fuchsia-400/50 focus:bg-white/[0.09]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/40">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-violet-400/50 focus:bg-white/[0.09]"
              />
            </div>

            {/* Age */}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/40">
                Age
              </label>

              <input
                type="number"
                name="age"
                min="13"
                max="100"
                value={form.age}
                onChange={handleChange}
                placeholder="Your age"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-cyan-400/50 focus:bg-white/[0.09]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/40">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-fuchsia-400/50 focus:bg-white/[0.09]"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="mb-3 block text-xs uppercase tracking-[0.18em] text-white/40">
                Travel experience
              </label>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() =>
                    handleExperienceChange("dynamic")
                  }
                  className={`experience-option ${
                    form.experienceMode === "dynamic"
                      ? "experience-active"
                      : ""
                  }`}
                >
                  Dynamic
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleExperienceChange("classic")
                  }
                  className={`experience-option ${
                    form.experienceMode === "classic"
                      ? "experience-active"
                      : ""
                  }`}
                >
                  Classic
                </button>

              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(255,255,255,0.15)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Creating account..."
                : "Create account"}

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
            Already have an account?{" "}

            <button
              type="button"
              onClick={() =>
                navigate("/login", {
                  state: location.state,
                })
              }
              className="font-medium text-white transition-colors hover:text-fuchsia-300"
            >
              Sign in
            </button>
          </p>

        </motion.div>
      </div>
    </main>
  );
}
