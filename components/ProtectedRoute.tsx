import React, { useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function ProtectedRoute({ children }: any) {
  const router = useRouter();
  const { loginStatus, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !loginStatus) {
      router.push("/Login");
    }
  }, [loading]);

  return <>{loginStatus ? children : null}</>;
}
