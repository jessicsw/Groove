import ReactHowler from "react-howler";
import SeekBar from "./SeekBar";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useStoreActions } from "../lib/hooks";
import { formatTime } from "../lib/formatters";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlineRepeat,
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
} from "react-icons/md";
import { greenText } from "../lib/colors";

type Artist = {
  id: number;
  image: string;
  name: string;
};

type ActiveSong = {
  duration: number;
  id: number;
  name: string;
  url: string;
  artistId: number;
  artist: Artist;
};

type PlayerProps = {
  songs: Array<ActiveSong>;
  activeSong: ActiveSong | null;
  volume: number;
};

const Player = ({ songs, activeSong, volume }: PlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [seek, setSeek] = useState(0.0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(activeSong?.duration || 1);
  const soundRef: MutableRefObject<ReactHowler | null> = useRef(null);
  const repeatRef = useRef(repeat);
  const setActiveSong = useStoreActions((actions) => actions.changeActiveSong);

  useEffect(() => {
    let timerId: number;

    if (playing) {
      const f = () => {
        if (soundRef.current) {
          setSeek(soundRef.current.seek());
          timerId = requestAnimationFrame(f);
        }
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }
  }, [playing]);

  useEffect(() => {
    setIndex(songs.findIndex((song) => song.id === activeSong?.id));
    setPlaying(true);
  }, [activeSong, songs]);

  useEffect(() => {
    if (activeSong && songs && index) {
      setActiveSong(songs[index]);
      setSeek(0.0);
      setPlaying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const setPlayState = (bool: boolean) => {
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
    if (repeatRef.current && soundRef.current) {
      setSeek(0.0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    if (soundRef.current) {
      const songDuration = soundRef.current.duration();
      setDuration(songDuration);
      setLoaded(true);
    }
  };

  const onSeek = (e: number) => {
    if (soundRef.current) {
      setSeek(e);
      soundRef.current.seek(e);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <ReactHowler
        onLoad={onLoad}
        onEnd={onEnd}
        playing={playing && loaded}
        preload={true}
        src={[activeSong?.url as string]}
        ref={soundRef}
        volume={volume}
      />
      <div className="flex w-56 justify-between text-center">
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
            aria-label="pause"
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
          {activeSong && formatTime(seek)}
        </div>
        <div className="mt-3 h-[18px] w-[56%]">
          <SeekBar
            seek={[seek]}
            step={0.1}
            duration={duration}
            onChange={onSeek}
          />
        </div>
        <div className="w-[22%] pl-2 text-start text-[12px] text-gray-400">
          {activeSong && formatTime(duration)}
        </div>
      </div>
    </div>
  );
};

export default Player;
