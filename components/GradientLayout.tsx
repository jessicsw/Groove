import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

const GradientLayout = ({
  color,
  children,
  roundImage,
  image,
  subtitle,
  title,
  description,
}) => {
  const [bgColor, setbgColor] = useState(null);
  useEffect(() => {
    const bgGradients = {
      lime: "from-lime-600",
      cyan: "from-cyan-600",
      gray: "from-gray-600",
      red: "from-red-600",
      blue: "from-blue-600",
    };

    setbgColor(bgGradients[color]);
  }, []);

  return (
    <div
      className={`h-full overflow-y-scroll bg-gradient-to-b ${bgColor} w-[calc(100vw-250px)] to-black text-white`}
    >
      <div className="flex h-[300px] items-center pl-7">
        <div className="flex items-end">
          <div className="relative h-[230px] w-[230px]">
            <Image
              className={`${roundImage && "rounded-full"} drop-shadow-2xl`}
              fill
              style={{ objectFit: "cover" }}
              src={image}
              alt="avatar"
            />
          </div>
          <div className="ml-6">
            <div className="text-[12px] font-semibold uppercase">
              {subtitle}
            </div>
            <div className="h-[120px]">
              <h1 className="whitespace-nowrap text-7xl font-bold leading-relaxed transition ease-in-out">
                {title}
              </h1>
            </div>
            <div className="text-sm">{description}</div>
          </div>
        </div>
      </div>

      <div className="h-full w-full bg-black bg-opacity-10 p-9">{children}</div>
    </div>
  );
};

export default GradientLayout;
