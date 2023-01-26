import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlineRepeat,
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
} from "react-icons/md";
import { useStoreActions } from "easy-peasy";
import { Range } from "react-range";

const Player = ({ songs, activeSong }) => {
  const [value, setValue] = useState([0]);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [seek, setSeek] = useState(0.0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(false);

  const greenText = {
    green: "text-green-500",
  };

  const setPlayState = (bool) => {
    setPlaying(bool);
  };

  const onRepeat = () => {
    setRepeat((state) => !state);
  };
  const onShuffle = () => {
    setShuffle((state) => !state);
  };
  return (
    <div className="flex flex-col items-center">
      <div>{/* <ReactHowler playing={playing} /> */}</div>
      <div className="mb-1 flex w-56 justify-between text-center text-white">
        <button
          aria-label="shuffle"
          className={`opacity-60 hover:opacity-90 ${
            shuffle && greenText["green"]
          }`}
          onClick={() => onShuffle()}
        >
          <MdShuffle size="18px" />
        </button>
        <button aria-label="previous" className="opacity-80 hover:opacity-100">
          <MdSkipPrevious size="30px" />
        </button>
        {playing ? (
          <button aria-label="play" className="h-[42px] w-[42px] text-white">
            <MdOutlinePauseCircleFilled
              className="h-[40px] w-[40px] hover:h-[42px] hover:w-[42px]"
              onClick={() => setPlayState(false)}
            />
          </button>
        ) : (
          <button aria-label="play" className="h-[42px] w-[42px] text-white">
            <MdOutlinePlayCircleFilled
              className="h-[40px] w-[40px] hover:h-[42px] hover:w-[42px]"
              onClick={() => setPlayState(true)}
            />
          </button>
        )}
        <button aria-label="next" className=" opacity-80 hover:opacity-100">
          <MdSkipNext size="30px" />
        </button>
        <button
          aria-label="repeat"
          className={`opacity-60 hover:opacity-90 ${
            repeat && greenText["green"]
          }`}
          onClick={() => onShuffle()}
        >
          <MdOutlineRepeat size="18px" />
        </button>
      </div>
      <div className="flex w-full items-center">
        <div className="w-[22%] pr-2 text-end text-[12px] text-gray-400">
          start
        </div>
        <div className="w-[56%]">
          <Range
            step={0.1}
            min={0}
            max={300}
            values={value}
            onChange={(values) => setValue(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-[4px] w-full rounded-sm bg-white opacity-30"
                style={{
                  ...props.style,
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-[20px] w-[20px] rounded-sm bg-red-900 opacity-100"
                style={{
                  ...props.style,
                }}
              />
            )}
          />
        </div>
        <div className="w-[22%] pl-2 text-start text-[12px] text-gray-400">
          end
        </div>
      </div>
    </div>
  );
};

export default Player;
