import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Liked Songs",
    icon: MdFavorite,
    route: "/favorites",
  },
];

const Sidebar = () => {
  return (
    <div className="h-[calc(100vh-100px)] w-full bg-black p-5 text-gray-400">
      <div className="w-full pb-5">
        <Image
          className="inline"
          src="/logo.svg"
          alt="groove logo"
          height="50"
          width="50"
        />
        <span className="pl-5 text-white">gr o o ve</span>
      </div>
      <ul className="mb-5 text-gray-300">
        {navMenu.map((menu) => {
          return (
            <li className="mb-2" key={menu.name}>
              <Link href={menu.route} passHref>
                <menu.icon className="mr-4 inline" /> {menu.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="mt-9 mb-4 text-gray-300">
        {musicMenu.map((menu) => {
          return (
            <li className="mb-2" key={menu.name}>
              <Link href={menu.route} passHref>
                <menu.icon className="mr-4 inline" /> {menu.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <Divider className="my-0 mx-auto bg-gray-700" />
    </div>
  );
};

export default Sidebar;
