import { Link, useNavigate } from "react-router-dom";
import { Compass, LogOut, UserRound } from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import ThemeSelector from "../../ThemeSelector";

export default function GenZNavigation() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed left-1/2 top-5 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2">
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/30 px-4 py-3 shadow-2xl backdrop-blur-2xl md:px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400">
            <Compass size={18} />
          </div>

          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            TravelMate
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-7 text-sm text-white/60 md:flex">
          <Link
            to="/"
            className="transition-colors hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/explore"
            className="transition-colors hover:text-white"
          >
            Explore
          </Link>
          <Link
            to="/plan">Plan</Link>

          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="transition-colors hover:text-white"
            >
              Dashboard
            </Link>
          )}

        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeSelector />

          {isAuthenticated ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              <LogOut size={15} />

              <span className="hidden sm:block">
                Logout
              </span>
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-transform duration-300 hover:scale-105"
            >
              <UserRound size={15} />

              <span>
                Sign in
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
