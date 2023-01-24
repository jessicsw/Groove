import Image from "next/image";

const GradientLayout = ({
  color,
  children,
  roundImage,
  image,
  subtitle,
  title,
  description,
}) => {
  const bgGradients = {
    lime: "from-lime-600",
    cyan: "from-cyan-600",
    gray: "from-gray-600",
    red: "from-red-600",
    blue: "from-blue-600",
  };

  return (
    <div
      className={`h-full overflow-y-auto bg-gradient-to-b ${bgGradients[color]} to-black text-white`}
    >
      <div className="flex h-[300px] items-center bg-white bg-opacity-10 pl-7">
        <div className="flex items-end">
          <Image
            className={`h-[240px] w-[240px] ${
              roundImage && "rounded-full"
            } drop-shadow-2xl`}
            width="240"
            height="240"
            src={image}
            alt="avatar"
          />
          <div className="ml-6">
            <div className="text-[12px] font-semibold uppercase">
              {subtitle}
            </div>
            <h1 className="text-7xl font-bold leading-relaxed">{title}</h1>
            <div className="text-sm">{description}</div>
          </div>
        </div>
      </div>

      <div className="p-9">{children}</div>
    </div>
  );
};

export default GradientLayout;
