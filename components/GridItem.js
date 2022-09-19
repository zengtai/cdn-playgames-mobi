import * as React from "react";
import { Link } from "next/link";

export default function GridItem({ item }) {
  return (
    <>
      <div>
        <Link to={`#`}>
          <img src="" alt="" />
          <h2>
            <span className="text-sm">{item.title}</span>
          </h2>
        </Link>
      </div>
      <div>
        <Link className="text-xs uppercase" to={`#`}>
          {item.category.name}
        </Link>
      </div>
    </>
  );
}
