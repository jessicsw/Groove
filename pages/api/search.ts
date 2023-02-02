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
      res.status(401);
      res.json({ error: "Not authorized" });
      return;
    }

    const { query } = req.query as { query: string };

    const songs = await prisma.song.findMany({
      where: {
        name: {
          search: query,
        },
      },
      include: {
        artist: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
      },
    });

    res.json(songs);
  } else {
    res.status(401);
    res.json({ error: "Not authorized" });
  }
}
