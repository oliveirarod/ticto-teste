import type { AppProps } from "next/app";
import "@/styles/reset.scss";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
