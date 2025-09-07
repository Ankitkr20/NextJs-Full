import { sign } from "crypto"
import {z} from "zod"

export const usernameValidation = z
.string()
.min(5,"Usernames should be atleast 5 characters")
.max(10,"Username  should be atmost 10 characters")
.regex(/^[0-9a-zA-Z_]+$/,"username must not contain special character")

export const signupSchema = z.object({
    username:usernameValidation,
    email: z.string().email({message:"Invalid Email Address"}),
    password: z.string().min(8,{message:"Password must be atleast 8 characters"})
})