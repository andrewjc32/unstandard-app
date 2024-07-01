import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Apple from "next-auth/providers/apple"
import type { NextAuthConfig } from "next-auth"
import { loginSchema } from "./lib/schemas/loginSchema"
import { getUserByEmail } from "./actions/authActions"
import bcrypt from "bcryptjs"

export default {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Credentials({
        name: "credentials",
        credentials: {
            username: { label: "email", type: "text" },
            password: { label: "password", type: "password" },
        },
        async authorize(creds, req) {
            const validated = loginSchema.safeParse(creds);

            if(validated.success) {
                const { email, password } = validated.data;

                const user = await getUserByEmail(email);

                if(user && user.passwordHash) {
                    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

                    console.log('passwordMatch',passwordMatch);

                    if(passwordMatch) {
                        return user;
                    } else {
                        return null;
                    }
                }

                return null;
            }

            return null;
        }
    })],
} satisfies NextAuthConfig