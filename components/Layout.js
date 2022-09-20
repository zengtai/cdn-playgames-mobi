import * as React from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";
import { SITE_META } from "../lib/constants";

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title ? title + ` | ` + SITE_META.NAME : SITE_META.NAME}</title>
      </Head>
      <div className="flex min-h-screen flex-col gap-4 bg-slate-50">
        <Navbar />
        <main className="grow">
          <div className="container mx-auto">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}
