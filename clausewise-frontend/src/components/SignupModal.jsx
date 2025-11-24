import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const SignupModal = ({ onSuccess }) => {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submit = async e => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      onSuccess();
    } catch (err) {
      setError("Signup failed");
    }
  };
  return (
    <form onSubmit={submit} className="modal">
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      {error && <div className="error">{error}</div>}
      <button type="submit">Create account</button>
    </form>
  );
};

export default SignupModal;