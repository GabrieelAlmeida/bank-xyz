import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import authService from "../services/auth.service";
import {
  loginUserFormData,
  User,
  UserLoginResponse,
} from "../interfaces/user.interface";
import axios from "axios";

interface AuthContextProps {
  user: User | null;
  authToken: string | null;
  isAuthenticated: boolean;
  login: (user: loginUserFormData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies();

  useLayoutEffect(() => {
    const authRequestInterceptor = axios.interceptors.request.use(
      (config: any) => {
        config.headers.Authorization =
          !config?._retry && cookies?.user?.token
            ? `Bearer ${cookies?.user?.token}`
            : config.headers.Authorization;

        return config;
      },
    );

    console.log(cookies?.user?.token);

    return () => {
      axios.interceptors.request.eject(authRequestInterceptor);
    };
  }, [authToken]);

  const login = useCallback(async (user: loginUserFormData) => {
    try {
      const userLogged: UserLoginResponse = await authService.user.login(user);

      setUser(userLogged?.user);
      setAuthToken(userLogged?.token);
      setCookie("user", userLogged, { path: "/" });
    } catch (error) {
      throw new Error(`Login failed: ${error}`);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setAuthToken(null);
    removeCookie("authToken");
    removeCookie("user");
  }, []);

  const authContextProviderValue = {
    user,
    authToken,
    isAuthenticated: !!cookies?.user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
