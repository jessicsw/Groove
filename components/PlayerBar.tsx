import Player from "./Player";
const PlayerBar = () => {
  return (
    <div className="h-[100px] bg-black opacity-90">
      <div className="flex h-full items-center justify-between p-4 text-white">
        <div className="w-[20%] border-2">
          <div>album cover</div>
          <div>song name</div>
          <div>artist</div>
        </div>
        <div className="w-[60%]">
          <Player />
        </div>
        <div className="w-[20%] text-center">volume/sync</div>
      </div>
    </div>
  );
};

export default PlayerBar;
