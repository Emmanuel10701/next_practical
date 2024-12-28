import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/chat", 
  },
};

export const GET = (req, res) => NextAuth(req, res, authOptions);
export const POST = (req, res) => NextAuth(req, res, authOptions);
