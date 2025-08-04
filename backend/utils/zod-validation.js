import {email, z} from "zod"
export const signupvalidation = z.object({
    email : z.string().email(),
    password : z.string().min(4),
    authProvider : z.enum(['local','google']).default('local'),
});
export const loginvalidation = z.object({
    email : z.string().email(),
    password : z.string().min(4),
})
export const profileValidation = z.object({
        firstname: z.string().min(3),
        lastname : z.string().min(3),
        age: z.coerce.number().min(16).max(70),
        interestedIn : z.enum(['male','female','both']),
        education : z.enum(['12th','graduate','master','job']),
        gender : z.enum(['male','female']),
        bio : z.string().min(5).max(100),
        gotra : z.string(),
        location : z.string(),
        place_of_Origin : z.string(),
        looking_for : z.enum(['Serious Relationship','Friendship','Casual Dating','Marriage'])

}).passthrough();