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

const Player = () => {
  return (
    <div>
      {/* <div>
        <ReactHowler/>
      </div> */}
      <div className="flex w-56 justify-between text-gray-400">
        <button className="hover:text-gray-200">
          <MdShuffle size="30px" />
        </button>
        <button className="hover:text-gray-200">
          <MdSkipPrevious size="30px" />
        </button>
        <button className="h-[42px] w-[42px] text-white">
          <MdOutlinePlayCircleFilled className="h-[40px] w-[40px] hover:h-[42px] hover:w-[42px]" />
        </button>
        <button className="hover:text-gray-200">
          <MdSkipNext size="30px" />
        </button>
        <button className="hover:text-gray-200">
          <MdOutlineRepeat size="30px" />
        </button>
      </div>
    </div>
  );
};

export default Player;
