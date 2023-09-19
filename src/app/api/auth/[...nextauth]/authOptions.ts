import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                    placeholder: "Enter Email"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter Password"
                }
            },
            async authorize(credentials){
                // TODO DELETE: user should be info from database to check - CURRENTLY HARDCODED
                const user = { id: "1", email: "paulie@email.com", password: "testpassword" }

                // TODO DELETE: hash the password
                if (credentials?.email === user.email && credentials?.password === user.password) {
                    return user
                } else {
                    // TODO DELETE: handle issues
                    return null
                }
            }
        })
    ]
}