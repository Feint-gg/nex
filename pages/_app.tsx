import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider attribute="class">
    <Layout>
      <Component {...pageProps} />
      <Toaster toastOptions={{
        className: "bg-primary-100 p-2 border text-white",
      }} />
    </Layout>
  </ThemeProvider>;
}

export default MyApp;
