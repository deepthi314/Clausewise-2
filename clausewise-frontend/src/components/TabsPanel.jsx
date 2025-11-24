import React from "react";

const TabsPanel = ({ tabs, active, onChange }) => {
  return (
    <div>
      <div className="tabs">
        {tabs.map(t => (
          <button key={t} className={active === t ? "active" : ""} onClick={() => onChange(t)}>{t}</button>
        ))}
      </div>
    </div>
  );
};

export default TabsPanel;