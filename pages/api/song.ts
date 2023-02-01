import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface JwtPayLoad {
  id: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.GROOVE_ACCESS_TOKEN;

  if (token) {
    let user;

    try {
      const { id } = jwt.verify(token, "hello") as JwtPayLoad;
      user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error("Not real user");
      }
    } catch (error) {
      res.status(401);
      res.json({ error: "Not authorized" });
      return;
    }

    if (req.method === "POST") {
      const { playlistId, songId } = req.body;
      const playlistSongs = await prisma.song.update({
        where: { id: +songId },
        data: {
          playlists: {
            connect: { id: +playlistId },
          },
        },
      });

      res.json(playlistSongs);
    }

    const { playlistId } = req.query as { playlistId: string };
    if (req.method === "GET" && playlistId) {
      const playlistSongs = await prisma.playlist.findUnique({
        where: { id: parseInt(playlistId) },
        select: {
          songs: true,
        },
      });

      res.json(playlistSongs.songs);
    } else if (req.method === "GET") {
      const songs = await prisma.song.findMany();
      res.json(songs);
    }
  } else {
    res.status(401);
    res.json({ error: "Not authorized" });
  }
}
