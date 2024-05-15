'use client'
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

// Step 2: Create a custom hook to access the context value
export const useAuth = () => useContext(AuthContext);

// Step 3: Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Set initial state to null
 const router = useRouter();
  useEffect(() => {
    // Check if email and password are stored in local storage
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    
    // If email and password exist, set user to true
    if (email && password) {
      setUser(true);
    router.push('/');
    } else {
      setUser(false);
    }
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
};
