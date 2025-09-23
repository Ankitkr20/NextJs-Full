import CredentialsProvider from "next-auth/providers/credentials"
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
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: any, user?: any }) {
            if (user) {
                token._id = user._id?.toString()
                token.isVerifed = user.isVerifed
                token.isAcceptingMessages = user.isAcceptingMessages
                token.username = user.username
            }
            return token
        },
        async session({ session, token }: { session: any, token: any }) {
            if(token){
                session.user._id = token._id
                session.user.isVerified = token.isVerifed
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