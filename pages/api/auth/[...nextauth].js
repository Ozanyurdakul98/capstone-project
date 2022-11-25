import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/UserModel";
import db from "../../../lib/dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await db.connect();
        // Add logic here to look up the user from the credentials supplied
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email });
        const patternEmail = /^([^\s@]+@[^\s@]+\.[^\s@]+$)$/i;
        const patternPassword = /^([a-zA-Z-0-9-!äöü#@.,-_]){8,60}$/i;
        if (!email) {
          // Any object returned will be saved in `user` property of the JWT
          throw new Error("You need to enter a Email!");
        }
        if (!patternEmail.test(email)) {
          // Any object returned will be saved in `user` property of the JWT
          throw new Error("Email format is not valid!");
        }
        if (!user) {
          // Any object returned will be saved in `user` property of the JWT
          throw new Error("Email not found!");
        }
        if (!password) {
          throw new Error("You need to enter a password!");
        }
        if (password.length <= 7) {
          throw new Error("Password is too short!");
        }
        if (!patternPassword.test(password)) {
          throw new Error("Wrong Password! Please try again");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Wrong Password! Please try again");
        }

        if (user) return user;
        // If you return null then an error will be displayed advising the user to check their details.
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.avatar = user.avatar;
        token.username = user.username;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.

      session.user.image = token.avatar;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.role = token.role;
      return session;
    },
  },
  pages: { signIn: "/signin" },
  secret: "secret",
  database: process.env.DB_URI,
};
export default NextAuth(authOptions);
