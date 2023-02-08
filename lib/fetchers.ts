type Playlist = {
  UpdatedAt: Date;
  createdAt: Date;
  id: number;
  name: string;
  userId: number;
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

export async function fetchPlaylists(url: string): Promise<Array<Playlist>> {
  return await fetch(`${window.location.origin}${url}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export async function fetchPlaylistSongs(url: string) {
  return await fetch(`${window.location.origin}${url}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export async function fetchSearchResults(params: string) {
  return await fetch(`${window.location.origin}/api/search?query=${params}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status > 399 && res.status < 200) {
      throw new Error();
    }
    return res.json();
  });
}

export async function fetchUser(url: string) {
  return await fetch(`${window.location.origin}${url}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status > 399 && res.status < 200) {
      throw new Error();
    }
    return res.json();
  });
}

export async function fetchFavorites(url: string) {
  return await fetch(`${window.location.origin}${url}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status > 399 && res.status < 200) {
      throw new Error();
    }
    return res.json();
  });
}
