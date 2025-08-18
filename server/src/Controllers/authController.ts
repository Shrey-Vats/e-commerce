import type { Request, Response } from "express";
import { prisma } from "../Configs/db.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const Register = async (req: Request, res: Response) => {
    const { username ,email, password } = req.body;

    try {
        const isUsernameExits = await prisma.user.findUnique({
            where: {username}
        });

        if(isUsernameExits){
            return res.status(400).json({
                message: "Username already exits",
                success: false
            });
        };

        const isEmailExits = await prisma.user.findUnique({
            where: {email}
        });

        if(isEmailExits){
            return res.status(400).json({
                message: "Email already exits",
                success: false
            })
        };

        const hashPassword = bcrypt.hashSync(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPassword
            }
        });

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error
        })
    }
}

export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {email}
        });

        if(!user){
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        };

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                message: "Password is incorrect",
                success: false
            })
        }

        const jwtToken = jwt.sign({
            id: user.id,
            username: user.username,
        }, JWT_SECRET)

        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({
            message: "User logged in successfully",
            success: true,
            user
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}

export const Logout = async( req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            message: "User logged out successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        }) 
    }
}