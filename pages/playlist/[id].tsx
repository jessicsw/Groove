import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
import GradientLayout from "../../components/GradientLayout";
import SongsTable from "../../components/songsTable";
import Image from "next/image";
import { formatTime, formatPlaylistDuration } from "../../lib/formatters";

interface JwtPayLoad {
  id: number;
}

const getBGColor = (id) => {
  const colors = ["gray", "red", "lime", "cyan", "blue"];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist, user }) => {
  const color = getBGColor(playlist.id);

  const duration = playlist.songs.reduce((acc, el) => {
    return acc + parseInt(el.duration);
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
              {`${user.firstName} • ${playlist.songs.length} songs, ${
                formatPlaylistDuration(duration).minutes
              } min ${formatPlaylistDuration(duration).seconds} sec`}
            </div>
          </>
        }
        image={`https://picsum.photos/400?random=${playlist.id}`}
      >
        <div>
          <SongsTable songs={playlist.songs} />
        </div>
      </GradientLayout>
    </div>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;

  try {
    user = validateToken(req.cookies.GROOVE_ACCESS_TOKEN) as JwtPayLoad;
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
      id: +query.id,
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
