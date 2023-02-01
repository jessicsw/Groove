import Player from "./Player";
import SeekBar from "./SeekBar";
import { useStoreState } from "easy-peasy";
import { useState } from "react";
import {
  IoVolumeHighSharp,
  IoVolumeMediumSharp,
  IoVolumeLowSharp,
  IoVolumeMuteSharp,
} from "react-icons/io5";

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong: any = useStoreState((state: any) => state.activeSong);
  const [volume, setVolume] = useState(1.0);

  const renderIcon = (volume) => {
    if (volume === 0) {
      return <IoVolumeMuteSharp size="22px" />;
    } else if (volume < 0.33) {
      return <IoVolumeLowSharp size="22px" />;
    } else if (volume < 0.66) {
      return <IoVolumeMediumSharp size="22px" />;
    } else {
      return <IoVolumeHighSharp size="22px" />;
    }
  };

  return (
    <div className="h-[100px] bg-black bg-opacity-90">
      <div className="flex h-full items-center justify-between p-4 text-white">
        <div className="w-[20%]">
          {activeSong ? (
            <div className="flex w-full items-center">
              <img
                src={activeSong.artist.image}
                alt="active song album cover"
                className="h-14 w-14"
              />
              <div className="flex flex-col pl-4">
                <div className="whitespace-nowrap text-[13px]">
                  {activeSong.name}
                </div>
                <div className="text-[11px] leading-5 text-gray-400">
                  {activeSong.artist.name}
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="w-[60%]">
          <Player songs={songs} activeSong={activeSong} volume={volume} />
        </div>
        <div className="flex w-[20%] items-center justify-end">
          <div className="mr-2 text-white opacity-80">{renderIcon(volume)}</div>
          <div className="mr-5 w-[30%]">
            <SeekBar
              seek={[volume]}
              step={0.01}
              duration={1.0}
              onChange={setVolume}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
