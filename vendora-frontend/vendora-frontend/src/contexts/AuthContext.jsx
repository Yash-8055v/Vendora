import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { ROLES } from "@/constants";

const AuthContext = createContext(undefined);

/**
 * AuthProvider holds the current session in memory (and mirrors the token to
 * localStorage so refreshes survive). The actual login/register/logout
 * network calls live in services/authService.js — this context only owns
 * client-side state.
 *
 * TODO: Backend integration — replace the mock `login`/`logout` bodies with
 * real calls into authService once the auth API contract is confirmed.
 * Do not invent request/response shapes ahead of that.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(false);

  const isAuthenticated = Boolean(user);
  const role = user?.role ?? ROLES.GUEST;

  const login = useCallback((userData, token) => {
    if (token) {
      localStorage.setItem("vendora_token", token);
    }
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("vendora_token");
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      role,
      isAuthenticated,
      isInitializing,
      login,
      logout,
      setUser,
    }),
    [user, role, isAuthenticated, isInitializing, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
