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
import { getAllCategoriesWithSlug, getGamesByCategory } from "../../lib/api";
import { ADS_SLOT_ID, IMAGE_PATH, IMAGE_FORMAT } from "../../lib/constants";
import Image from "next/future/image";

import { useEffect, useState } from "react";

const CategoryListPage = ({ games, categories }) => {
  // console.log(`data`, games.length);
  // let currentData = games.slice();
  // let mostlyPlayed = games.slice(0, 6);
  console.log(`categories`, categories);
  // console.log(`games`, games);

  return (
    <Layout>
      <h1 className="m-4 flex justify-center text-xl font-bold text-cyan-600">
        <span>Category List</span>
      </h1>
      <ul className="m-4 grid gap-2">
        {categories.map(async (item, index) => {
          if (index < 2) {
            let currentData = await getGamesByCategory(item.slug, 3);
            console.log(item.slug, currentData);
            console.log(typeof currentData);
          }
          return (
            <li key={item.slug}>
              <Link href={`/category`}>
                <a className="flex justify-between rounded-lg border bg-white p-3">
                  <div className="flex items-center space-x-2">
                    <CasualIcon />
                    <span>Casual</span>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <ul className="flex -space-x-1">
                      {currentData &&
                        currentData
                          .filter((item) => item.category.name === "Casual")
                          .slice(0, 3)
                          .map((item) => (
                            <li key={`${item.gid}-${Math.random()}`}>
                              <Image
                                className="rounded-full border-2 border-white"
                                src={
                                  IMAGE_PATH +
                                  IMAGE_FORMAT +
                                  `/` +
                                  item.gid +
                                  `.` +
                                  IMAGE_FORMAT
                                }
                                alt={item.title}
                                width={24}
                                height={24}
                              />
                            </li>
                          ))}
                    </ul>
                    <span className="text-xs">
                      {currentData && currentData.length}
                      {"+"}
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
export const Head = () => <title>Category</title>;
export default CategoryListPage;

export const getStaticProps = async (ctx) => {
  // const currentGames = await getGamesByCategory();
  const allCategories = await getAllCategoriesWithSlug();

  return {
    props: {
      // games: allGames,
      categories: allCategories,

      // category: currentGames[0].category.name,
      // categories: games,
    },
    // revalidate: 60,
  };
};
