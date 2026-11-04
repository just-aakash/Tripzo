import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("travelmate_token")
  );

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("travelmate_user");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  });

  const login = (newToken, newUser) => {
    localStorage.setItem("travelmate_token", newToken);
    localStorage.setItem(
      "travelmate_user",
      JSON.stringify(newUser)
    );

    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("travelmate_token");
    localStorage.removeItem("travelmate_user");

    setToken(null);
    setUser(null);

    // Replace the current page instead of adding another
    // page to browser history.
    window.location.replace("/");
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
