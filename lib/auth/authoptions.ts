import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { CloudCog } from "lucide-react";

const prisma :any= new PrismaClient();

const authOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        // Find the user by email
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });
console.log({user})
        if (!user) {
          throw new Error(
            "User not found. Please create your account and login !"
          );
        }

        // Compare the provided password with the stored hashed password
        const isValidPassword = await compare(
          credentials.password,
          user.password
        );
        console.log({isValidPassword})

        if (!isValidPassword) {
          throw new Error(
            "Invalid password. Please verify your password and try again!"
          );
        }

        // If all checks pass, return the user object
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token } : any) {
        console.log({session,token})
      session.user = token.user;
      return session;
    },
    async jwt({ token, user } : any) {
        console.log({token,user})
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

export default authOptions;
