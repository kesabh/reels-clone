import React, { useState, useEffect } from "react";
import firebaseAuth from "../config/firebase";

export let AuthContext = React.createContext();

export function AuthProvider({ children }) {
  let [currentUser, setCurrentUser] = useState(null);
  function login(email, password) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  function signUp(email, password) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password) ; 
  }

  function signOut() {
    return firebaseAuth.signOut();
  }

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(function (user) {
      setCurrentUser(user);
      console.log("auth state changed !!! ");
    });
  }, []);

  let value = {
    currentUser: currentUser,
    login: login,
    signUp: signUp,
    signOut: signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
