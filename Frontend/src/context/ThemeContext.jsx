import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext();

const THEMES = {
  genz: {
    name: "Gen Z",
    description: "Bold, colorful & energetic",
  },

  millennial: {
    name: "Millenial",
    description: "Elegant, minimal & refined",
  },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("travelmate_theme");

    // Only accept valid saved themes.
    if (savedTheme === "genz" || savedTheme === "millennial") {
      return savedTheme;
    }

    // DEFAULT THEME
    return "genz";
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem(
      "travelmate_theme",
      theme
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "genz"
        ? "millennial"
        : "genz"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        themes: THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
