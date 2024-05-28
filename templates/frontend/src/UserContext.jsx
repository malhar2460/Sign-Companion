// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user_id, setUser_id] = useState(null);
  const [guest_id, setGuest_id] = useState(null);

  return (
    <UserContext.Provider value={{ user_id, guest_id, setUser_id, setGuest_id }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
