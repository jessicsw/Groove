import { fetcher, signUpFetcher } from "./fetcher";

export const loginAuth = (
  mode: string,
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};

export const signUpAuth = (
  mode: string,
  body: { email: string; password: string; firstName: string; lastName: string }
) => {
  return signUpFetcher(`/${mode}`, body);
};
