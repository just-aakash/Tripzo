import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Menu, UserRound } from "lucide-react";
import { useState } from "react";

import { useAuth } from "../../../context/AuthContext";
import ThemeSelector from "../../ThemeSelector";

export default function MillenialNavigation() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-[#26332c]/10 bg-[#f3f0e7]">
      <div className="mx-auto max-w-7xl px-6">

        {/* Main navigation */}
        <div className="flex h-24 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center border border-[#26332c]/30 text-sm font-serif transition-transform duration-500 group-hover:rotate-45">
              T
            </div>

            <div>
              <p className="font-serif text-xl tracking-wide">
                TravelMate
              </p>

              <p className="hidden text-[9px] uppercase tracking-[0.3em] text-[#26332c]/45 sm:block">
                Travel Journal
              </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-10 md:flex">

            {/* Home */}
            <Link
              to="/"
              className="relative text-sm text-[#26332c]/65 transition-colors duration-300 hover:text-[#26332c]"
            >
              Home
            </Link>

            {/* Explore */}
            <Link
              to="/explore"
              className="relative text-sm text-[#26332c]/65 transition-colors duration-300 hover:text-[#26332c]"
            >
              Explore
            </Link>

            {/* Plan */}
            {isAuthenticated && (
              <Link
                to="/plan"
                className="relative text-sm text-[#26332c]/65 transition-colors duration-300 hover:text-[#26332c]"
              >
                Plan
              </Link>
            )}

            {/* Dashboard */}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="relative text-sm text-[#26332c]/65 transition-colors duration-300 hover:text-[#26332c]"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* Theme selector */}
            <ThemeSelector />

            {/* Authentication */}
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="hidden items-center gap-2 border-b border-[#26332c]/30 pb-1 text-sm text-[#26332c]/70 transition-colors hover:text-[#26332c] sm:flex"
              >
                <span>
                  {user?.name || "Account"}
                </span>

                <ArrowUpRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden items-center gap-2 border-b border-[#26332c]/40 pb-1 text-sm text-[#26332c]/80 transition-colors hover:border-[#26332c] hover:text-[#26332c] sm:flex"
              >
                <UserRound size={14} />

                Sign in
              </button>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center border border-[#26332c]/15 md:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="border-t border-[#26332c]/10 py-6 md:hidden">
            <nav className="flex flex-col gap-5">

              {/* Home */}
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="font-serif text-2xl"
              >
                Home
              </Link>

              {/* Explore */}
              <Link
                to="/explore"
                onClick={() => setMenuOpen(false)}
                className="font-serif text-2xl"
              >
                Explore
              </Link>

              {/* Plan */}
              {isAuthenticated && (
                <Link
                  to="/plan"
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-2xl"
                >
                  Plan
                </Link>
              )}

              {/* Dashboard */}
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-2xl"
                >
                  Dashboard
                </Link>
              )}

              {/* Authentication */}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="w-fit border-b border-[#26332c]/30 pb-1 text-left text-sm"
                >
                  Sign out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/login");
                  }}
                  className="w-fit border-b border-[#26332c]/30 pb-1 text-left text-sm"
                >
                  Sign in
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
