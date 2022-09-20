import * as React from "react";
import Layout from "../components/Layout";
import List from "../components/List";
// import { games } from "../data/games";
import { categories } from "../data/categories";
import Banner from "../components/Banner";
import { IconNew, IconFire } from "../components/Icons";
import { ADS_SLOT_ID, FEATURED_GAMES, SELECTED_GAMES } from "../lib/constants";
import Head from "next/head";
import {
  getGamesForHome,
  getAllGamesWithSlug,
  getGameBySlug,
} from "../lib/api";

const IndexPage = ({ games, categories, paths }) => {
  console.log(`paths`, paths);
  const topGames = games
    .slice()
    .filter((item) => FEATURED_GAMES.includes(item.gid));
  const otherGames = games
    .slice()
    .filter((item) => !FEATURED_GAMES.includes(item.gid));
  const [randomData] = React.useState(
    otherGames.slice().sort(() => 0.5 - Math.random())
  );

  return (
    <Layout>
      <Head>
        <title>Home Page</title>
      </Head>
      <div>
        <Banner
          slot={ADS_SLOT_ID.home}
          responsive={`false`}
          style={{ width: `320px`, margin: `0 auto` }}
          key={`home-pos-1`}
        />
      </div>
      <h2 className="mx-4 mt-4 mb-2 flex font-bold text-cyan-600">
        <IconNew className="text-lime-500" />
        <span>Recommended</span>
      </h2>
      <List items={topGames} />
      <h2 className="mx-4 mt-4 mb-2 flex font-bold text-cyan-600">
        <IconFire className="text-red-500" />
        <span>Popular</span>
      </h2>
      <List items={randomData.slice(3, 12)} />
      <div className="my-4">
        <Banner
          slot={ADS_SLOT_ID.home}
          format={`auto`}
          responsive={`true`}
          key={`home-pos-2`}
        />
      </div>
      <List items={randomData.slice(12, 21)} />
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps = async () => {
  const games = await getGamesForHome(300, SELECTED_GAMES);
  // const paths = await getAllGamesWithSlug();
  // const game = await getGameBySlug("soccer-hero");
  return {
    props: {
      games: games,
      categories: games,
      // paths: game,
    },
    // revalidate: 60,
  };
};
