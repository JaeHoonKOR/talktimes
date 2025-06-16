import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "이메일" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 실제로는 데이터베이스 쿼리로 교체해야 합니다
        if (credentials?.username === "user@example.com" && credentials?.password === "password") {
          return { 
            id: "1", 
            name: "테스트 사용자", 
            email: "user@example.com",
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "my-secret-key-that-should-be-in-env",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
