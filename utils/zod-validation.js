import {email, z} from "zod"
export const signupvalidation = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    authProvider : z.enum(['local','google']).default('local'),
});
export const loginvalidation = z.object({
    email : z.string().email(),
    password : z.string().min(6),
})
export const profileValidation = z.object({
        firstname: z.string().min(3),
        lastname : z.string().min(3),
        age : z.number().min(18).max(70),
        interestedIn : z.enum(['male','female','both']),
        photo : z.array(),
        education : z.enum(['12th','graduate','master','job']),
        gender : z.enum(['male','female']),
        height : z.number(),

}).passthrough();