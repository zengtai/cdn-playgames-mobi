import Link from "next/link";

import Image from "next/future/image";
import Banner from "../../components/Banner";
import Layout from "../../components/Layout";
import List from "../../components/List";
import {
  getAllGamesWithSlug,
  getGameBySlug,
  getRelatedGamesBySlug,
} from "../../lib/api";
import { setStorage, getStorage } from "../../utils/Storage";
import {
  ADS_SLOT_ID,
  GAME_PATH,
  IMAGE_FORMAT,
  IMAGE_PATH,
} from "../../lib/constants";

const Play = ({ game, relatedGames }) => {
  // console.log(`game`, game);
  // const game = games.find((item) => item.gid == "CrayonPop");

  // console.log(`paths`, paths.map((i) => i.slug).join(`, `));

  const handleClick = () => {
    // if (typeof window !== "undefined") {
    //   let _currentPlayedGames = JSON.parse(
    //     localStorage.getItem("playedGames")
    //   ) || { games: [] };
    //   let isExist = _currentPlayedGames.games.find((i) => i.gid == game.gid);
    //   if (!isExist) {
    //     _currentPlayedGames.games.push({
    //       gid: game.gid,
    //       title: game.title,
    //       slug: game.slug,
    //     });
    //     _currentPlayedGames.games = [...new Set(_currentPlayedGames.games)];
    //     localStorage.setItem(
    //       "playedGames",
    //       JSON.stringify(_currentPlayedGames)
    //     );
    //   }
    // }
    let currentData = getStorage(`playedGames`); // 提取本地数据，如果存在则追加，不存在则添加

    console.log(`currentData: `, currentData);

    let updatedData = []; // 临时数组

    // 1. 没有数据
    if (currentData === null) {
      // 写入
      updatedData.push({
        gid: game.gid,
        title: game.title,
        slug: game.slug,
      });
    } else {
      // 2. 如果有数据，比较关键唯一值

      let currentGids = currentData.map((i) => i.gid);
      console.log(`currentGids`, currentGids);

      // 2.1 如果不存在gid，则更新
      if (!currentGids.includes(game.gid)) {
        updatedData = currentData.push({
          gid: game.gid,
          title: game.title,
          slug: game.slug,
        });
      }

      updatedData = currentData.slice();
    }

    setStorage(`playedGames`, updatedData);
    console.log(`已更新：`, currentData);
  };
  return (
    <Layout title={game.title}>
      <div className="relative overflow-hidden bg-cyan-800/40 xl:mx-auto xl:max-w-3xl">
        <div className="relative z-10 mt-6 flex flex-col items-center">
          <a
            onClick={handleClick}
            className="block text-center"
            href={GAME_PATH + game.gid + `&t=icon`}
            title={`Play ${game.title} Now`}
          >
            <Image
              className="mx-auto h-32 w-32 rounded-lg"
              src={
                IMAGE_PATH + IMAGE_FORMAT + `/` + game.gid + `.` + IMAGE_FORMAT
              }
              alt={game.title}
              width={200}
              height={200}
              onClick={handleClick}
            />
            <h1 className="my-2 font-bold text-white drop-shadow">
              <span>{`${game.title}`}</span>
            </h1>
          </a>
          <Banner
            className={`mt-4 mb-8`}
            style={{ width: `320px` }}
            slot={ADS_SLOT_ID.detail}
            format={`rectangle`}
            responsive={`true`}
            key={`game-${Math.random()}`}
          />

          <div className="mb-8">
            <a
              onClick={handleClick}
              id="play_link"
              className="block rounded-lg bg-sky-500 px-6 py-4 font-bold text-white shadow-md shadow-black/10"
              href={GAME_PATH + game.gid + `&t=btn`}
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
      <List items={relatedGames.slice(0, 6)} from={`game`} />
      <Banner
        className={`my-4 flex flex-col items-center`}
        style={{ width: `320px` }}
        slot={ADS_SLOT_ID.detail}
        format={`rectangle, horizontal`}
        responsive={`true`}
        key={`game-${Math.random()}`}
      />
      <List items={relatedGames.slice(6, 12)} from={`game`} />
    </Layout>
  );
};

export default Play;

export const getStaticProps = async (ctx) => {
  const currentGame = await getGameBySlug(ctx.params.slug);
  const relatedGames = await getRelatedGamesBySlug(ctx.params.slug);

  // const paths = await getAllGamesWithSlug();
  return {
    props: {
      game: currentGame,
      relatedGames,
      // paths,
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
