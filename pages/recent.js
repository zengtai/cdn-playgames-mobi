import * as React from "react";

import { games } from "../data/games";
import Layout from "../components/Layout";
import List from "../components/List";

const RecentPage = () => {
  // console.log(data);

  return (
    <Layout>
      <h1 className="m-4 flex justify-center text-xl font-bold text-cyan-600">
        <span>Recently Played</span>
      </h1>

      <List items={games.slice(0, 2)} />
    </Layout>
  );
};
export const Head = () => <title>Recent Played</title>;
export default RecentPage;
