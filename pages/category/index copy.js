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
import { ADS_SLOT_ID, IMAGE_PATH, IMAGE_FORMAT } from "../../lib/constants";
import Image from "next/future/image";

const CategoryListPage = ({ games, categories }) => {
  // console.log(`data`, games.length);
  // let currentData = games.slice();
  // let mostlyPlayed = games.slice(0, 6);
  return (
    <Layout>
      <h1 className="m-4 flex justify-center text-xl font-bold text-cyan-600">
        <span>Category List</span>
      </h1>
      <ul className="m-4 grid gap-2">
        {categories.map((item) => {
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
                      {currentData
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
                      {
                        currentData.filter(
                          (item) => item.category.name === "Casual"
                        ).length
                      }
                      {"+"}
                    </span>
                  </div>
                </a>
              </Link>
            </li>
          );
        })}
        <li>
          <Link href={`/category`}>
            <a className="flex justify-between rounded-lg border bg-white p-3">
              <div className="flex items-center space-x-2">
                <CasualIcon />
                <span>Casual</span>
              </div>
              <div className="flex items-center gap-x-2">
                <ul className="flex -space-x-1">
                  {currentData
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
                  {
                    currentData.filter(
                      (item) => item.category.name === "Casual"
                    ).length
                  }
                  {"+"}
                </span>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/category`}>
            <a className="flex justify-between rounded-lg border bg-white p-3">
              <div className="flex items-center space-x-2">
                <PuzzleIcon />
                <span>Puzzle</span>
              </div>
              <div className="flex items-center gap-x-2">
                <ul className="flex -space-x-1.5">
                  {currentData
                    .filter((item) => item.category.name === "Puzzle")
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
                {currentData.filter((item) => item.category.name === "Puzzle")
                  .length > 3 ? (
                  <span className="text-xs">+</span>
                ) : null}
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/category`}>
            <a className="flex justify-between rounded-lg border bg-white p-3">
              <div className="flex items-center space-x-2">
                <span>
                  <ActionIcon />
                </span>
                <span>Action</span>
              </div>
              <div className="flex items-center gap-x-2">
                <ul className="flex -space-x-1.5">
                  {currentData
                    .filter((item) => item.category.name === "Action")
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
                {currentData.filter((item) => item.category.name === "Action")
                  .length > 3 ? (
                  <span className="text-xs">
                    {
                      currentData.filter(
                        (item) => item.category.name === "Action"
                      ).length
                    }
                    {`+`}
                  </span>
                ) : null}
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/category`}>
            <a className="flex items-center space-x-2 rounded-lg border bg-white p-3">
              <ShootingIcon />
              <span>Shooting</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/category`}>
            <a className="flex items-center space-x-2 rounded-lg border bg-white p-3">
              <SportsIcon />
              <span>Sports</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/category`}>
            <a className="flex items-center space-x-2 rounded-lg border bg-white p-3">
              <StrategyIcon />
              <span>Strategy</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/category`}>
            <a className="flex items-center space-x-2 rounded-lg border bg-white p-3">
              <DefenseIcon />
              <span>Defense</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/category`}>
            <a className="flex items-center space-x-2 rounded-lg border bg-white p-3">
              <SimulationIcon />
              <span>Simulation</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/category`}>
            <a className="flex items-center space-x-2 rounded-lg border bg-white p-3">
              <RacingIcon />
              <span>Racing</span>
            </a>
          </Link>
        </li>
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
      <List items={mostlyPlayed} />
    </Layout>
  );
};
export const Head = () => <title>Category</title>;
export default CategoryListPage;

export const getStaticProps = async (ctx) => {
  const currentGames = await getGamesByCategory(ctx.params.slug);
  const allCategories = await getAllCategoriesWithSlug();

  return {
    props: {
      games: currentGames,
      categories: allCategories,
      // category: currentGames[0].category.name,
      // categories: games,
    },
    // revalidate: 60,
  };
};
