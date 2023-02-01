import SongsTable from "../components/SongsTable";
import GradientLayout from "../components/GradientLayout";
import prisma from "../lib/prisma";
import Image from "next/image";
import { formatPlaylistDuration } from "../lib/formatters";
import { validateToken } from "../lib/auth";

const Favorites = ({ user, songs }) => {
  const favoritesDuration = songs?.reduce((acc, el) => {
    return acc + parseInt(el.duration);
  }, 0);

  return (
    <GradientLayout
      color="blue"
      roundImage={false}
      image="/favorites.jpg"
      subtitle="playlist"
      title="Liked Songs"
      description={
        <>
          <div className="flex items-center">
            <div className="relative mr-1 h-[25px] w-[25px]">
              <Image
                className="rounded-full drop-shadow-2xl"
                width={400}
                height={400}
                style={{ objectFit: "cover" }}
                src={`https://picsum.photos/seed/${user?.id}/400`}
                alt="avatar"
              />
            </div>
            {`${user.firstName}`}
            {songs?.length === 0
              ? null
              : ` • ${songs?.length} songs, ${
                  formatPlaylistDuration(favoritesDuration).minutes
                } min ${formatPlaylistDuration(favoritesDuration).seconds} sec`}
          </div>
        </>
      }
    >
      <SongsTable songs={songs} profile={false} />
    </GradientLayout>
  );
};

interface JwtPayLoad {
  id: number;
}

export async function getServerSideProps({ query, req }) {
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
  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      favorites: {
        select: {
          name: true,
          duration: true,
          url: true,
          artist: true,
          id: true,
        },
      },
    },
  });

  const songs = await prisma.song.findMany({
    include: {
      artist: {
        select: {
          name: true,
          image: true,
          id: true,
        },
      },
    },
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(userData)),
      songs: JSON.parse(JSON.stringify(songs)),
    },
  };
}

export default Favorites;
