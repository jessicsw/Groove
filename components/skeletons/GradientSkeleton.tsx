import { AiOutlineClockCircle } from "react-icons/ai";

const GradientSkeleton = () => {
  return (
    <div
      role="status"
      className="h-full overflow-y-auto bg-gradient-to-b from-cyan-600 to-black"
    >
      <div className="flex h-[300px] items-center justify-start">
        <div className="flex animate-pulse items-end pl-7">
          <div className="h-[230px] w-[230px]">
            <div className="flex h-full w-full items-center justify-center rounded-full border border-gray-400">
              <svg
                className="h-12 w-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
          </div>
          <div className="ml-6">
            <div className="mb-9 h-2 w-24 rounded-full bg-gray-400" />
            <div className="mb-7 h-20 w-[450px] rounded-full bg-gray-400" />
            <div className="mb-2.5 h-2 w-[300px] rounded-full bg-gray-400" />
          </div>
        </div>
      </div>
      <div className="h-full">
        <div className="bg-black bg-opacity-10 p-9 text-white">
          <div className="whitespace-nowrap text-xl font-semibold">
            Top artists this month
          </div>
          <div className="text-[12px] leading-6 text-gray-400">
            Only visible to you
          </div>
          <div className="grid-col-4 grid animate-pulse gap-5 py-3">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="m-4 w-[200px] rounded-md bg-white bg-opacity-10 p-6"
                >
                  <div className="m-auto h-[144px] w-[144px] rounded-full bg-gray-500 shadow-xl" />
                  <div className="mt-6 mb-3 h-2 w-24 rounded-full bg-gray-400" />
                  <div className="h-2 w-14 rounded-full bg-gray-400" />
                </div>
              ))}
          </div>
          <div className="py-6">
            <div className="whitespace-nowrap text-xl font-semibold">
              Top songs this month
            </div>
            <div className="mb-3 text-[12px] leading-6 text-gray-400">
              Only visible to you
            </div>
            <table className="w-full">
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
            </table>
            <div className="h-7 w-full animate-pulse rounded-sm bg-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientSkeleton;
