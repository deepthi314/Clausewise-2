import React, { useState } from "react";
import { fileService } from "../services/fileService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const UploadBox = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const nav = useNavigate();
  const { token } = useAuth();

  const submit = async e => {
    e.preventDefault();
    setError("");
    if (!file) return;
    try {
      const res = await fileService.upload(file);
      if (res.valid) nav(`/dashboard?doc=${res.documentId}`);
      else setError("Invalid document");
    } catch (err) {
      setError(err.message || "Upload failed");
    }
  };

  return (
    <form onSubmit={submit} className="upload">
      <input type="file" accept=".pdf,.docx,.txt" onChange={e => setFile(e.target.files[0])} disabled={!token} />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={!token}>Upload Legal Document</button>
      {!token && <div className="muted">Sign in to upload documents</div>}
    </form>
  );
};

export default UploadBox;
