import { connectMongodb } from "@ext/lib/mongodb";
import { default as UserCurrent } from "@ext/models/User";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

type FormCredentials = {
  email: string;
  password?: string;
  name?: string;
};

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const data = credentials as FormCredentials;
        await connectMongodb();
        const userInfo = { email: data.email, password: data.password };
        const searchUser = await UserCurrent.findOne(userInfo, {
          name: true,
          email: true,
          _id: false,
        });
        if (searchUser) {
          const currentUser: User = {
            id: searchUser._id,
            name: searchUser.name,
            email: searchUser.email,
          };
          return currentUser;
        } else {
          return null;
        }
      },
    }),

    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const emailUser = user?.email as string;
        await connectMongodb();
        const searchUser = await UserCurrent.findOne({ email: emailUser });
        if (!searchUser) {
          const newUser = new UserCurrent({
            name: user?.name,
            email: user?.email,
            password: null,
            image: user?.image,
            googleId: account?.providerAccountId,
          });
          await newUser.save();
        }
        return true;
      }
      return true;
    },
    async session({ session, token }) {
      // if (token) {
      //   session.accessToken = token.accessToken;
      // }
      // console.log("session: ", session);
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      // console.log("token :", token);
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/error",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
