import { MdPlaylistAdd, MdFavorite } from "react-icons/md";
import { Divider } from "@mui/material";
import Link from "next/link";
import { usePlaylist } from "../lib/hooks";

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

const SidebarMenu = () => {
  const { playlists } = usePlaylist();
  return (
    <div>
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
      <ul className="h-[60.9%] overflow-y-auto">
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
      </ul>
    </div>
  );
}

export default SidebarMenu;
