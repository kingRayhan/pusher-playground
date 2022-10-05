import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import AppContextProvider from "../AppContext";
import "../styles/globals.css";
import Layout from "./components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
      <Toaster />
    </Layout>
  );
}

export default MyApp;
