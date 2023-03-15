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
        include: {
          _count: {
            select: { playlists: true },
          },
          favorites: {
            select: {
              id: true,
              name: true,
              artist: true,
              duration: true,
            },
          },
        },
      });

      if (!user) {
        throw new Error("Not real user");
      }
    } catch (error) {
      res.status(401).json({ error: "Not authorized" });
      return;
    }

    res.json({ ...user });
  }
}
