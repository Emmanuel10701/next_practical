export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/protected-path/:path*"], // Adjust the matcher for the routes you want to protect
};
