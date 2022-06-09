import "../styles/globals.css";
import "../styles/index.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../context/AuthContext";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";

const protectedPages = [
  "/Dashboard",
  "/AdminDashboard",
  "/MockTest",
  "/JeletTopicWiseQuestions",
  "/JeletPYQs",
];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      {protectedPages.includes(router.pathname) ? (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
