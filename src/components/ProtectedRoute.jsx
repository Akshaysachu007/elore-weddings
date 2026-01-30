import { onAuthStateChanged } from "firebase/auth";
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useState , useEffect  } from 'react';
import { auth } from "../firebase.js";

const ProtectedRoute = ({ children }) => {
    const [ User , setUser ] = useState (null);
    
    useEffect(() => {
    const unsubscribe = onAuthStateChanged( auth , (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); 
    }, []);
     if (User === undefined) return null;

   return User ? children : <Navigate to="/admin-dashboard" />;
   
};

export default ProtectedRoute;

