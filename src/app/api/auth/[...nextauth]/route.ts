import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"


const handler: any = NextAuth({
    providers: [
    GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
    })
],
    pages: {
    signIn: '/auth/signin',  // Custom sign-in page
}
})

export { handler as GET, handler as POST }