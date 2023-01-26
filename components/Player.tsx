import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import { useStoreActions } from "easy-peasy";
import { formatTime } from "../lib/formatters";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlineRepeat,
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
} from "react-icons/md";
import { Range, getTrackBackground } from "react-range";

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(
    songs.findIndex((song) => song.id === activeSong?.id)
    // breaks when activeSong is not set
  );
  const [seek, setSeek] = useState([0.0]);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(activeSong?.duration || 1);
  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);
  const setActiveSong = useStoreActions(
    (actions: any) => actions.changeActiveSong
  );

  const greenText = {
    green: "text-green-500",
  };

  useEffect(() => {
    let timerId;

    if (playing && !isSeeking && activeSong) {
      const f = () => {
        setSeek([soundRef.current.seek()]);
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  useEffect(() => {
    setActiveSong(songs[index]);
    setSeek([0.0]);
    setPlaying(true);
  }, [index, setActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const setPlayState = (bool) => {
    setPlaying(bool);
  };

  const onRepeat = () => {
    setRepeat((state) => !state);
  };
  const onShuffle = () => {
    setShuffle((state) => !state);
  };

  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
  };

  const nextSong = () => {
    setIndex((state: any) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);

        if (next === state) {
          return nextSong();
        }

        return next;
      } else {
        return state === songs.length - 1 ? 0 : state + 1;
      }
    });
  };

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek([0]);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    setSeek(e[0]);
    soundRef.current.seek(e[0]);
  };

  return (
    <div className="flex flex-col items-center">
      {activeSong && (
        <ReactHowler
          onLoad={onLoad}
          onEnd={onEnd}
          playing={playing}
          src={activeSong.url}
          ref={soundRef}
          preload={true}
        />
      )}
      <div className="mb-1 flex w-56 justify-between text-center">
        <button
          aria-label="shuffle"
          className={`opacity-60 hover:opacity-90 ${
            shuffle && greenText["green"]
          }`}
          onClick={() => onShuffle()}
        >
          <MdShuffle size="18px" />
        </button>
        <button
          aria-label="previous"
          onClick={prevSong}
          className={`text-white opacity-80 hover:opacity-100 ${
            !activeSong && "text-opacity-30"
          }`}
        >
          <MdSkipPrevious size="30px" />
        </button>
        {playing ? (
          <button
            aria-label="play"
            className={`w-[42px h-[42px] text-white ${
              !activeSong && `text-opacity-30`
            }`}
          >
            <MdOutlinePauseCircleFilled
              className="h-[40px] w-[40px] hover:h-[42px] hover:w-[42px]"
              onClick={() => setPlayState(false)}
            />
          </button>
        ) : (
          <button
            aria-label="play"
            className={`h-[42px] w-[42px] text-white ${
              !activeSong && `text-opacity-30`
            }`}
          >
            <MdOutlinePlayCircleFilled
              className="h-[40px] w-[40px] hover:h-[42px] hover:w-[42px]"
              onClick={() => setPlayState(true)}
            />
          </button>
        )}
        <button
          aria-label="next"
          onClick={nextSong}
          className={`text-white opacity-80 hover:opacity-100 ${
            !activeSong && "text-opacity-30"
          }`}
        >
          <MdSkipNext size="30px" />
        </button>
        <button
          aria-label="repeat"
          className={`opacity-60 hover:opacity-90 ${
            repeat && greenText["green"]
          }`}
          onClick={() => onRepeat()}
        >
          <MdOutlineRepeat size="18px" />
        </button>
      </div>
      <div className="flex w-full items-center">
        <div className="w-[22%] pr-2 text-end text-[12px] text-gray-400">
          {formatTime(seek[0])}
        </div>
        <div className="w-[56%]">
          <Range
            values={seek}
            step={0.1}
            min={0}
            max={duration}
            onChange={(values) => onSeek([values])}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                className="h-[3px] w-full rounded-sm"
                style={{
                  ...props.style,
                }}
              >
                <div
                  ref={props.ref}
                  className="h-[3px] w-full rounded-sm opacity-100"
                  style={{
                    background: getTrackBackground({
                      values: seek,
                      colors: ["white", "gray"],
                      min: 0,
                      max: duration,
                    }),
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                onKeyDown={() => setIsSeeking(true)}
                onKeyUp={() => setIsSeeking(false)}
                className="flex items-center justify-center rounded-full"
                style={{
                  ...props.style,
                }}
              >
                <div
                  className={`rounded-full ${isDragged && `h-[10px] w-[10px]`}`}
                  style={{
                    backgroundColor: isDragged && "gray",
                  }}
                />
              </div>
            )}
          />
        </div>
        <div className="w-[22%] pl-2 text-start text-[12px] text-gray-400">
          {duration && formatTime(duration)}
        </div>
      </div>
    </div>
  );
};

export default Player;
