import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import ToggleThemeButton from "./ToggleThemeButton.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="nav">
      <div className="brand">ClauseWise</div>
      <div className="links">
        {routes.map(r => (
          <Link key={r.path} to={r.path}>{r.label}</Link>
        ))}
      </div>
      <div className="actions">
        <ToggleThemeButton />
        {user ? (
          <button onClick={() => { logout(); nav("/"); }}>Sign out</button>
        ) : (
          <Link to="/login">Sign in</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;