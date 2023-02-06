import Image from "next/image";
import Link from "next/link";
import { Divider } from "@mui/material";
import { navMenu } from "../lib/sidebarRoutes";
import { MdPlaylistAdd, MdFavorite } from "react-icons/md";
import { useRouter } from "next/router";
import { addPlaylist } from "../lib/mutations";
import { fetchPlaylists } from "../lib/fetchers";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";
import { MouseEventHandler } from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

type Playlist = {
  UpdatedAt: Date;
  createdAt: Date;
  id: number;
  name: string;
  userId: number;
};

const Sidebar = () => {
  const {
    data: playlists,
    mutate: mutatePlaylists,
    isLoading,
  } = useSWR("/api/playlist", fetchPlaylists);
  const router = useRouter();

  const handleCreatePlaylist: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    const tempId = uuidv4();

    if (playlists) {
      const newPlaylist = {
        name: `Playlist #${playlists.length + 1}`,
      };

      try {
        mutatePlaylists((playlists) => {
          return [
            ...(playlists as Playlist[]),
            { ...newPlaylist, id: tempId },
          ] as Playlist[];
        }, false);

        const json = await addPlaylist(newPlaylist);

        mutatePlaylists(
          (playlists) =>
            playlists?.map((playlist) => {
              return `${playlist.id}` === tempId ? json : playlist;
            }) as Playlist[],
          false
        );
        router.push(`/playlist/${json.id}`);
      } catch (error) {
        console.error("Error with mutating playlist");
      }
    }
  };
  if (isLoading) return <SidebarSkeleton />;
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
          <span className="pl-5 text-white">Groove</span>
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
            <li className="mb-2">
              <button onClick={handleCreatePlaylist}>
                <MdPlaylistAdd className="mr-4 inline" /> Create Playlist
              </button>
            </li>
            <li className="mb-2">
              <Link href="/favorites" passHref>
                <MdFavorite className="mr-4 inline" /> Liked Songs
              </Link>
            </li>
          </ul>
          <Divider className="my-0 mx-auto bg-gray-700" />
        </div>
        <div className="scroll h-[calc(100vh-390px)] overflow-y-auto">
          <ul>
            {playlists?.map((playlist) => (
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
      </div>
    </div>
  );
};

export default Sidebar;
