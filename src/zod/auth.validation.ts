import z from "zod";

export const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(20, {
        error: "Password must be at most 20 characters long",
    }),
});

export const registerValidationSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 2 characters long"),

    email: z.email("Invalid email address"),

    phone: z
        .string()
        .min(11, "Phone number must be at least 7 digits"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
    profilePhoto: z
        .instanceof(File, { message: "Profile photo is required" })
        .refine((file) => file.size > 0, "Profile photo cannot be empty")
        .refine(
            (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Photo must be JPEG, PNG, or WEBP"
        ),
});

export const registerValidationSchemaForServer = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 2 characters long"),

    email: z.email("Invalid email address"),

    phone: z
        .string()
        .min(11, "Phone number must be at least 7 digits"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    profilePhoto: z.string("Profile photo is Require")
});

export const changePasswordSchema = z
    .object({
        oldPassword: z.string().min(6, "Password must be at least 6 characters"),
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });