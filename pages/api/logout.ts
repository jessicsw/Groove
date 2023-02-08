import cookie from "cookie";
import { NextApiResponse } from "next";

export default async function logout(res: NextApiResponse) {
  try {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("GROOVE_ACCESS_TOKEN", "", {
        httpOnly: true,
        maxAge: 0,
      })
    );

    return res;
  } catch (error) {
    res.status(200).send("Successfully logged out");
  }
}
