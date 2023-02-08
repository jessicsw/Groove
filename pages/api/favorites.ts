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

type Song = {
  id: number;
  createdAt: Date;
  UpdatedAt: Date;
  name: string;
  artistId: number;
  duration: number;
  url: string;
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
      res.status(401);
      res.json({ error: "Not authorized" });
      return;
    }

    if (req.method === "GET") {
      const data = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          favorites: true,
        },
      });
      const favorites = data?.favorites;
      res.json(favorites);
    }

    const { songId, mode } = req.body;

    if (req.method === "POST" && mode === "connect") {
      const data = await prisma.user.update({
        where: { id: user.id },
        data: {
          favorites: {
            connect: { id: songId },
          },
        },
        select: {
          favorites: true,
        },
      });
      const favorites = data?.favorites;
      res.json(favorites);
    } else if (req.method === "POST" && mode === "disconnect") {
      const data = await prisma.user.update({
        where: { id: user.id },
        data: {
          favorites: {
            disconnect: { id: songId },
          },
        },
        select: {
          favorites: true,
        },
      });
      const favorites = data?.favorites;
      res.json(favorites);
    }
  } else {
    res.status(401).send("Error with favorites");
  }
}
