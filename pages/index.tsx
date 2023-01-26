import GradientLayout from "../components/GradientLayout";
import prisma from "../lib/prisma";
import { useMe } from "../lib/hooks";
import Image from "next/image";

//handle isLoading
// question marks are to handle async fetch on user variable

export default function Home({ artists }) {
  const { user } = useMe();

  return (
    <div className="h-full">
      <GradientLayout
        color="gray"
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
        <div className="flex justify-between py-3">
          {artists.map((artist) => {
            return (
              <div
                key={artist.name}
                className="w-[192px] rounded-md bg-white bg-opacity-5 p-6 duration-200 hover:cursor-pointer hover:bg-opacity-10 hover:ease-in-out"
              >
                <Image
                  src={artist.image}
                  alt="artist image"
                  height="144"
                  width="144"
                  className="rounded-full shadow-xl"
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
          <div className="text-[12px] leading-6 text-gray-400">
            Only visible to you
          </div>
        </div>
      </GradientLayout>
    </div>
  );
}

export async function getServerSideProps() {
  const artists = await prisma.artist.findMany();

  return {
    props: { artists: JSON.parse(JSON.stringify(artists)) },
  };
}
