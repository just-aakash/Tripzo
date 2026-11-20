import { useEffect, useState } from "react";
import "./Preloader.css";

export default function Preloader() {
  const [isDone, setIsDone] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Start exit transition after animation completes
    const exitTimer = setTimeout(() => {
      setIsDone(true);
    }, 2350);

    // Unmount from DOM after exit transition
    const unmountTimer = setTimeout(() => {
      setMounted(false);
    }, 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      id="tripzo-preloader"
      className={`tripzo-preloader ${isDone ? "is-done" : ""}`}
      role="status"
      aria-label="Loading Tripzo"
    >
      <div className="tripzo-loader-stage">
        <div className="tripzo-brand-lockup">
          {/* T-Arrow SVG mark matching Tripzo brand */}
          <svg
            className="tripzo-brand-mark"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="tripzoUiGrad"
                x1="8"
                y1="14"
                x2="72"
                y2="68"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#34F5A4" />
                <stop offset="50%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#D946EF" />
              </linearGradient>
            </defs>
            {/* Vertical stem */}
            <path
              className="tripzo-mark-stem"
              d="M29 36.5L46 31.5V65.5C46 68.8 42.3 70.8 39.5 69L30.8 63.3C29.7 62.6 29 61.3 29 60V36.5Z"
              fill="url(#tripzoUiGrad)"
            />
            {/* Sweeping top route arrow */}
            <path
              className="tripzo-mark-arrow"
              d="M12.5 28.5C9.4 29.4 7.5 32.5 8.1 35.7L9.3 41.2C10 44.3 13.1 46.2 16.1 45.2L54.8 32.8L57.5 39.5C58.2 41.2 60.6 41.2 61.4 39.6L71.6 18.8C72.4 17.1 71.1 15.1 69.2 15.2L46.4 16.5C44.6 16.6 43.6 18.7 44.7 20.1L48.5 24.8L12.5 28.5Z"
              fill="url(#tripzoUiGrad)"
            />
          </svg>

          {/* Wordmark with animated rising letters */}
          <div className="tripzo-brand-wordmark" aria-label="tripzo">
            <span style={{ "--i": 0 }}>t</span>
            <span style={{ "--i": 1 }}>r</span>
            <span style={{ "--i": 2 }}>i</span>
            <span style={{ "--i": 3 }}>p</span>
            <span style={{ "--i": 4 }}>z</span>
            <span style={{ "--i": 5 }}>o</span>
          </div>
        </div>

        {/* Progress line */}
        <div className="tripzo-loader-track">
          <div className="tripzo-loader-bar" />
        </div>
      </div>
    </div>
  );
}
