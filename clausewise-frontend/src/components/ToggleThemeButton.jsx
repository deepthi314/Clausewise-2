import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";

const ToggleThemeButton = () => {
  const { mode, toggle } = useTheme();
  return <button onClick={toggle}>{mode === "dark" ? "Light" : "Dark"}</button>;
};

export default ToggleThemeButton;