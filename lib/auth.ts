import jwt from "jsonwebtoken";
// import prisma from "./prisma";
// import { NextApiRequest, NextApiResponse } from "next";

export const validateToken = (token) => {
  const user = jwt.verify(token, "hello");

  return user;
};

// interface JwtPayLoad {
//   id: number;
// }

// export default async function validateRoute(handler) {
//   return async (req: NextApiRequest, res: NextApiResponse) => {
//     const token = req.cookies.GROOVE_ACCESS_TOKEN;

//     if (token) {
//       let user;

//       try {
//         const { id } = jwt.verify(token, "hello") as JwtPayLoad;
//         user = await prisma.user.findUnique({
//           where: { id },
//         });

//         if (!user) {
//           throw new Error("Not real user");
//         }
//       } catch (error) {
//         res.status(401);
//         res.json({ error: "Not authorized" });
//         return;
//       }
//       return handler(req, res, user);
//     }

//     res.status(401);
//     res.json({ error: "Not authorized" });
//   };
// }
