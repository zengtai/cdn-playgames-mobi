import "../styles/globals.css";
import "../public/nprogress.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { GA_ID } from "../lib/constants";
import * as gtag from "../lib/gtag";
import NProgress from "nprogress";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleStop = (url) => {
      gtag.pageview(url);
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <meta name="google" content="notranslate" />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          sizes="16x16"
          type="image/x-icon"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.png`}
          sizes="16x16 32x32 64x64"
          type="image/png"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.svg`}
          sizes="any"
          type="image/svg+xml"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
