import * as React from "react";

export default function Footer(params) {
  return (
    <footer className="site-footer mb-20 text-xs leading-5 text-slate-400">
      <div className="container mx-auto border-t">
        <p className="p-4 text-center">
          {`Copyright © ${new Date().getFullYear()}`} Site Name <br />
          All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
