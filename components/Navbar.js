import { Link } from "next/link";
import {
  IconHome,
  IconHistory,
  IconCategory,
  IconInformation,
} from "../components/Icons";

export default function Navbar() {
  return (
    <nav className="site-header fixed bottom-0 z-50 w-full bg-lime-400">
      <div className="container mx-auto pt-2 pb-8 text-xs">
        <ul className="mx-4 grid grid-cols-4 gap-x-4 text-center md:mx-0">
          <li>
            <Link
              activeClassName="active"
              className="flex flex-col items-center"
              to={`/`}
            >
              <span className="h-6 overflow-hidden">
                <span className="icon relative">
                  <IconHome />
                  <IconHome current />
                </span>
              </span>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              activeClassName="active"
              className="flex flex-col items-center"
              to={`/category-list`}
            >
              <span className="h-6 overflow-hidden">
                <span className="icon relative">
                  <IconCategory />
                  <IconCategory current />
                </span>
              </span>
              <span>Category</span>
            </Link>
          </li>
          <li>
            <Link
              activeClassName="active"
              className="flex flex-col items-center"
              to={`/recent`}
            >
              <span className="h-6 overflow-hidden">
                <span className="icon relative">
                  <IconHistory />
                  <IconHistory current />
                </span>
              </span>
              <span>Recent</span>
            </Link>
          </li>
          <li>
            <Link
              activeClassName="active"
              className="flex flex-col items-center"
              to={`/about`}
            >
              <span className="h-6 overflow-hidden">
                <span className="icon relative">
                  <IconInformation />
                  <IconInformation current />
                </span>
              </span>
              <span>About</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
