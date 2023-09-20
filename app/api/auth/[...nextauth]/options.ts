import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/utils/hash";
import { cookies } from 'next/headers';

export const options : NextAuthOptions = {
    providers : [
        Credentials({
            name : "Credentials",
            credentials : {
                username: {
                    label : "username",
                    type : "text",
                    placeholder : "your username"
                },
                password : {
                    label : "password",
                    type : "password",
                    placeholder : "your password",
                }
            },
            async authorize(credentials) {
                const user : any= await prisma.user.findUnique({
                    where : {
                        email : credentials?.username?.toLowerCase()
                    }
                })
                if(!user) return null
                const password = credentials?.password
                const isPassValid = await verifyPassword(password, user.password);
                if(credentials?.username === user.email && isPassValid ){
                    cookies().set('userId', user.id)
                    return user;
                }
                 return null;
            },
        })
    ],
}