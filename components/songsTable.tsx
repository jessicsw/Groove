import { AiOutlineClockCircle, AiFillPlayCircle } from "react-icons/ai";
import { IoPlayCircleSharp } from "react-icons/io5";

const songsTable = ({ songs }) => {
  return (
    <div className="bg-transparent text-gray-300">
      <div className="relative mb-10">
        <div className=" h-[30px] w-[30px] bg-black" />
        <IoPlayCircleSharp
          className="absolute top-[-19px] left-[-16px] h-[70px] w-[70px] text-green-600"
          aria-label="play button"
        />
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-slate-200 text-left text-[12px]">
            <th scope="col" className="pl-5 text-[15px] font-normal">
              #
            </th>
            <th scope="col" className=" font-normal">
              TITLE
            </th>
            <th scope="col" className=" font-normal">
              DATE ADDED
            </th>
            <th scope="col" className=" text-[15px] font-normal">
              <AiOutlineClockCircle />
            </th>
          </tr>
        </thead>
        <tbody>
          {/* check if padding is needed after creating div for album + song name + artist name */}
          {songs.map((song, index) => (
            <tr className="hover:bg-white hover:bg-opacity-20">
              <td className="pl-5">{index + 1}</td>
              <td className=" flex items-center">
                <img
                  src={`https://picsum.photos/40?random=${song.id}`}
                  alt="album cover"
                  className="h-10 w-10"
                />
                <div className="ml-5 flex flex-col">
                  <div className="leading-8 text-white">{song.name}</div>
                  <div className="text-[13px] text-gray-400">
                    {song.artist.name}
                  </div>
                </div>
              </td>
              <td className="">{song.createdAt}</td>
              <td className="">{song.duration} seconds</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default songsTable;
