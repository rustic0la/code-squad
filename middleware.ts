import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if (!isLoggedIn && !"/") {
    return Response.redirect(new URL(`/auth/login`, nextUrl));
  }

  return null;
});
