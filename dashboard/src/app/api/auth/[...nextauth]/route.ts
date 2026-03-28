import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "missing",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "missing",
    }),
    CredentialsProvider({
      name: "Guest Access",
      credentials: {},
      async authorize(credentials, req) {
        // This is a dummy user for demo purposes
        return {
          id: "guest-user",
          name: "Guest Explorer",
          email: "guest@dineanalytics.com",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login", // Redirect errors back to login page
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
