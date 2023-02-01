export async function fetchPlaylists(url: string) {
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

export async function fetcher(url: string) {
  return await fetch(`${window.location.origin}/api${url}`, {
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
