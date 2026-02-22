import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../prisma/client";

const adapter = PrismaAdapter(prisma);

export const authOptions = {
  adapter: adapter,
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") {
        return false;
      }

      const email = user?.email ?? profile?.email;
      if (!email) {
        return false;
      }

      try {
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          return true;
        }

        const allowUser = await prisma.allowUser.findUnique({
          where: { email },
        });

        return Boolean(allowUser);
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async session({ session }) {
      try {
        const email = session.user?.email;
        if (!email) {
          return session;
        }

        const dbUser = await prisma.user.findUnique({
          where: { email },
        });

        if (!dbUser) {
          return session;
        }

        let finalUser = dbUser;

        if (!["admin", "moderator"].includes(dbUser.role ?? "")) {
          const allowedUser = await prisma.allowUser.findUnique({
            where: { email },
          });

          if (allowedUser) {
            finalUser = await prisma.user.update({
              where: { email },
              data: { name: allowedUser.name, role: allowedUser.role ?? "moderator" },
            });
          }
        }

        session.user.id = finalUser.id;
        session.user.role = finalUser.role ?? "";
        session.user.name = finalUser.name ?? session.user.name;
      } catch (error) {
        console.error("Error finding user:", error);
      }

      return session;
    },
  },
  pages: {
    error: "/admin",
  },
};

export default NextAuth(authOptions);
