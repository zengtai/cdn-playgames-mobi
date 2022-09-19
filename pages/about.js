import { Link } from "gatsby";
import Head from "next/head";
import * as React from "react";
import { IconArrowRight } from "../components/Icons";
import Layout from "../components/Layout";

const AboutPage = () => {
  // console.log(data);

  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 px-4 py-12 text-center text-white">
        <h1 className="text-xl font-bold drop-shadow">Site Name</h1>
        <p className="text-sm drop-shadow">Play Free Games Online</p>
      </div>
      <ul className="m-4 grid gap-2 text-sm">
        <li>
          <Link
            className="flex items-center justify-between rounded-lg border bg-white p-3"
            to={`/privacy-policy`}
          >
            <span>Privacy Policy</span>
            <IconArrowRight className={`text-gray-400`} />
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center justify-between rounded-lg  border bg-white p-3"
            to={`/terms-of-use`}
          >
            <span>Terms of Use</span>
            <IconArrowRight className={`text-gray-400`} />
          </Link>
        </li>
      </ul>
    </Layout>
  );
};

export default AboutPage;
