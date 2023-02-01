export const greenText = {
  green: "text-green-500",
};

export const bgGradients = {
  lime: "from-lime-600",
  cyan: "from-cyan-600",
  gray: "from-gray-600",
  red: "from-red-600",
  blue: "from-blue-600",
};

export const getBGColor = (id) => {
  const colors = ["gray", "red", "lime", "cyan", "blue"];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};
