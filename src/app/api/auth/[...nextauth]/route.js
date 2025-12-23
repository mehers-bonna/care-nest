import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
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

                const passwordMatched = bcrypt.compareSync(password, currentUser.password);
                if (!passwordMatched) return null;

                return currentUser;
            }
        })
    ],
    pages: {
        signIn: '/login', 
    },
    callbacks: {
        // নতুন ইউজারের তথ্য ডাটাবেসে সেভ করার জন্য এই অংশটি যোগ করা হয়েছে
        async signIn({ user, account }) {
            if (account.provider === "google") {
                const { name, email, image } = user;
                try {
                    const db = await connectDB();
                    const userCollection = db.collection("users");
                    
                    // ইমেইল দিয়ে চেক করা হচ্ছে ইউজার আগে থেকেই আছে কি না
                    const userExists = await userCollection.findOne({ email });

                    if (!userExists) {
                        // ইউজার না থাকলে নতুন ইউজার হিসেবে সেভ হবে
                        await userCollection.insertOne({
                            name,
                            email,
                            image,
                            role: "user", 
                            provider: "google"
                        });
                    }
                    return true;
                } catch (error) {
                    console.error("Error saving google user:", error);
                    return false;
                }
            }
            return true; 
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role || "user";
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