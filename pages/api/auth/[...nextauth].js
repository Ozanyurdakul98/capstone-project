import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/UserModel';
import db from '../../../lib/dbConnect';

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email });
        const patternEmail = /^([^\s@]+@[^\s@]+\.[^\s@]+$)$/i;
        const patternPassword = /^([a-zA-Z-0-9!äöü#@.,-_]){8,60}$/i;
        if (!email) {
          throw new Error('You need to enter a Email!');
        }
        if (!patternEmail.test(email)) {
          throw new Error('Email format is not valid!');
        }
        if (!user) {
          throw new Error('Email not found!');
        }
        if (!password) {
          throw new Error('You need to enter a password!');
        }
        if (password.length <= 7) {
          throw new Error('Password is too short!');
        }
        if (!patternPassword.test(password)) {
          throw new Error('Wrong Password! Please try again');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error('Wrong Password! Please try again');
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.avatar = user.avatar;
        token.username = user.username;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.image = token.avatar;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.role = token.role;
      return session;
    },
  },
  pages: { signIn: '/signin' },
  secret: 'secret',
  database: process.env.DB_URI,
};
export default NextAuth(authOptions);
