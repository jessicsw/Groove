import cookie from "cookie";
import { NextApiResponse, NextApiRequest } from "next";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("GROOVE_ACCESS_TOKEN", "", {
      expires: new Date(0),
      path: "/",
    })
  );

  return res.status(200).json({ success: "Succesfully logged out" });
}
