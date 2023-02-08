import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useEffect, useState } from "react";
import { fetchFavorites } from "@/lib/fetchers";
import { removeFavorite, addFavorite } from "@/lib/mutations";
import useSWR from "swr";

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
  createdAt: Date;
};

const LikedSongs = ({ songId }: { songId: number }) => {
  const { data: favorites, mutate: mutateFavorites } = useSWR(
    "/api/favorites",
    fetchFavorites
  );
  const [liked, setLiked] = useState<Array<number> | []>([]);

  useEffect(() => {
    const idArr: Array<number> = favorites?.map((song: Song) => song.id);
    setLiked(idArr);
  }, [favorites]);

  const handleOnClick = async () => {
    try {
      const inFavoritesArr = (() => {
        for (let i = 0; i < favorites.length; i++) {
          if (favorites[i].id === songId) return true;
        }

        return false;
      })();

      if (inFavoritesArr) {
        const newFavoritesArr: Array<Song> = favorites.filter(
          (song: Song) => song.id !== songId
        );
        mutateFavorites(newFavoritesArr, false);
        const json = await removeFavorite(songId);
        mutateFavorites(json, false);
      } else {
        mutateFavorites([...favorites, songId], false);
        const json = await addFavorite(songId);
        mutateFavorites(json, false);
      }
    } catch (error) {
      console.error(`Error with mutating favorites`);
    }
  };
  return (
    <div>
      <IoMdHeartEmpty
        onClick={handleOnClick}
        className={`${
          (liked as number[])?.includes(songId) ? "hidden" : "block"
        } h-6 w-6 hover:text-white`}
      />
      <IoMdHeart
        onClick={handleOnClick}
        className={`${
          (liked as number[])?.includes(songId) ? "block" : "hidden"
        } h-6 w-6 text-green-500 hover:text-green-400`}
      />
    </div>
  );
};

export default LikedSongs;
