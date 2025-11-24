import React from "react";
import ToggleThemeButton from "../components/ToggleThemeButton.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Settings = () => {
  const { user } = useAuth();
  return (
    <div className="settings">
      <div>User {user?.email}</div>
      <ToggleThemeButton />
    </div>
  );
};

export default Settings;