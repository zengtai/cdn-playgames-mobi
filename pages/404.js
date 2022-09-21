import * as React from "react";
import { Link } from "next/link";
import Layout from "../components/Layout";

const Custom404 = () => {
  return (
    <Layout title={`404`}>
      <div className="m-4 flex flex-col items-center">
        <p className="p-4 border rounded-lg text-slate-500 text-sm">
          Oops! Page Not Found.
        </p>
      </div>
    </Layout>
  );
};

export default Custom404;
