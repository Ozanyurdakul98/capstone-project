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
      name: 'Credentials',
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Username', type: 'email', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({ email });

        if (!user) {
          // Any object returned will be saved in `user` property of the JWT
          console.log('not registered');
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
