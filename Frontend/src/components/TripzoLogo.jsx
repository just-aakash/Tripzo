export default function TripzoLogo({
  iconSize = 30,
  textColor = "text-white",
  showText = true,
  className = "",
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Precision Vector T-Arrow Icon */}
      <svg
        style={{ width: iconSize, height: iconSize }}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient
            id="tripzoBrandGradient"
            x1="8"
            y1="14"
            x2="72"
            y2="68"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#34F5A4" />
            <stop offset="55%" stopColor="#14CFA8" />
            <stop offset="100%" stopColor="#059B9A" />
          </linearGradient>
        </defs>
        {/* Vertical stem */}
        <path
          d="M29 36.5L46 31.5V65.5C46 68.8 42.3 70.8 39.5 69L30.8 63.3C29.7 62.6 29 61.3 29 60V36.5Z"
          fill="url(#tripzoBrandGradient)"
        />
        {/* Sweeping top route arrow */}
        <path
          d="M12.5 28.5C9.4 29.4 7.5 32.5 8.1 35.7L9.3 41.2C10 44.3 13.1 46.2 16.1 45.2L54.8 32.8L57.5 39.5C58.2 41.2 60.6 41.2 61.4 39.6L71.6 18.8C72.4 17.1 71.1 15.1 69.2 15.2L46.4 16.5C44.6 16.6 43.6 18.7 44.7 20.1L48.5 24.8L12.5 28.5Z"
          fill="url(#tripzoBrandGradient)"
        />
      </svg>

      {/* Styled brand wordmark */}
      {showText && (
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontStyle: "italic",
            fontWeight: 800,
            fontSize: "1.45rem",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
          className={`${textColor} lowercase select-none`}
        >
          tripzo
        </span>
      )}
    </div>
  );
}
