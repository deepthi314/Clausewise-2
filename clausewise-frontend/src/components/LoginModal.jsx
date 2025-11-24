import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const LoginModal = ({ onSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submit = async e => {
    e.preventDefault();
    try {
      await login(email, password);
      onSuccess();
    } catch (err) {
      setError("Invalid credentials");
    }
  };
  return (
    <form onSubmit={submit} className="modal">
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      {error && <div className="error">{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginModal;