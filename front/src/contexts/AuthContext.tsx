import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UserInfo = {
  name: string;
  iconUrl: "string" | undefined;
};

export type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  signUp: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  fetchUserInfo: () => Promise<void>;
  updateUserProfile: (name: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const API_URL = "http://localhost:3000";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const storedUserInfo = sessionStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });

  const navigate = useNavigate();

  const fetchUserInfo = useCallback(async () => {
    if (!token) {
      setUserInfo(null);
      sessionStorage.removeItem("userInfo");
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const newUserInfo: UserInfo = {
        name: response.data.name,
        iconUrl: response.data.iconUrl,
      };
      setUserInfo(newUserInfo);
      sessionStorage.setItem("userInfo", JSON.stringify(newUserInfo));
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      setUserInfo(null);
      sessionStorage.removeItem("userInfo");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      // fetchUserInfo();
    } else {
      localStorage.removeItem("token");
      sessionStorage.removeItem("userInfo");
      setUserInfo(null);
    }
  }, [token, fetchUserInfo]);

  const signUp = async (name: string, email: string, password: string, password_confirmation: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/users`,
        {
          name,
          email,
          password,
          password_confirmation
        },
      );
      const newToken = response.data.token;
      setToken(newToken);
    } catch (error) {
      console.error("Sign up failed:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/users/login`,
        {
          email,
          password,
        },
      );
      const newToken = response.data.token;
      setToken(newToken);
    } catch (error) {
      console.error("Sign in failed:", error);
      throw error;
    }
  };

  // 後でやる
  const signOut = () => {
    setToken(null);
    setUserInfo(null);
    localStorage.removeItem("token");
    sessionStorage.removeItem("userInfo");
    navigate("/login");
  };

  

  const updateUserProfile = async (name: string) => {
    if (!token) {
      throw new Error("認証されていません。");
    }
    try {
      const response = await axios.put(
        `${API_URL}/users`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const newUserInfo: UserInfo = {
        name: response.data.name,
        iconUrl: userInfo?.iconUrl,
      };
      setUserInfo(newUserInfo);
      sessionStorage.setItem("userInfo", JSON.stringify(newUserInfo));
    } catch (error) {
      console.error("Update Failed: ", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isAuthenticated: !!token,
        userInfo,
        signUp,
        signIn,
        signOut,
  
        fetchUserInfo,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// カスタムフックの作成
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}