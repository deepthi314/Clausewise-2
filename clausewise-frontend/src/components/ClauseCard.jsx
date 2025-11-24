import React from "react";

const ClauseCard = ({ clause }) => {
  return (
    <div className="card">
      <div className="title">{clause.category}</div>
      <div>{clause.text}</div>
      {clause.simplified && <div className="muted">{clause.simplified}</div>}
    </div>
  );
};

export default ClauseCard;