import GradientLayout from "../components/GradientLayout";
import prisma from "../lib/prisma";
import useSWR from "swr";
import Image from "next/image";
import SongsTable from "../components/SongsTable";
import { fetcherUser } from "@/lib/fetchers";

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

type HomeProps = {
  artists: Array<Artist>;
  songs: Array<Song>;
};

export default function Home({ artists, songs }: HomeProps) {
  const { data: user, isLoading } = useSWR("/api/me", fetcherUser);

  return (
    <GradientLayout
      color="cyan"
      roundImage={true}
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistCount} Public Playlists • 3 Followers • 3 Following`}
      subtitle="profile"
      image={`https://picsum.photos/seed/${user?.id}/400`}
      isLoading={isLoading}
    >
      <img width="550" height="300" src="/demo/demo.gif" />
      <div className="whitespace-nowrap text-xl font-semibold">
        Top artists this month
      </div>
      <div className="text-[12px] leading-6 text-gray-400">
        Only visible to you
      </div>
      <div className="grid-col-4 grid gap-5 py-3">
        {artists.map((artist) => (
          <div
            key={artist.name}
            className="m-3 max-w-[200px] rounded-md bg-white bg-opacity-10 p-5 duration-200 hover:cursor-pointer hover:bg-opacity-20 hover:ease-in-out"
          >
            <Image
              src={artist?.image}
              alt="artist image"
              height="144"
              width="144"
              className="m-auto rounded-full shadow-xl"
            />
            <div className="pt-6 pb-1 text-sm font-semibold">{artist.name}</div>
            <div className="text-[12px] text-gray-400">Artist</div>
          </div>
        ))}
      </div>
      <div className="py-6">
        <div className="whitespace-nowrap text-xl font-semibold">
          Top songs this month
        </div>
        <div className="mb-3 text-[12px] leading-6 text-gray-400">
          Only visible to you
        </div>
        <SongsTable songs={songs} profile={true} />
      </div>
    </GradientLayout>
  );
}

export async function getServerSideProps() {
  const artists = await prisma.artist.findMany();
  const songs = await prisma.song.findMany({
    include: {
      artist: {
        select: {
          name: true,
          id: true,
          image: true,
        },
      },
    },
  });

  return {
    props: {
      artists: JSON.parse(JSON.stringify(artists)),
      songs: JSON.parse(JSON.stringify(songs)),
    },
  };
}
