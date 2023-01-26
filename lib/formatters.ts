import formatDuration from "format-duration";

export const formatTime = (timeInSeconds = 0) => {
  return formatDuration(timeInSeconds * 1000);
};

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatPlaylistDuration = (timeInSeconds = 0) => {
  return {
    minutes: formatDuration(timeInSeconds * 1000).split(":")[0],
    seconds: formatDuration(timeInSeconds * 1000).split(":")[1],
  };
};
