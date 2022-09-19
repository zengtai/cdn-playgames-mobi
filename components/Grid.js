import * as React from "react";
import GridItem from "./GridItem";

export default function Grid({ items }) {
  return (
    <>
      {items.map((item) => (
        <GridItem key={item.gid} item={item} />
      ))}
    </>
  );
}
