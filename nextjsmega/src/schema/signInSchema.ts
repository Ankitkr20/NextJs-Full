import {z} from "zod"

export const singinSchema = z.object({
    identifier: z.string(),
    password: z.string(),
})