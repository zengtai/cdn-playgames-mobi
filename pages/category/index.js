import Image from "next/future/image";

import Link from "next/link";

import Banner from "../../components/Banner";
import Layout from "../../components/Layout";
import {
  getAllCategoriesWithSlug,
  getDataForCategoryList,
} from "../../lib/api";
import GetIcon from "../../components/Icons";
import { ADS_SLOT_ID, IMAGE_FORMAT, IMAGE_PATH } from "../../lib/constants";

const CategoryListPage = ({ allGames }) => {
  // console.log(`allGames`, allGames);

  // console.log(
  //   `category url`,
  //   JSON.stringify(allGames.map((i) => i.category.slug).join(`,`))
  // );
  // console.log(
  //   `allGames`,
  //   JSON.stringify([].concat(allGames.map((i) => i.games)).join(","))
  // );

  return (
    <Layout title={`Category`}>
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
                    {GetIcon({ name: `${item.category.slug}` })}
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
                    <div className="text-xs">
                      {index < 2 ? (
                        item.games.length + `+`
                      ) : (
                        <div className="w-6 h-6 text-center leading-6 bg-slate-200 text-slate-800 rounded-full">
                          {item.games.length}
                        </div>
                      )}
                    </div>
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
      {/* <h2 className="mx-4 my-2 p-2 text-center font-bold text-cyan-600">
        <span>- Most Played -</span>
      </h2>
      <List items={mostlyPlayed} /> */}
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

  return {
    props: {
      allGames: formatData,
      categories: allCategories,
    },
    // revalidate: 60,
  };
};
