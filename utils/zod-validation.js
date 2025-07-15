import {email, z} from "zod"
export const signupvalidation = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    firstname: z.string().min(3),
    lastname : z.string().min(3),
    authProvider : z.enum(['local','google']).default('local'),
});
