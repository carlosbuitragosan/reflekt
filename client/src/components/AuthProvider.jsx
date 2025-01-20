import React, { createContext, useContext, useState } from 'react';

// create a context to share state between components
const AuthContext = createContext();

//AutProvider wraps around the app so user is available for all children
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

//instead of writing useContext(AuthContext) when it's needed simply use useAuth()
export const useAuth = () => useContext(AuthContext);
