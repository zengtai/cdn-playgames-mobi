import Link from "next/link";

import { IconArrowRight } from "../components/Icons";
import Layout from "../components/Layout";
import { SITE_META } from "../lib/constants";

const AboutPage = () => {
  // console.log(data);

  return (
    <Layout title={`About`}>
      <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 px-4 py-12 text-center text-white">
        <h1 className="text-xl font-bold drop-shadow">{SITE_META.NAME}</h1>
        <p className="text-sm drop-shadow">Play Online Games for Free</p>
      </div>
      <ul className="m-4 grid gap-2 text-sm">
        <li>
          <Link href={`/privacy-policy`}>
            <a className="flex items-center justify-between rounded-lg border bg-white p-3">
              <span>Privacy Policy</span>
              <IconArrowRight className={`text-gray-400`} />
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/terms-of-use`}>
            <a className="flex items-center justify-between rounded-lg  border bg-white p-3">
              <span>Terms of Use</span>
              <IconArrowRight className={`text-gray-400`} />
            </a>
          </Link>
        </li>
      </ul>
    </Layout>
  );
};

export default AboutPage;
