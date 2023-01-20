import { MdPlaylistAdd, MdFavorite } from "react-icons/md";
import Link from "next/link";

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

const MusicMenu = () => (
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
);

export default MusicMenu;
