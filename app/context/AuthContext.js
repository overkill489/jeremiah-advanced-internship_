"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, value }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useLogin() {
  return useContext(AuthContext);
}
