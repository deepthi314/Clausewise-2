import React from "react";

const FairnessChart = ({ metrics }) => {
  return (
    <div className="grid">
      {Object.entries(metrics).map(([k, v]) => (
        <div key={k} className="row">
          <div>{k}</div>
          <div>{v}</div>
        </div>
      ))}
    </div>
  );
};

export default FairnessChart;