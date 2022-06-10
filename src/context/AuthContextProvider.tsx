import { createContext, useContext, useEffect, useState } from "react";
import { loggedKey, tokenExpiryKey, tokenKey } from "../constants/constats";
import { ContextTypes, VideoContextProviderProps } from "../api/apiInterfaces";
import { fetchAnonymous, fetchLogged } from "../api/apiFunctions";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext<ContextTypes>({
  logged: false,
  loginAnnonymous: () => Promise.resolve(),
  loginWithPassword: () => Promise.resolve(),
  isLoggedAnyUser: false,
});

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: VideoContextProviderProps) => {
  const [tokenLs, setTokenLs] = useLocalStorage(tokenKey, null);
  const [tokenExpiryLs, setTokenExpiryLs] = useLocalStorage(
    tokenExpiryKey,
    null
  );
  const [loggedLs, setLoggedLs] = useLocalStorage(loggedKey, false);

  const isLoggedAnyUser = tokenLs ? true : false;

  const loginAnnonymous = () => {
    return fetchAnonymous().then((res) => {
      setTokenLs(res.AuthorizationToken.Token);
      setLoggedLs(false);
      setTokenExpiryLs(res.AuthorizationToken.TokenExpires);
    });
  };

  const loginWithPassword = (login: string, password: string) => {
    return fetchLogged(login, password).then((res) => {
      setTokenLs(res.AuthorizationToken.Token);
      setLoggedLs(true);
      setTokenExpiryLs(res.AuthorizationToken.TokenExpires);
    });
  };

  const isValidToken = () => {
    const expiryDate = tokenExpiryLs;
    if (expiryDate) {
      return new Date(expiryDate) >= new Date();
    } else {
      return false;
    }
  };
  const isValidTokenConst = isValidToken();
  console.log("is valid token, ", isValidToken());
  useEffect(() => {
    if (!isValidTokenConst) {
      localStorage.clear();
    }
  }, [isValidTokenConst]);

  // console.log(localStorage.getItem(tokenKey));

  return (
    <AuthContext.Provider
      value={{
        logged: loggedLs,
        loginWithPassword,
        loginAnnonymous,
        isLoggedAnyUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
