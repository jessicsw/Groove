import Image from "next/image";
import Link from "next/link";
import { Divider } from "@mui/material";
import { usePlaylist } from "../lib/hooks";
import { navMenu, musicMenu } from "../lib/sidebarRoutes";

const Sidebar = () => {
  const { playlists } = usePlaylist();
  return (
    <div className="h-[calc(100vh-100px)] w-full bg-black p-5 text-gray-400">
      <div className="h-full">
        <div className="w-full pb-5">
          <Image
            className="inline"
            src="/logo.svg"
            alt="groove logo"
            height="50"
            width="50"
          />
          <span className="pl-5 text-white">groove</span>
        </div>
        <div className="h-[200px]">
          <ul className="mb-9 text-gray-300">
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
          <ul className="mb-4 text-gray-300">
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
        <div className="h-[calc(100vh-390px)] overflow-y-auto">
          <ul className="">
            {playlists.map((playlist) => (
              <li className="py-1 text-sm" key={playlist.id}>
                <Link
                  href={{
                    pathname: "/playlist/[id]",
                    query: { id: playlist.id },
                  }}
                  passHref
                >
                  {playlist.name}
                </Link>
              </li>
            ))}
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
