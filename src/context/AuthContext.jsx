import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase/client";




export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false)
  //wether we have a user or not
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      


      if (event === "SIGNED_IN") {
        
        setCurrentUser(session);
      
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser,loading,setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
