import * as React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import {
  ActionIcon,
  CasualIcon,
  ShootingIcon,
  SportsIcon,
  StrategyIcon,
  DefenseIcon,
  PuzzleIcon,
  SimulationIcon,
  RacingIcon,
} from "../../components/Icons";
import { games } from "../../data/games";
import { categories } from "../../data/categories";
import Banner from "../../components/Banner";
import List from "../../components/List";
import {
  getAllCategoriesWithSlug,
  getGamesByCategory,
  getDataForCategoryList,
} from "../../lib/api";
import { ADS_SLOT_ID, IMAGE_PATH, IMAGE_FORMAT } from "../../lib/constants";
import Image from "next/future/image";

import { useEffect, useState } from "react";

const CategoryListPage = ({ categories, allGames }) => {
  // console.log(`data`, games.length);
  // let currentData = games.slice();
  // let mostlyPlayed = games.slice(0, 6);
  // console.log(`categories`, categories);
  // console.log(`games`, games);
  // console.log(`games`, games);
  console.log(`allGames`, allGames);

  // const [games, setGames] = useState([]);

  // useEffect(() => {
  //   let tmp = [];
  //   categories.map(async (item) => {
  //     let games = await getGamesByCategory(item.slug);
  //     let tmpData = {
  //       category: { name: games[0].category.name, slug: item.slug },
  //       games: [...games.map((i) => i.gid)],
  //     };

  //     tmp.push(tmpData);
  //   });

  //   setGames((g) => [...g, tmp]);
  // }, [categories]);

  // console.log(`games`, games);

  return (
    <Layout>
      <h1 className="m-4 flex justify-center text-xl font-bold text-cyan-600">
        <span>Category</span>
      </h1>
      <ul className="m-4 grid gap-2">
        {allGames.map((item, index) => {
          return (
            <li key={item.category.slug}>
              <Link href={`/category/${item.category.slug}`}>
                <a className="flex justify-between rounded-lg border bg-white p-3">
                  <div className="flex items-center space-x-2">
                    <span>{item.category.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {index < 2 ? (
                      <ul className="flex -space-x-1">
                        {item.games.slice(0, 3).map((game) => (
                          <li key={`${game}-${Math.random()}`}>
                            <Image
                              className="rounded-full border-2 border-white"
                              src={
                                IMAGE_PATH +
                                IMAGE_FORMAT +
                                `/` +
                                game +
                                `.` +
                                IMAGE_FORMAT
                              }
                              alt={game}
                              width={24}
                              height={24}
                            />
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <span className="text-xs">
                      {item.games.length + (index < 2 ? `+` : ``)}
                    </span>
                  </div>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="my-4">
        <Banner
          slot={ADS_SLOT_ID.category}
          format={`auto`}
          responsive={`true`}
          key={`category-list`}
        />
      </div>
      <h2 className="mx-4 my-2 p-2 text-center font-bold text-cyan-600">
        <span>- Most Played -</span>
      </h2>
      {/* <List items={mostlyPlayed} /> */}
    </Layout>
  );
};

export default CategoryListPage;

export const getStaticProps = async (ctx) => {
  // const currentGames = await getGamesByCategory();
  const allCategories = await getAllCategoriesWithSlug();
  // 1.获取全部分类
  // 2.按分类筛选游戏，截取前三个
  // 3.push到数组

  const allGames = await getDataForCategoryList();

  let formatData = [];

  allCategories.map((item) => {
    let tmp = allGames.filter((game) => game.category.slug == item.slug);
    let tmpData = {
      category: {
        name: tmp[0].category.name,
        slug: item.slug,
      },
      games: tmp.map((i) => i.gid),
    };
    formatData.push(tmpData);
  });

  // console.log(`formatData (`, formatData.length, `)`, formatData);

  // let tmp = [];
  // allCategories.map(async (item) => {
  //   let games = await getGamesByCategory(item.slug, 3);
  //   let tmpData = {
  //     category: { name: games[0].category.name, slug: item.slug },
  //     games: [...games.map((i) => i.slug)],
  //   };

  //   tmp.push(tmpData);
  //   // console.log(`tmp (`, tmp.length, `)`, tmp);
  // });

  // console.log(`tmp (`, tmp.length, `)`, tmp);

  return {
    props: {
      allGames: formatData,
      categories: allCategories,
    },
    // revalidate: 60,
  };
};
