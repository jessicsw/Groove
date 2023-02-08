import SongsTable from "@/components/SongsTable";
import GradientLayout from "../components/GradientLayout";
import prisma from "../lib/prisma";
import Image from "next/image";
import { formatPlaylistDuration } from "../lib/formatters";
import { validateToken } from "../lib/auth";
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

type UserData = {
  id: number;
  createdAt: Date;
  UpdatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  favorites: Array<Song>;
};

interface JwtPayLoad {
  id: number;
}

const Favorites = ({ user }: { user: UserData }) => {
  const favoritesDuration = user.favorites?.reduce((acc, el) => {
    return acc + el.duration;
  }, 0);

  return (
    <GradientLayout
      isLoading={false}
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
            {user.favorites?.length === 0
              ? null
              : ` • ${user.favorites?.length} songs, ${
                  formatPlaylistDuration(favoritesDuration).minutes
                } min ${formatPlaylistDuration(favoritesDuration).seconds} sec`}
          </div>
        </>
      }
    >
      <SongsTable songs={user.favorites} profile={false} />
    </GradientLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let user;

  req.cookies;
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
          createdAt: true,
        },
      },
    },
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(userData)),
    },
  };
};

export default Favorites;
