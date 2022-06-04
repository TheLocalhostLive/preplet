import { useRouter } from "next/router";
import { useState, createContext, useEffect } from "react";
import axios from "axios";

interface AuthContextInterface {
  loading: boolean;
  loginStatus: boolean;
  setLoginStatus: any;
  serverURL: string | undefined;
}

const defaultAuthValues = {
  loading: true,
  loginStatus: false,
  setLoginStatus: null,
  serverURL: "",
};

export const AuthContext =
  createContext<AuthContextInterface>(defaultAuthValues);

function AuthContextProvider(props: any) {
  const [loginStatus, setLoginStatus] = useState(false);

  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

  const [loading, setLoading] = useState(true);

  async function getLoginStatus() {
    try {
      const res = await fetch(serverURL + "/login/status", {
        credentials: "include",
      });
      console.log(res);
      const result = await res.json();
      return result.loginStatus;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  useEffect(() => {
    getLoginStatus().then(status => {
      setLoginStatus(status);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ loading, loginStatus, setLoginStatus, serverURL }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
