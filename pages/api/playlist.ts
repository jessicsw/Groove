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

    if (req.method === "POST") {
      const playlist = await prisma.playlist.create({
        data: {
          name: req.body.name,
          User: {
            connect: { id: user.id },
          },
        },
      });
      res.json(playlist);
    }

    if (req.method === "GET" && req.query.id) {
      const { query } = req.query as { query: string };

      const playlist = await prisma.playlist.findUnique({
        where: { id: +query },
      });

      res.json(playlist);
    } else if (req.method === "GET") {
      const playlists = await prisma.playlist.findMany({
        where: { userId: user.id },
        orderBy: {
          createdAt: "asc",
        },
      });
      res.json(playlists);
    }
  } else {
    res.status(401).send("Internal Server Error.");
  }
}
