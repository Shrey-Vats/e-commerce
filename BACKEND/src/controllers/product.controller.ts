/*
1) POST /products -> create a product
2) GET /products -> get all products
3) GET /products/:id -> get a product by id
4) PUT /products/:id -> update a product by id
5) DELETE /products/:id -> delete a product by id
*/

import type { Request, Response ,NextFunction } from "express";
import type z from "zod";
import { createProductSchema } from "../schema/product.schema";
import prisma from "../lib/db";


export const createProduct = async (req: Request<{}, {}, z.infer<typeof createProductSchema>>, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        const result = createProductSchema.safeParse(body);

        if(!result.success) {
            return next({status: 400, message: "Invalid request"});
        }

        const { name, description, price, image } = body;
        const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

        const isProductExists = await prisma.product.findUnique({ where: { slug } });

        if (isProductExists) {
            return next({ status: 409, message: "Product already exists" });
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: String(price),
                image,
                slug,
                userId: req.user.id
            }
        });

        return res.status(201).json(product);
    } catch (error) {
        return next({status: 500, message: "Internal server error"});
    }
}