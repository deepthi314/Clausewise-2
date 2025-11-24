import React, { createContext, useContext, useState } from "react";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [selected, setSelected] = useState(null);
  return (
    <UserDataContext.Provider value={{ documents, setDocuments, selected, setSelected }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);