import Link from "next/link";
import * as React from "react";

import Banner from "../../components/Banner";
import List from "../../components/List";
import {
  ADS_SLOT_ID,
  IMAGE_PATH,
  IMAGE_FORMAT,
  GAME_PATH,
} from "../../lib/constants";
import Layout from "../../components/Layout";
import Image from "next/future/image";
import {
  getGameBySlug,
  getRelatedGamesBySlug,
  getAllGamesWithSlug,
} from "../../lib/api";

const Play = ({ game, relatedGames }) => {
  // console.log(`game`, game);
  // const game = games.find((item) => item.gid == "CrayonPop");
  const handleClick = () => {
    if (typeof window !== "undefined") {
      let _currentPlayedGames = JSON.parse(
        localStorage.getItem("playedGames")
      ) || { games: [] };
      let isExist = _currentPlayedGames.games.find((i) => i.gid == game.gid);
      if (!isExist) {
        _currentPlayedGames.games.push({
          gid: game.gid,
          title: game.title,
          slug: game.slug,
        });

        _currentPlayedGames.games = [...new Set(_currentPlayedGames.games)];

        localStorage.setItem(
          "playedGames",
          JSON.stringify(_currentPlayedGames)
        );
      }
    }
  };
  return (
    <Layout title={game.title}>
      <div className="relative overflow-hidden bg-cyan-800/40 xl:mx-auto xl:max-w-3xl">
        <div className="relative z-10 mt-6 flex flex-col items-center">
          <Image
            className="mx-auto h-32 w-32 rounded-lg"
            src={
              IMAGE_PATH + IMAGE_FORMAT + `/` + game.gid + `.` + IMAGE_FORMAT
            }
            alt={game.title}
            width={200}
            height={200}
          />
          <h1 className="my-2 font-bold text-white drop-shadow">
            <span>{`${game.title}`}</span>
          </h1>

          <Banner
            className={`my-4`}
            style={{ width: `320px` }}
            slot={ADS_SLOT_ID.detail}
            format={`auto`}
            responsive={`false`}
            key={`game-${Math.random()}`}
          />

          <div className="mb-6">
            <a
              onClick={handleClick}
              id="play_link"
              className="block rounded-lg bg-sky-500 px-6 py-4 font-bold text-white shadow-md shadow-black/10"
              href={GAME_PATH + game.gid}
              title={`Play ${game.title} Now`}
            >
              Play Now
            </a>
          </div>
        </div>
        <Image
          className="absolute inset-0 z-0 h-full w-full object-contain opacity-50 blur-2xl"
          src={IMAGE_PATH + IMAGE_FORMAT + `/` + game.gid + `.` + IMAGE_FORMAT}
          alt={game.title}
          width={100}
          height={100}
        />
      </div>
      <div className="m-4 space-x-2 text-sm">
        <Link href={`/`}>Home</Link>
        <span className="text-gray-300">/</span>
        <Link href={`/category/${game.category.slug}`}>
          {game.category.name}
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-400">{game.title}</span>
      </div>
      <div className="m-4 text-sm">
        <h3 className="my-2 font-bold text-gray-600">Description</h3>
        <div>{game.description}</div>
      </div>
      <h2 className="mx-4 my-2 p-2 text-center font-bold text-cyan-600">
        <span>- Most Played -</span>
      </h2>
      <List items={relatedGames.slice(0, 6)} />
      <Banner
        className={`my-4 flex flex-col items-center`}
        style={{ width: `320px` }}
        slot={ADS_SLOT_ID.detail}
        format={`rectangle, horizontal`}
        responsive={`false`}
        key={`game-${Math.random()}`}
      />
      <List items={relatedGames.slice(6, 12)} />
    </Layout>
  );
};

export default Play;

export const getStaticProps = async (ctx) => {
  const currentGame = await getGameBySlug(ctx.params.slug);
  const relatedGames = await getRelatedGamesBySlug(ctx.params.slug);
  return {
    props: {
      game: currentGame,
      relatedGames,
      // categories: games,
    },
    // revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const paths = await getAllGamesWithSlug();
  // console.log(`paths`, paths);

  return {
    paths: paths.map((item) => ({
      params: {
        slug: item.slug,
      },
    })),
    fallback: false,
  };
};
