import { AiOutlineClockCircle } from "react-icons/ai";
import { IoPlayCircleSharp } from "react-icons/io5";
import { formatTime, formatDate } from "../lib/formatters";
import { useStoreActions } from "../lib/hooks";

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

type SongsTableProps = {
  songs: Array<Song>;
  profile: boolean;
};

const SongsTable = ({ songs, profile }: SongsTableProps) => {
  const playSongs = useStoreActions((actions) => actions.changeActiveSongs);
  const setActiveSong = useStoreActions((actions) => actions.changeActiveSong);

  const handlePlay = (activeSong?: Song) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };

  return (
    <div className="bg-transparent text-gray-300">
      {!profile && (
        <div className="relative mb-10">
          <div className=" h-[30px] w-[30px] bg-black" />
          <IoPlayCircleSharp
            className="absolute top-[-19px] left-[-16px] h-[70px] w-[70px] text-green-500 hover:h-[72px] hover:w-[72px]"
            aria-label="play button"
            onClick={() => handlePlay()}
          />
        </div>
      )}
      <table className="w-full">
        {!profile && (
          <thead>
            <tr className="text-left text-[12px]">
              <th scope="col" className="pl-5 text-[15px] font-normal">
                #
              </th>
              <th scope="col" className="font-normal">
                TITLE
              </th>
              <th scope="col" className="font-normal">
                DATE ADDED
              </th>
              <th scope="col" className="text-[15px] font-normal">
                <AiOutlineClockCircle />
              </th>
            </tr>
            <tr className="border-b-[1px] border-slate-200 ">
              <td>
                <div className="h-2" />
              </td>
            </tr>
            <tr>
              <td>
                <div className="h-4" />
              </td>
            </tr>
          </thead>
        )}
        <tbody>
          {songs?.map((song, index) => (
            <tr
              key={song.id}
              onDoubleClick={() => handlePlay(song)}
              className=" hover:bg-white hover:bg-opacity-20"
            >
              <td className="rounded-l pl-5">{index + 1}</td>
              <td className="flex items-center py-1">
                <img
                  src={song.artist.image}
                  alt="album cover"
                  className="h-10 w-10"
                />
                <div className="ml-5 flex flex-col">
                  <div className="whitespace-nowrap leading-6 text-white">
                    {song.name}
                  </div>
                  <div className="whitespace-nowrap text-[13px] text-gray-400">
                    {song.artist.name}
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap">
                {formatDate(song.createdAt)}
              </td>
              <td className="rounded-r">{formatTime(song.duration)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SongsTable;
