import React from "react";

const ComparisonViewer = ({ differences, similarity }) => {
  return (
    <div>
      <div className="title">Similarity {similarity}%</div>
      <ul>
        {differences.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </div>
  );
};

export default ComparisonViewer;