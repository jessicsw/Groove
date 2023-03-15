const LibrarySkeleton = () => {
  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-purple-500 to-black p-7">
      <div className="grid-col-4 grid animate-pulse gap-5 pt-10 pb-3">
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="m-3 max-w-[200px] rounded-md bg-white bg-opacity-10 p-5 "
            >
              <div className="m-auto h-[120px] w-[120px] rounded-full bg-gray-500 shadow-xl" />
              <div className="mt-6 mb-3 h-2 w-24 rounded-full bg-gray-400" />
              <div className="h-2 w-14 rounded-full bg-gray-400" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default LibrarySkeleton;
