import cookie from "cookie";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("GROOVE_ACCESS_TOKEN", "", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );
  } catch (error) {
    res.status(200).send("Successfully logged out");
  }
}
