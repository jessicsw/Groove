import { createStore, action, Action } from "easy-peasy";

type Artist = {
  id: number;
  image: string;
  name: string;
};

type Song = {
  duration: number;
  id: number;
  name: string;
  url: string;
  artistId: number;
  artist: Artist;
};

export type ActiveSongsModel = {
  activeSongs: Array<Song>;
  activeSong: Song | null;
  changeActiveSongs: Action<ActiveSongsModel, Array<Song>>;
  changeActiveSong: Action<ActiveSongsModel, Song>;
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
