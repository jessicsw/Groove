import prisma from "../lib/prisma";
import Image from "next/image";
import { useRouter } from "next/router";
import { validateToken } from "../lib/auth";
import { TfiMusicAlt } from "react-icons/tfi";
import { fetchPlaylists } from "../lib/fetchers";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import { addPlaylist } from "../lib/mutations";
import { GetServerSideProps } from "next";

type Playlist = {
  id: number;
  createdAt: Date;
  UpdatedAt: Date;
  name: string;
  userId: number;
};

type User = {
  id: number;
  createdAt: Date;
  UpdatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

type LibraryProps = {
  playlists: Array<Playlist>;
  user: User;
};

interface JwtPayLoad {
  id: number;
}

const Library = ({ playlists, user }: LibraryProps) => {
  const router = useRouter();
  const { mutate: mutatePlaylists } = useSWR("/api/playlist", fetchPlaylists);

  const handleCreatePlaylist = async () => {
    const tempId = uuidv4();

    const newPlaylist = { name: `Playlist #${playlists.length + 1}` };
    try {
      await mutatePlaylists((playlists) => {
        return [
          ...(playlists as Playlist[]),
          {
            ...newPlaylist,
            id: tempId,
            userId: user.id,
          },
        ] as Playlist[];
      }, false);

      const json = await addPlaylist(newPlaylist);
      await mutatePlaylists(
        (playlists) =>
          playlists?.map((playlist) => {
            return `${playlist.id}` === tempId ? json : playlist;
          }),
        false
      );
      router.push(`/playlist/${json.id}`);
    } catch (error) {
      console.error("Error creating playlist in library");
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] w-full overflow-y-scroll bg-gradient-to-b from-purple-500 to-black p-9">
      {playlists.length !== 0 ? (
        <div className="grid-col-4 grid gap-5 py-3">
          {playlists.map((playlist) => (
            <div
              key={playlist.name}
              onDoubleClick={() => router.push(`/playlist/${playlist.id}`)}
              className="m-3 max-w-[200px] rounded-md bg-white bg-opacity-10 p-5 duration-200 hover:cursor-pointer hover:bg-opacity-20 hover:ease-in-out"
            >
              <Image
                src={`https://picsum.photos/seed/${playlist.id}/400`}
                alt="playlist image"
                height="144"
                width="144"
                className="m-auto rounded-full shadow-xl"
              />
              <div className="pt-6 pb-1 text-sm font-semibold text-white">
                {playlist.name}
              </div>
              <div className="text-[12px] text-gray-400">
                By {user.firstName}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center text-white">
          <TfiMusicAlt className="min-h-[100px] min-w-[100px] pb-5" />
          <div className="whitespace-nowrap">No playlists found.</div>
          <button
            onClick={handleCreatePlaylist}
            className="mt-5 min-w-[30%] whitespace-nowrap rounded-full bg-white p-5 font-bold text-black"
          >
            Create a playlist
          </button>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let user;

  try {
    user = validateToken(
      req.cookies.GROOVE_ACCESS_TOKEN as string
    ) as JwtPayLoad;
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const playlists = await prisma.playlist.findMany({
    where: { userId: user.id },
  });
  const userData = await prisma.user.findUnique({
    where: { id: user.id },
  });

  return {
    props: {
      playlists: JSON.parse(JSON.stringify(playlists)),
      user: JSON.parse(JSON.stringify(userData)),
    },
  };
};

export default Library;
