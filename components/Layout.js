import * as React from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col gap-4 bg-slate-50">
      <Navbar />
      <main className="grow">
        <div className="container mx-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
