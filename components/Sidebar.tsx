import Image from "next/image";
import Link from "next/link";
import { Divider } from "@mui/material";
import { navMenu } from "../lib/sidebarRoutes";
import { MdPlaylistAdd, MdFavorite } from "react-icons/md";
import { useRouter } from "next/router";
import { addPlaylist } from "../lib/mutations";
import { fetchPlaylists } from "../lib/fetcher";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";

const Sidebar = () => {
  const {
    data: playlists,
    mutate: mutatePlaylists,
    isLoading,
  } = useSWR("/api/playlist", fetchPlaylists);
  const router = useRouter();
  const handleCreatePlaylist = async () => {
    // Creates tempId so that jsx has unique key prop for local mutate
    const tempId = uuidv4();
    const newPlaylist = { name: `Playlist #${playlists.length + 1}` };

    try {
      // Optimistically adds new playlist to local cache
      await mutatePlaylists((playlists) => {
        return [...playlists, { ...newPlaylist, id: tempId }];
      }, false);

      // Create new playlist
      let json = await addPlaylist(newPlaylist);

      //Update tempId with canonical id created from POST request above.
      //NOTE: triggering revalidation (e.g. switching pages) will cause cache to update with canonical id, however, if user doesn't navigate away from page, the tempid will persist
      await mutatePlaylists(
        (playlists) =>
          playlists.map((playlist) => {
            return playlist.id === tempId ? json : playlist;
          }),
        false
      );

      router.push(`/playlist/${json.id}`);
    } catch (error) {
      console.error("Unable to mutate playlist");
    }
  };

  if (isLoading) return <div className="text-white">loading...</div>;
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
            <li className="mb-2">
              {/* <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link> */}
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
        <div className="scroll h-[calc(100vh-390px)] hover:overflow-auto">
          <ul>
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
      </div>
    </div>
  );
};

export default Sidebar;