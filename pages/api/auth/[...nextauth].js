import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/UserModel';
import db from '../../../lib/dbConnect';
db.connect();

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email });
        if (!user) {
          // Any object returned will be saved in `user` property of the JWT
          throw new Error("You haven't registered yet");
        }
        if (user) return signinUser({ password, user });
        // If you return null then an error will be displayed advising the user to check their details.
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.avatar = token.avatar ? token.avatar : token.picture ? token.picture : null;
      session = { user: { name: token.name, email: token.email, avatar: session.user.avatar } };
      return session;
    },
  },
  pages: { signIn: '/signin' },
  secret: 'secret',
  database: process.env.DB_URI,
};

export default NextAuth(authOptions);

const signinUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error('Please enter password');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Password Incorrect.');
  }
  return user;
};
