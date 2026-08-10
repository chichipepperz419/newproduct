import { z } from "zod";
export const createUserSchema = z.object({
    name: z.string().min(3, "name must be at least 3 characters long").max(20),
    email: z.string().email(),
    password: z.string().min(6, "password must be ar least 6 characters long").max(20),
});
export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(6, "password must be at least 6 characters long")
        .max(20),
});
//# sourceMappingURL=user.validator.js.map