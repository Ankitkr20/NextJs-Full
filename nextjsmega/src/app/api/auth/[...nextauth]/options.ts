import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User.model"

export const authOptions = {
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email:{label:"Email" , type:"text" },
                password: {label:"Password" , type:"password"}
            },
            async authorize(credentials: any): Promise<any>{
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            {email: credentials.email},
                            {username: credentials.username}
                        ]
                    })
                    if(!user){
                        throw new Error("No user found with this email")
                    }
                    if(!user.isVerified){
                        throw new Error("Please Verify your account first before login")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if(isPasswordCorrect){
                        return user
                    }
                    else{
                        throw new Error("Incorrect Password")
                    }
                } catch (error: any) {
                    throw new Error(error)
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization:{
                params:{
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
          }),
    ],
    callbacks: {
        async signIn({account, profile}:{account: any, profile: any}){
            if(account?.provider === "google"){
                const allowedDomains = ["@gmail.com", "@yahoo.in", "@outlook.com"]
                return profile.email_verified && allowedDomains.some(domain => profile.email.endsWith(domain))
            }
            return true
        },
        async jwt({ token, user}: { token: any, user?: any }) {
            
            if (user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessages = user.isAcceptingMessages
                token.username = user.username
            }
            return token
        },
        async session({ session, token }: { session: any, token: any }) {
            if(token){
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessages = token.isAcceptingMessages
                session.user.username = token.username
            }

            return session
        }
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    
}