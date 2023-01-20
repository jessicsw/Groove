import Link from "next/link";

const playlist = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);

const Playlist = () => (
  <ul className="h-[60.9%] overflow-y-auto">
    {playlist.map((playlist) => (
      <li className="py-1 text-sm" key={playlist}>
        <Link href="/" passHref>
          {playlist}
        </Link>
      </li>
    ))}
  </ul>
);

export default Playlist;
