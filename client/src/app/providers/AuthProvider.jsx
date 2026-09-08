import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../../features/auth/auth.api";
import { authHydrated, authLogin, authLogout, authSessionExpired } from "../../features/auth/authSlice";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const restoreSession = useCallback(async () => {
    try {
      const result = await authApi.me();
      dispatch(result.success ? authLogin(result.data.user) : authHydrated());
      return result;
    } catch {
      dispatch(authHydrated());
      return null;
    }
  }, [dispatch]);

  useEffect(() => { restoreSession(); }, [restoreSession]);

  const login = useCallback(async (payload) => {
    const result = await authApi.login(payload);
    dispatch(authLogin(result.data.user));
    return result;
  }, [dispatch]);

  const signup = useCallback(async (payload) => {
    const result = await authApi.signup(payload);
    dispatch(authLogin(result.data.user));
    return result;
  }, [dispatch]);

  const logout = useCallback(async () => {
    try { await authApi.logout(); } finally { dispatch(authLogout()); }
  }, [dispatch]);

  const logoutAll = useCallback(async () => {
    try { await authApi.logoutAll(); } finally { dispatch(authLogout()); }
  }, [dispatch]);

  const expire = useCallback(() => dispatch(authSessionExpired()), [dispatch]);

  const value = useMemo(() => ({
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    login, signup, logout, logoutAll, restoreSession, expire
  }), [auth, login, signup, logout, logoutAll, restoreSession, expire]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
