import { Link, useLocation } from "react-router-dom";
import { Compass, Menu, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import ThemeSelector from "./ThemeSelector";


export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Explore",
      path: "/explore",
    },
  ];

  return (
    <motion.nav
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 0.15,
      }}
      className="absolute left-0 right-0 top-0 z-[200]"
    >

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7">

        {/* LOGO */}

        <Link
          to="/"
          className="group flex items-center gap-3"
        >

          <motion.div
            whileHover={{
              rotate: 20,
              scale: 1.08,
            }}
            transition={{
              duration: 0.3,
            }}
            className="logo-mark"
          >
            <Compass size={17} />
          </motion.div>

          <span className="text-sm font-medium uppercase tracking-[0.2em]">
            TravelMate
          </span>

        </Link>


        {/* DESKTOP NAV */}

        <div className="hidden items-center gap-10 md:flex">

          {links.map((link) => {
            const active =
              location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link relative text-sm ${
                  active
                    ? "text-white"
                    : ""
                }`}
              >
                {link.name}

                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-2 left-0 right-0 h-px bg-white"
                  />
                )}
              </Link>
            );
          })}

          <a
            href="#planner"
            className="nav-link text-sm"
          >
            Plan
          </a>

          <a
            href="#journal"
            className="nav-link text-sm"
          >
            Journal
          </a>

          <ThemeSelector />

          {isAuthenticated ? (
            <div className="flex items-center gap-2">

              <Link
                to="/dashboard"
                className="group flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <UserRound
                  size={15}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>
                  {user?.name ? user.name : "My Account"}
                </span>
              </Link>

              <button
                onClick={logout}
                className="group flex items-center gap-2 rounded-full border border-red-400/20 px-4 py-2 text-sm text-red-300 transition-all duration-300 hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-200"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  ↪
                </span>

                <span>Logout</span>
              </button>

            </div>
          ) : (
            <Link
              to="/login"
              className="group flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <UserRound
                size={15}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span>Sign in</span>
            </Link>
          )}

        </div>


        {/* MOBILE */}

        <motion.button
          whileTap={{
            scale: 0.9,
          }}
          className="rounded-full border border-white/20 p-3 md:hidden"
        >
          <Menu size={18} />
        </motion.button>

      </div>

    </motion.nav>
  );
}
