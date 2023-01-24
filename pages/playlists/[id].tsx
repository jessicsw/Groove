import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
import GradientLayout from "../../components/GradientLayout";
import SongsTable from "../../components/songsTable";

interface JwtPayLoad {
  id: number;
}

const getBGColor = (id) => {
  const colors = ["gray", "red", "lime", "cyan", "blue"];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }) => {
  const color = getBGColor(playlist.id);

  return (
    <div className="h-full">
      <GradientLayout
        subtitle="playlist"
        color={color}
        roundImage={false}
        title={playlist.name}
        description={`${playlist.songs.length} songs`}
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
  const { id } = validateToken(req.cookies.GROOVE_ACCESS_TOKEN) as JwtPayLoad;
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: id,
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
  return {
    props: { playlist: JSON.parse(JSON.stringify(playlist)) },
  };
};

export default Playlist;
