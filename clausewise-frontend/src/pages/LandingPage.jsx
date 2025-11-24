import React from "react";
import UploadBox from "../components/UploadBox.jsx";

const LandingPage = () => {
  return (
    <div className="hero">
      <div className="headline">Analyze Legal Documents in Seconds</div>
      <UploadBox />
      <div className="muted">ClauseWise provides analysis only. Consult a lawyer for legal advice.</div>
    </div>
  );
};

export default LandingPage;