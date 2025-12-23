import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials;
                if (!email || !password) return null;

                const db = await connectDB();
                const currentUser = await db.collection("users").findOne({ email });

                if (!currentUser) return null;

                // Password match check kora
                const passwordMatched = bcrypt.compareSync(password, currentUser.password);
                if (!passwordMatched) return null;

                return currentUser;
            }
        })
    ],
    pages: {
        signIn: '/login', // Apnar custom login page path
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };