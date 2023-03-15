import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface JwtPayLoad {
  id: number;
}

type UserData = {
  id: number;
  createdAt: Date;
  UpdatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.GROOVE_ACCESS_TOKEN;

  if (token) {
    let user: UserData | null;

    try {
      const { id } = jwt.verify(token, "hello") as JwtPayLoad;
      user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error("Not real user");
      }
    } catch (error) {
      res.status(401).json({ error: "Not authorized" });
      return;
    }

    switch (req.method) {
      case "POST": {
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
        break;
      }
      case "GET": {
        const { playlistId } = req.query as { playlistId: string };
        if (playlistId) {
          const playlistSongs = await prisma.playlist.findUnique({
            where: { id: parseInt(playlistId) },
            select: {
              songs: true,
            },
          });

          res.json(playlistSongs?.songs);
        } else {
          const songs = await prisma.song.findMany();
          res.json(songs);
        }
        break;
      }
      default: {
        res.status(401).json({ error: "Error with playlist songs" });
      }
    }
  }
}
