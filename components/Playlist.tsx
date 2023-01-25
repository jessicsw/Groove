import Link from "next/link";
import { usePlaylist } from "../lib/hooks";

const Playlist = () => {
  const { playlists, isError } = usePlaylist();
  return (
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
  );
};
export default Playlist;
