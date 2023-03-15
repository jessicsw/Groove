import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

type UserData = {
  id: number;
  createdAt: Date;
  UpdatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

interface JwtPayLoad {
  id: number;
}

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
      res.status(401);
      res.json({ error: "Not authorized" });
      return;
    }

    switch (req.method) {
      case "POST": {
        const playlist = await prisma.playlist.create({
          data: {
            name: req.body.name,
            User: {
              connect: { id: user.id },
            },
          },
        });
        res.json(playlist);
        break;
      }
      case "GET": {
        const playlists = await prisma.playlist.findMany({
          where: { userId: user.id },
          orderBy: {
            createdAt: "asc",
          },
        });
        res.json(playlists);
        break;
      }
      default: {
        res.status(401).json({ error: "Error with playlist" });
      }
    }
  }
}
