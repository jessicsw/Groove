import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
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

const Sidebar = () => {
  return (
    <div className="h-[calc(100vh-100px)] w-full bg-black px-1 text-gray-400">
      <div className="py-5">
        <div className="w-full px-5">
          <Image
            className="inline"
            src="/logo.svg"
            alt="groove logo"
            height="50"
            width="50"
          />
          <span className="pl-5 text-white">gr o o ve</span>
        </div>
      </div>
      <ul className="mb-5 text-gray-400">
        {navMenu.map((menu) => {
          return (
            <li className="mb-2 px-5 text-base" key={menu.name}>
              <Link href={menu.route} passHref>
                <menu.icon className="mr-4 inline" /> {menu.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
