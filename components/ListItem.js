import * as React from "react";
import Link from "next/link";
import { IMAGE_FORMAT, IMAGE_PATH } from "../lib/constants";
import Image from "next/future/image";

export default function ListItem({ item, from }) {
  return (
    <li>
      <div>
        <Link href={`/game/${item.slug}${from ? `?from=${from}` : ``}`}>
          <a>
            <Image
              className="rounded-xl bg-gray-100 shadow-lg"
              src={
                IMAGE_PATH + IMAGE_FORMAT + `/` + item.gid + `.` + IMAGE_FORMAT
              }
              alt={item.title}
              width={200}
              height={200}
              loading={`lazy`}
            />
            <h2 className="sr-only mt-2 mb-1.5">
              <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-xs font-bold text-slate-700">
                {item.title}
              </span>
            </h2>
          </a>
        </Link>
        {/* <div className="sr-only origin-left scale-90">
          <Link
            className="rounded-md bg-slate-200 p-1 text-xs uppercase"
            href={`/category/${item.category.slug}`}
          >
            <a>{item.category.name}</a>
          </Link>
        </div> */}
      </div>
    </li>
  );
}
