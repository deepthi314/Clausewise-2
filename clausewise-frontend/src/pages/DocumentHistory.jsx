import React, { useEffect, useState } from "react";
import { fileService } from "../services/fileService";
import DocumentCard from "../components/DocumentCard.jsx";
import { useNavigate } from "react-router-dom";

const DocumentHistory = () => {
  const [docs, setDocs] = useState([]);
  const nav = useNavigate();
  useEffect(() => { fileService.list().then(r => setDocs(r.documents || [])); }, []);
  return (
    <div className="list">
      {docs.map(d => <DocumentCard key={d.id} doc={d} onOpen={() => nav(`/dashboard?doc=${d.id}`)} />)}
    </div>
  );
};

export default DocumentHistory;