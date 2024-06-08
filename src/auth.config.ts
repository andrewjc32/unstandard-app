import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

import type { NextAuthConfig } from "next-auth"
import { signUpSchema } from "./lib/schemas/signUpSchema"
import { getUserByEmail } from "./actions/authActions"

export default {
    providers: [Google, Credentials({
        name: "credentials",
        credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
            const validated = signUpSchema.safeParse(credentials);

            if(validated.success) {
                const { email } = validated.data;
                const user = await getUserByEmail(email);
                if(user) {
                    return user;
                }
                return null;
            } else {
                return null;
            }
        }
    })],
} satisfies NextAuthConfig