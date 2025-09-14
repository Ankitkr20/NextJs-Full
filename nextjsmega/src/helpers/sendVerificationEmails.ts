import {resend} from "@/lib/resend"
import VerificationEmail  from "../../emails/VerificationEmails"
import { ApiResponse } from "@/types/ApiResponse"

export async function sendVerification(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'you@example.com',
            to: email,
            subject: 'Mystery Message | Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
          });
        return {success: true, message: "Verification email successfull"}
        
    } catch (emailError) {
        console.error("Error sending verification email",emailError)
        return {success: false, message: 'Failed to send verification email'}
    }
}