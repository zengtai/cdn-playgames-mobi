import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import List from "../components/List";
// import { games } from "../data/games";
import Banner from "../components/Banner";
import { IconFire, IconNew } from "../components/Icons";
import { getGamesForHome } from "../lib/api";
import { ADS_SLOT_ID, FEATURED_GAMES } from "../lib/constants";

const IndexPage = ({ games }) => {
  // console.log(`paths`, paths);

  let tmp = games.slice();
  const featureGames = tmp.filter((item) => FEATURED_GAMES.includes(item.gid));
  const topGames = tmp.filter((item) => !FEATURED_GAMES.includes(item.gid));

  const [randomData, setRandomData] = useState(topGames);

  useEffect(() => {
    let tmp = topGames.slice();
    setRandomData(() => tmp.sort(() => 0.5 - Math.random()));
  }, []);

  // console.log(`randomData`, randomData);

  return (
    <Layout title={`Home`}>
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
      <List items={featureGames} />
      <h2 className="mx-4 mt-4 mb-2 flex font-bold text-cyan-600">
        <IconFire className="text-red-500" />
        <span>Popular</span>
      </h2>
      <List items={randomData.slice(0, 9)} />
      <div className="my-4">
        <Banner
          slot={ADS_SLOT_ID.home}
          format={`auto`}
          responsive={`true`}
          key={`home-pos-2`}
        />
      </div>
      <List items={randomData.slice(9, 18)} />
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps = async () => {
  const games = await getGamesForHome(30);
  // const paths = await getAllGamesWithSlug();
  // const game = await getGameBySlug("soccer-hero");
  return {
    props: {
      games: games,
      // categories: games,
      // paths: game,
    },
    // revalidate: 60,
  };
};
