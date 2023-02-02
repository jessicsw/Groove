import prisma from "../../lib/prisma";
import GradientLayout from "../../components/GradientLayout";
import SongsTable from "../../components/SongsTable";
import Image from "next/image";
import { validateToken } from "../../lib/auth";
import { formatPlaylistDuration } from "../../lib/formatters";
import SearchSongs from "../../components/SearchSongs";
import { GetServerSideProps } from "next";

type Artist = {
  id: number;
  image: string;
  name: string;
};

type Song = {
  duration: number;
  id: number;
  name: string;
  url: string;
  artistId: number;
  artist: Artist;
  createdAt: Date;
};

type Playlist = {
  UpdatedAt: Date;
  createdAt: Date;
  id: number;
  name: string;
  userId: number;
  songs: Array<Song>;
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

type PlaylistProps = {
  playlist: Playlist;
  user: User;
};

const getBGColor = (id: number) => {
  const colors = ["gray", "red", "lime", "cyan", "blue"];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist, user }: PlaylistProps) => {
  const color = getBGColor(playlist.id);
  const playlistDuration = playlist.songs.reduce((acc, el) => {
    return acc + el.duration;
  }, 0);
  return (
    <div className="h-full">
      <GradientLayout
        subtitle="playlist"
        color={color}
        roundImage={false}
        title={playlist.name}
        description={
          <>
            <div className="flex items-center">
              <div className="relative mr-1 h-[25px] w-[25px]">
                <Image
                  className="rounded-full drop-shadow-2xl"
                  fill
                  style={{ objectFit: "cover" }}
                  src="/avatar.jpg"
                  alt="avatar"
                />
              </div>
              {`${user.firstName}`}
              {playlist.songs.length === 0
                ? null
                : ` • ${playlist.songs.length} songs, ${
                    formatPlaylistDuration(playlistDuration).minutes
                  } min ${
                    formatPlaylistDuration(playlistDuration).seconds
                  } sec`}
            </div>
          </>
        }
        image={`https://picsum.photos/seed/${playlist.id}/400`}
      >
        <div>
          <div className="w-full">
            <SongsTable songs={playlist.songs} profile={false} />
            <SearchSongs />
          </div>
        </div>
      </GradientLayout>
    </div>
  );
};

interface JwtPayLoad {
  id: number;
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
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

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: query.id ? +query.id : undefined,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
              image: true,
            },
          },
        },
      },
    },
  });

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
  });
  return {
    props: {
      playlist: JSON.parse(JSON.stringify(playlist)),
      user: JSON.parse(JSON.stringify(userData)),
    },
  };
};

export default Playlist;
