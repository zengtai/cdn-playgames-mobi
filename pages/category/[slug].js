import * as React from "react";
import { data } from "../../data/games";
import Banner from "../components/Banner";
import { CasualIcon } from "../components/Icons";
import Layout from "../components/Layout";
import List from "../components/List";
import { ADS_SLOT_ID } from "../lib/constants";

const Category = () => {
  // console.log(data);
  const filteredData = data.filter((item) => item.category.name === "Casual");
  return (
    <Layout>
      <h1 className="m-4 flex items-center justify-center space-x-2 rounded-sm border bg-white p-3 font-bold text-cyan-600">
        <CasualIcon />
        <span>Casual Games</span>
      </h1>

      {filteredData.length > 9 ? (
        <>
          <List items={filteredData.slice(0, 9)} />
          <div className="my-4">
            <Banner
              slot={ADS_SLOT_ID.category}
              format={`auto`}
              responsive={`true`}
              key={`category-${Math.random()}`}
            />
          </div>
          <List items={filteredData.slice(9)} />
        </>
      ) : (
        <List items={filteredData} />
      )}
    </Layout>
  );
};
export const Head = () => <title>Casual Games</title>;
export default Category;
