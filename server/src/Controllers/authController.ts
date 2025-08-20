import type { Request, Response } from "express";
import { prisma } from "../Configs/db.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Configs/mailer.ts";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const URL = process.env.URL || "http://localhost:5173";
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

        const token = jwt.sign({
            id: user.id,
            username: user.username,
        }, JWT_SECRET);

        const currentTime = Date.now();
        const tokenExpiry = new Date(currentTime + 60 * 60 * 1000)

        await prisma.user.update({
            where: {id: user.id},
            data: {
                emailVerifyToken: token,
                emailVerifyTokenExpiry: tokenExpiry.toISOString()
            }
        });

        const link = `${URL}/verify-email?token=${token}`

        sendEmail(email, link)

        return res.status(201).json({
            message: "Verification link sent to your email",
            success: true,
            id : user.id
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

         const token = jwt.sign({
            id: user.id,
            username: user.username,
        }, JWT_SECRET);

        const currentTime = Date.now();
        const tokenExpiry = new Date(currentTime + 60 * 60 * 1000)

        await prisma.user.update({
            where: {id: user.id},
            data: {
                emailVerifyToken: token,
                emailVerifyTokenExpiry: tokenExpiry.toISOString()
            }
        });

        if(!user.IsVerified){
            sendEmail(user.email, `${URL}/verify-email?token=${user.emailVerifyToken}`);
            return res.status(200).json({
                message: "Verification link sent to your email",
                success: true
            })
        }

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
            id: user.id
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

export const VerifyEmail = async (req: Request, res: Response) => {
    const { token } = req.params;

    try {
        if (!token || typeof token !== "string") {
            return res.status(400).json({
                message: "Token not found",
                success: false
            })
        }

        const user = await prisma.user.findFirst({
            where: {
                emailVerifyToken: token,
                emailVerifyTokenExpiry: {
                    gt: new Date().toISOString()
                }
            }
        });

        if(!user){
            return res.status(400).json({
                message: "Invalid token or token has expired",
                success: false
            })
        }

        await prisma.user.update({
            where: {id: user.id},
            data: {
                emailVerifyToken: null,
                emailVerifyTokenExpiry: null,
                IsVerified: true
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}

export const verificationStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
        console.log(id);

        if (!id || typeof id !== "string") {
            return res.status(400).json({
                message: "Invalid user id",
                success: false
            });
        }

        const user = await prisma.user.findUnique({
            where: { id }
        });
        console.log(user?.id);

        if(!user){
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        };

        return res.status(200).json({
            IsVerified: user.IsVerified,
            success: true
        })
    } catch (error) {
        
    }
}

