import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";

export default function MillenialRegister() {
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
    <main className="min-h-screen bg-[#f3f0e7] text-[#26332c]">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* IMAGE */}
        <div className="relative hidden min-h-screen overflow-hidden lg:block lg:order-2">

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
              Begin with a place
              <br />
              you've never seen.
            </h1>

            <p className="mt-6 max-w-md text-sm leading-6 text-white/75">
              Tell us a little about yourself.
              We'll take it from there.
            </p>

          </div>
        </div>

        {/* FORM */}
        <div className="flex items-center justify-center px-6 py-24 lg:order-1">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md"
          >

            <div className="mb-12">

              <button
                type="button"
                onClick={() => navigate("/")}
                className="font-serif text-2xl"
              >
                TravelMate
              </button>

              <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#26332c]/40">
                Travel Journal
              </p>

            </div>

            <div className="mb-9">

              <p className="text-[10px] uppercase tracking-[0.3em] text-[#26332c]/40">
                Begin your journey
              </p>

              <h2 className="mt-4 font-serif text-5xl leading-none">
                Create an account.
              </h2>

              <p className="mt-5 text-sm leading-6 text-[#26332c]/50">
                A little information helps us make your
                TravelMate experience more personal.
              </p>

            </div>

            {error && (
              <div className="mb-6 border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >

              {/* Name */}
              <div>

                <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#26332c]/40">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border-b border-[#26332c]/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#26332c]/25 focus:border-[#26332c]"
                />

              </div>

              {/* Email */}
              <div>

                <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#26332c]/40">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border-b border-[#26332c]/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#26332c]/25 focus:border-[#26332c]"
                />

              </div>

              {/* Age */}
              <div>

                <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#26332c]/40">
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
                  className="w-full border-b border-[#26332c]/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#26332c]/25 focus:border-[#26332c]"
                />

              </div>

              {/* Password */}
              <div>

                <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#26332c]/40">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className="w-full border-b border-[#26332c]/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#26332c]/25 focus:border-[#26332c]"
                />

              </div>

              {/* Experience */}
              <div>

                <label className="mb-3 block text-[10px] uppercase tracking-[0.25em] text-[#26332c]/40">
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
                className="group flex items-center gap-3 border-b border-[#26332c]/50 pb-2 text-sm uppercase tracking-[0.18em] transition-all hover:border-[#26332c] disabled:opacity-50"
              >

                {loading
                  ? "Creating account..."
                  : "Create account"}

                {!loading && (
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                )}

              </button>

            </form>

            <div className="mt-10 border-t border-[#26332c]/15 pt-7">

              <p className="text-sm text-[#26332c]/50">
                Already have an account?
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/login", {
                    state: location.state,
                  })
                }
                className="mt-2 font-serif text-xl underline decoration-[#26332c]/20 underline-offset-4 transition-colors hover:decoration-[#26332c]"
              >
                Sign in
              </button>

            </div>

          </motion.div>

        </div>

      </div>

    </main>
  );
}
