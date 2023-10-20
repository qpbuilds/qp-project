import bcrypt from 'bcrypt'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from "../../../lib/prismadb"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "Enter Email"},
                password: { label: "Password", type: "password", placeholder: "Enter Password"}
            },
            
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid Credentials');
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email:credentials.email
                    }
                })
                // checking if user or password doesnt exist, throw error
                if(!user || !user?.hashedPassword){
                    throw new Error('Invalid Credentials');
                }
                // compare the credentials password and the hashed password to ensure they match
                const isCorrect = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )
                // checking if the hashed password doesnt match, throw an Error saying Invalid credentials
                if(!isCorrect){
                    throw new Error('Invalid credentials')
                }
                return user
            }
        })
    ],
    pages: {
        homePage: '/',
        login: '/login'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
}