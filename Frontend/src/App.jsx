import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Destination from "./pages/Destination";
import Dashboard from "./pages/Dashboard";
import Plan from "./pages/Plan";

import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes
          location={location}
          key={location.pathname}
        >

          {/* HOME */}
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Dashboard />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          {/* EXPLORE */}
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Explore />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          {/* PLAN */}
          <Route
            path="/plan"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Plan />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          {/* DESTINATION */}
          <Route
            path="/destination/:name"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Destination />
                </PageTransition>
              </ProtectedRoute>
            }
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <PageTransition>
                  <Login />
                </PageTransition>
              </PublicOnlyRoute>
            }
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={
              <PublicOnlyRoute>
                <PageTransition>
                  <Register />
                </PageTransition>
              </PublicOnlyRoute>
            }
          />

        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
