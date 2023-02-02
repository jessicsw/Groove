import { createStore, action, Action } from "easy-peasy";

type Artist = {
  id: number;
  image: string;
  name: string;
};

type ActiveSong = {
  duration: number;
  id: number;
  name: string;
  url: string;
  artistId: number;
  artist: Artist;
};

export type ActiveSongsModel = {
  activeSongs: Array<ActiveSong>;
  activeSong: ActiveSong | null;
  changeActiveSongs: Action<ActiveSongsModel, Array<ActiveSong>>;
  changeActiveSong: Action<ActiveSongsModel, ActiveSong>;
};

export const store = createStore<ActiveSongsModel>({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state, payload) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state, payload) => {
    state.activeSong = payload;
  }),
});
