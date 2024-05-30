import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from 'next-auth/adapters';
import prisma from "@/src/lib/prisma";
import GoogleProvider from "next-auth/providers/google";

const googleId = process.env.NEXT_PUBLIC_GOOGLE_ID;
const googleSecret = process.env.NEXT_PUBLIC_GOOGLE_SECRET;

if (!googleId || !googleSecret) {
    throw new Error("GOOGLE_ID and GOOGLE_SECRET must be set");
}

export const authConfig = {
    providers: [
        GoogleProvider({
            clientId: googleId,
            clientSecret: googleSecret,
        }),
    ],
    adapter: PrismaAdapter(prisma) as Adapter,
} satisfies NextAuthOptions;

export default NextAuth(authConfig);