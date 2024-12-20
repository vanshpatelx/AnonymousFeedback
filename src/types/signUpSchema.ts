import { z } from "zod";

export const signUpSchema = z.object({
    username: z.string().min(2, "Atleast 2 chars").max(20, "Max 20 chars").regex(/^[a-zA-Z0-9_]+$/, "Username must not contains special characters"),
    email: z.string().email({message: "Invalid Email Address"}),
    password: z.string().min(6, {message: "Atleast 6 chars"} )
});