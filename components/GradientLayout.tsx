import { PropsWithChildren, ReactElement } from "react";
import Image from "next/image";
import GradientSkeleton from "./skeletons/GradientSkeleton";
import Logout from "./Logout";

type GradientLayoutProps = {
  roundImage: boolean;
  image: string;
  subtitle: string;
  title: string;
  description: string | ReactElement;
  isLoading: boolean;
};

const GradientLayout = ({
  children,
  roundImage,
  image,
  subtitle,
  title,
  description,
  isLoading,
}: PropsWithChildren<GradientLayoutProps>) => {
  if (isLoading) return <GradientSkeleton />;
  return (
    <div
      className={`relative h-full w-[calc(100vw-250px)] overflow-y-scroll bg-gradient-to-b from-cyan-600 to-black text-white`}
    >
      <div className="absolute right-0">
        <Logout />
      </div>
      <div className="flex h-[300px] items-center pl-7">
        <div className="flex items-end">
          <div className="h-[230px] w-[230px]">
            <Image
              className={`${roundImage && "rounded-full"} drop-shadow-2xl`}
              width={400}
              height={400}
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
      <div className="w-full bg-black bg-opacity-10 p-9">{children}</div>
    </div>
  );
};

export default GradientLayout;
