import * as React from "react";
// import { games } from "../../data/games";
import Banner from "../../components/Banner";
import Layout from "../../components/Layout";
import List from "../../components/List";
import { ADS_SLOT_ID } from "../../lib/constants";
import { getGamesByCategory, getAllCategoriesWithSlug } from "../../lib/api";
import GetIcon from "../../components/Icons";

const Category = ({ games }) => {
  // console.log(data);
  // console.log(`games`, `(`, games.length, `):`, games);
  // const filteredData = games.filter((item) => item.category.name === "Casual");
  return (
    <Layout title={games[0].category.name + ` Games`}>
      <h1 className="m-4 flex items-center justify-center space-x-2 rounded-sm border bg-white p-3 font-bold text-cyan-600">
        {GetIcon({ name: `${games[0].category.slug}` })}
        <span>{games[0].category.name + ` Games`}</span>
      </h1>

      {games.length > 9 ? (
        <>
          <List items={games.slice(0, 9)} />
          <div className="my-4">
            <Banner
              slot={ADS_SLOT_ID.category}
              format={`auto`}
              responsive={`true`}
              key={`category-${Math.random()}`}
            />
          </div>
          <List items={games.slice(9)} />
        </>
      ) : (
        <List items={games} />
      )}
    </Layout>
  );
};

export default Category;

export const getStaticProps = async (ctx) => {
  const currentGames = await getGamesByCategory(ctx.params.slug);

  return {
    props: {
      games: currentGames,
      // category: currentGames[0].category.name,
      // categories: games,
    },
    // revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const paths = await getAllCategoriesWithSlug();
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
