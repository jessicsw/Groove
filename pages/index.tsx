import GradientLayout from "../components/GradientLayout";
import prisma from "../lib/prisma";
import { useMe } from "../lib/hooks";
import Image from "next/image";
import SongsTable from "../components/SongsTable";

//handle isLoading
// question marks are to handle async fetch on user variable

export default function Home({ artists, songs }) {
  const { user } = useMe();

  return (
    <div className="h-full">
      <GradientLayout
        color="cyan"
        roundImage={true}
        title={`${user?.firstName} ${user?.lastName}`}
        description={`${user?.playlistCount} Public Playlists • 3 Followers • 3 Following`}
        subtitle="profile"
        image="/avatar.jpg"
      >
        <div className="whitespace-nowrap text-xl font-semibold">
          Top artists this month
        </div>
        <div className="text-[12px] leading-6 text-gray-400">
          Only visible to you
        </div>
        <div className="grid-col-4 grid gap-5 py-3">
          {artists.map((artist) => {
            return (
              <div
                key={artist.name}
                className="m-3 rounded-md bg-white bg-opacity-10 p-5 duration-200 hover:cursor-pointer hover:bg-opacity-20 hover:ease-in-out"
              >
                <Image
                  src={artist.image}
                  alt="artist image"
                  height="144"
                  width="144"
                  className="m-auto rounded-full shadow-xl"
                />
                <div className="pt-6 pb-1 text-sm font-semibold">
                  {artist.name}
                </div>
                <div className="text-[12px] text-gray-400">Artist</div>
              </div>
            );
          })}
        </div>
        <div className="my-6">
          <div className="whitespace-nowrap text-xl font-semibold">
            Top songs this month
          </div>
          <div className="mb-3 text-[12px] leading-6 text-gray-400">
            Only visible to you
          </div>
          <SongsTable songs={songs} profile={true} />
        </div>
      </GradientLayout>
    </div>
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
