import e from "express";
import { Login, Logout, Register, verificationStatus, VerifyEmail } from "../Controllers/authController.ts";

const app = e.Router();

app.post("/register", Register);
app.post("/login", Login);
app.get("/logout", Logout);
app.get("/verify-email", VerifyEmail);
app.get("/emailverification-status", verificationStatus);

export default app;