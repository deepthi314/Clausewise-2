import React from "react";

const RiskGraph = ({ score }) => {
  const width = 200;
  const height = 16;
  const pct = Math.max(0, Math.min(100, score));
  return (
    <svg width={width} height={height}>
      <rect x="0" y="0" width={width} height={height} fill="#1f2937" />
      <rect x="0" y="0" width={(pct / 100) * width} height={height} fill={pct > 66 ? "#ef4444" : pct > 33 ? "#f59e0b" : "#10b981"} />
    </svg>
  );
};

export default RiskGraph;