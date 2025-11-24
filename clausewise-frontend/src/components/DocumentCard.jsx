import React from "react";

const DocumentCard = ({ doc, onOpen }) => {
  return (
    <div className="card">
      <div className="title">{doc.name}</div>
      <div>{doc.type}</div>
      <div>{new Date(doc.createdAt).toLocaleString()}</div>
      <button onClick={onOpen}>Open</button>
    </div>
  );
};

export default DocumentCard;