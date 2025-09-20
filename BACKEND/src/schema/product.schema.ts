import z from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    price: z.number().min(0, "Price must be a positive number"),
    image: z.string().regex(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i, "Invalid image URL"),
})