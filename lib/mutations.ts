export const authorizeLogin = async (user: {
  email: string;
  password: string;
}) => {
  return await fetch(`${window.location.origin}/api/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export async function addSong(newSong: { playlistId: string; songId: string }) {
  return await fetch(`${window.location.origin}/api/song`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSong),
  }).then((res) => res.json());
}

export async function addPlaylist(newPlaylist: { name: string }) {
  return await fetch(`${window.location.origin}/api/playlist`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlaylist),
  }).then((res) => res.json());
}

export async function createUser(user: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
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
}
