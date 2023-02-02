type UserData = {
  id: number;
  createdAt: Date;
  UpdatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

type SongData = {
  id: number;
  createdAt: Date;
  UpdatedAt: Date;
  name: string;
  artistId: number;
  duration: number;
  url: string;
};

type Playlist = {
  id: number;
  createdAt: Date;
  UpdatedAt: Date;
  name: string;
  userId: number;
};

export const authorizeLogin = async (user: {
  email: string;
  password: string;
}): Promise<UserData> => {
  return await fetch(`${window.location.origin}/api/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    if (res.status > 399 && res.status < 200) {
      throw new Error();
    }

    return res.json();
  });
};

export async function addSong(newSong: {
  playlistId: string;
  songId: string;
}): Promise<SongData> {
  return await fetch(`${window.location.origin}/api/song`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSong),
  }).then((res) => {
    if (res.status > 399 && res.status < 200) {
      throw new Error();
    }

    return res.json();
  });
}

export async function addPlaylist(newPlaylist: {
  name: string;
}): Promise<Playlist> {
  return await fetch(`${window.location.origin}/api/playlist`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlaylist),
  }).then((res) => {
    if (res.status > 399 && res.status < 200) {
      throw new Error();
    }

    return res.json();
  });
}

export const createUser = async (user: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<UserData> => {
  return await fetch(`${window.location.origin}/api/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    if (res.status > 399 && res.status < 200) {
      throw new Error();
    }
    return res.json();
  });
};
