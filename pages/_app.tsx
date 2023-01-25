import type { NextComponentType } from "next";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { StoreProvider } from "easy-peasy";
import { store } from "../lib/store";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth: boolean };
};

export default function App({ Component, pageProps }: CustomAppProps) {
  return (
    <StoreProvider store={store}>
      {Component.auth ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </StoreProvider>
  );
}
