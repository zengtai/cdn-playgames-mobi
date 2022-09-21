import Layout from "../components/Layout";
import List from "../components/List";
import Link from "next/link";

import { getAllGamesWithSlug } from "../lib/api";
import { setStorage, getStorage } from "../utils/Storage";

import { useState, useEffect } from "react";

const RecentPage = ({ allSlugs }) => {
  // console.log(data);
  const [playedGames, setPlayedGames] = useState([]);

  useEffect(() => {
    // let playedGamesBySlug = [];
    // // if (typeof window !== "undefined") {
    // if (localStorage.getItem("playedGames") !== undefined) {
    //   let playedGames = JSON.parse(localStorage.getItem("playedGames")) || [];

    //   if (playedGames.games && playedGames.games.length > 0) {
    //     setPlayedGames(() => playedGames.games);
    //   }
    // }
    // // }
    setPlayedGames(() => getStorage(`playedGames`));
  }, [allSlugs]);

  console.log(`playedGames`, playedGames);

  return (
    <Layout title={`Recent Played`}>
      <h1 className="m-4 flex justify-center text-xl font-bold text-cyan-600">
        <span>Recently Played</span>
      </h1>

      {/* {playedGames.length ? (
        <List items={playedGames} />
      ) : (
        <div className="m-4 flex flex-col items-center">
          <p className="p-4 border rounded-lg text-slate-500 text-sm">
            Oops! It looks like you&#39;ve never played any games here.
          </p>
          <Link href={`/`}>
            <a className="line-block mx-4 mt-8 py-4 px-6 bg-cyan-500 text-white rounded-full shadow-lg">
              Go to Homepage
            </a>
          </Link>
        </div>
      )} */}

      {playedGames ? (
        <List items={playedGames} from={`history`} />
      ) : (
        <div className="m-4 flex flex-col items-center">
          <p className="p-4 border rounded-lg text-slate-500 text-sm">
            Oops! It looks like you&#39;ve never played any games here.
          </p>
          <Link href={`/?from=history`}>
            <a className="line-block mx-4 mt-8 py-4 px-6 bg-cyan-500 text-white rounded-full shadow-lg">
              Go to Homepage
            </a>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default RecentPage;

export const getStaticProps = async () => {
  const allSlugs = await getAllGamesWithSlug();
  // console.log(`paths`, paths);

  return {
    props: {
      allSlugs,
      // paths: game,
    },
    // revalidate: 60,
  };
};
