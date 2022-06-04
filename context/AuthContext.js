import { useRouter } from "next/router";
import { useState, createContext, useEffect } from "react";

export const AppContext = createContext();

function AppContextProvider(props) {
  const [loginStatus, setLoginStatus] = useState(false);

  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(serverURL);
    setLoginStatus(true);
    console.log("logged in");
    setLoading(false);
  });

  return (
    <AppContext.Provider value={{ loading, loginStatus, setLoginStatus }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
