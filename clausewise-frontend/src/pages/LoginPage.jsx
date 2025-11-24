import React, { useState } from "react";
import LoginModal from "../components/LoginModal.jsx";
import SignupModal from "../components/SignupModal.jsx";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const nav = useNavigate();
  const [mode, setMode] = useState("login");
  return (
    <div className="center">
      <div className="switcher">
        <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Login</button>
        <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Sign up</button>
      </div>
      {mode === "login" ? <LoginModal onSuccess={() => nav("/")} /> : <SignupModal onSuccess={() => nav("/")} />}
    </div>
  );
};

export default LoginPage;