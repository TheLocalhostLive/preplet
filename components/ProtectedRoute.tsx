import React, { useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

export default function ProtectedRoute({ children }: any) {
  const router = useRouter();
  const { loginStatus, loading, serverURL, setLoginStatus } =
    useContext(AuthContext);

  useEffect(() => {
    console.log(router.pathname);
    if (!loginStatus) {
      const token = router.query.token;
      if (router.pathname === "/Dashboard") {
        console.log(JSON.stringify({ token }));
        if (!token) {
          router.push("/Login");
        } else {
          fetch(serverURL + "/login/authtokenFromGoogleId", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ token }),
            credentials: "include",
          })
            .then(resp => {
              if (resp.status === 200 && resp.ok) {
                setLoginStatus(true);
                // console.log(login stat)
              } else {
                router.push("/Login");
              }

              console.log(resp);
            })
            .catch(err => {
              console.log(err);
              router.push("/Login");
            });
        }
      } else if (!loading) {
        router.push("/Login");
      }
    }
  }, [loading]);

  return <>{loginStatus ? children : null}</>;
}
