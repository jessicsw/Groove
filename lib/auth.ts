import jwt from "jsonwebtoken";

export const validateToken = (token: string) => {
  const user = jwt.verify(token, "hello");

  return user;
};
