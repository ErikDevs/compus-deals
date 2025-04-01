import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      async session({ session, user }: { session: any; user: { id: string } }) {
        // Add custom user data to session
        session.user.id = user.id;
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { phoneVerified: true },
        });

        session.user.phoneVerified = dbUser?.phoneVerified || false;
        return session;
      },
    },
    async signIn({
      user,
      account,
      profile,
    }: {
      user: any;
      account: any;
      profile: any;
    }) {
      // First-time sign-in logic
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          // Create new user with default type 'student'
          await prisma.user.create({
            data: {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              emailVerified: new Date(),
            },
          });
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin";
    error: "/auth/error";
  },
  secret: process.env.NEXTAUTH_SECRET;

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
