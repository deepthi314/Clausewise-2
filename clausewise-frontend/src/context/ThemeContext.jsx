import React, { createContext, useContext, useEffect, useState } from "react";
import { themes } from "../theme";
import { useAuth } from "./AuthContext.jsx";
import { api } from "../services/api";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { user } = useAuth();
  const [mode, setMode] = useState("dark");
  const theme = mode === "dark" ? themes.dark : themes.light;

  useEffect(() => {
    const saved = localStorage.getItem("cw_theme");
    if (saved) setMode(saved);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = theme.bg;
    document.body.style.color = theme.text;
  }, [theme]);

  const toggle = async () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("cw_theme", next);
    if (user) {
      try {
        await api.put("/auth/preferences/theme", { theme: next });
      } catch {}
    }
  };

  return (
    <ThemeContext.Provider value={{ mode, theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);