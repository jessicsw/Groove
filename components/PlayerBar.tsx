import Player from "./Player";
const PlayerBar = () => {
  return (
    <div className="h-[100px] bg-black opacity-90">
      <div className="flex h-full items-center justify-between p-4 text-white">
        <div>
          <div>album cover</div>
          <div>song name</div>
          <div>artist</div>
        </div>
        <div>
          <Player />
        </div>
        <div>volume/sync</div>
      </div>
    </div>
  );
};

export default PlayerBar;
